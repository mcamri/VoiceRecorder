//
//  File.swift
//  VoiceRecorder
//
//  Created by Muchamad Chozinul Amri on 5/5/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import AVFoundation
import AudioToolbox

@objc(File)
class File: RCTEventEmitter {
  
  var outref: ExtAudioFileRef?
  
  override func supportedEvents() -> [String]! {
    return [kEventReceiveMicrophoneData]
  }
  
  @objc
  func openFile() {
    if (FileManager.default.fileExists(atPath: filePath!)) {
      try? FileManager.default.removeItem(atPath: filePath!)
    }
    _ = ExtAudioFileCreateWithURL(URL(fileURLWithPath: filePath!) as CFURL,
                                  kAudioFileWAVEType,
                                  (outputFormat.streamDescription),
                                  nil,
                                  AudioFileFlags.eraseFile.rawValue,
                                  &outref)
  }
  
  @objc
  func closeFile() {
    ExtAudioFileDispose(self.outref!)
  }
  
  @objc
  func writeToFile(_ arr: [UInt8]) {
    var bytes:[UInt8] = []
    for serverByte  in arr {
      bytes.append(serverByte)
    }
    let data = NSData(bytes: bytes, length: bytes.count);
    let dataBuffer = self.makePCMBuffer(data: data, format: outputFormat)!
    _ = ExtAudioFileWrite(self.outref!, dataBuffer.frameLength, dataBuffer.audioBufferList)
  }
  
  func makePCMBuffer(data:NSData, format: AVAudioFormat) -> AVAudioPCMBuffer? {
    let streamDesc = format.streamDescription.pointee
    let frameCapacity = UInt32(data.length) / streamDesc.mBytesPerFrame
    guard let buffer = AVAudioPCMBuffer(pcmFormat: format, frameCapacity: frameCapacity) else { return nil }
    buffer.frameLength = buffer.frameCapacity
    let audioBuffer = buffer.audioBufferList.pointee.mBuffers
    audioBuffer.mData?.copyMemory(from: data.bytes, byteCount: Int(audioBuffer.mDataByteSize))
    return buffer
  }
  
}
