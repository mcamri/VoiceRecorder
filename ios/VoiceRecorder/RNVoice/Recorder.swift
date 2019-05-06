//
//  Recorder.swift
//  VoiceRecorder
//
//  Created by Muchamad Chozinul Amri on 5/5/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import AVFoundation
import AudioToolbox

@objc(Recorder)
class Recorder: RCTEventEmitter {
  
  var audioEngine : AVAudioEngine!
  var audioFile : AVAudioFile!
  var audioPlayer : AVAudioPlayerNode!
  
  override init() {
    self.audioEngine = AVAudioEngine()
  }
  
  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  override func supportedEvents() -> [String]! {
    return [kEventReceiveMicrophoneData]
  }
  
  @objc
  func isRecorderAllowed(_ callback: @escaping RCTResponseSenderBlock){
    if AVCaptureDevice.authorizationStatus(for: AVMediaType.audio) != .authorized {
      AVCaptureDevice
        .requestAccess(for: AVMediaType.audio,
                                    completionHandler: {
                                      (granted: Bool) in
                                      callback([granted])
      })
    }else {
      callback([true])
    }
  }
  
  @objc
  func activateMicrophone() {
    startRecord()
  }
  
  func startRecord() {
    
    try! AVAudioSession.sharedInstance().setCategory(AVAudioSessionCategoryPlayAndRecord)
    try! AVAudioSession.sharedInstance().setActive(true)
    
    let format = AVAudioFormat(commonFormat: AVAudioCommonFormat.pcmFormatFloat32,
                               sampleRate: 44100.0,
                               channels: 1,
                               interleaved: true)!
    
    let converter = AVAudioConverter(from: format, to: outputFormat)!
    let ratio: Float = 44100.0/16000.0
    
    
    self.audioEngine.inputNode.installTap(onBus: 0, bufferSize: AVAudioFrameCount(1024), format: format, block: { (buffer: AVAudioPCMBuffer!, time: AVAudioTime!) -> Void in
      
      let capacity = UInt32(Float(buffer.frameCapacity)/ratio)
      let convertedBuffer = AVAudioPCMBuffer(pcmFormat: outputFormat, frameCapacity: capacity)!
      let inputBlock: AVAudioConverterInputBlock = { inNumPackets, outStatus in
        outStatus.pointee = AVAudioConverterInputStatus.haveData
        return buffer
      }
      var error: NSError? = nil
      _ = converter.convert(to: convertedBuffer, error: &error, withInputFrom: inputBlock)
      
      let data = self.toNSData(buffer: convertedBuffer)
      let byteCount = data.length
      let bytes = data.bytes
      var arr = Array<UInt8>()
      let bufferPointer = UnsafeRawBufferPointer(start: bytes, count: byteCount)
      for (_, byte) in bufferPointer.enumerated() {
        arr.append(byte)
      }
      self.sendData(arr: arr as NSArray)
    })
    
    self.audioEngine.prepare()
    try! self.audioEngine.start()
  }
  
  func toNSData(buffer: AVAudioPCMBuffer) -> NSData {
    let audioBuffer = buffer.audioBufferList.pointee.mBuffers
    let ch0Data = NSData(bytes: audioBuffer.mData!, length:Int(audioBuffer.mDataByteSize))
    return ch0Data
  }
  
  func sendData(arr: NSArray) {
    sendEvent(withName: kEventReceiveMicrophoneData, body: arr)
  }
  
  @objc
  func deactivateMicrophone() {
    stopRecord()
  }

  func stopRecord() {
    self.audioEngine.stop()
    self.audioEngine.reset()
    self.audioEngine.inputNode.reset()
    self.audioEngine.inputNode.removeTap(onBus: 0)
    try! AVAudioSession.sharedInstance().setActive(false)
  }
  
}
