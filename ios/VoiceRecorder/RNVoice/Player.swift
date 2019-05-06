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

@objc(Player)
class Player: RCTEventEmitter {
  
  var audioEngine : AVAudioEngine!
  var audioFile : AVAudioFile!
  var audioPlayer : AVAudioPlayerNode!
  var audioFilePlayer: AVAudioPlayerNode!
  var kEventReceiveMicrophoneData: String!
  var filePath: String!
  
  override init() {
    self.audioEngine = AVAudioEngine()
    self.audioFilePlayer = AVAudioPlayerNode()
    self.audioEngine.attach(audioFilePlayer)
    self.filePath = Configuration.filePath
    self.kEventReceiveMicrophoneData = Configuration.kEventReceiveMicrophoneData
  }
  
  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  override func supportedEvents() -> [String]! {
    return [kEventReceiveMicrophoneData]
  }
  
  @objc
  func startPlay(_ callback: @escaping RCTResponseSenderBlock) {
    prepareSession()
    prepareFile()
    prepareEngine()
    setupSegment(callback)
    executePlay()
  }
  
  func prepareSession(){
    try! AVAudioSession.sharedInstance().setCategory(AVAudioSessionCategoryPlayAndRecord)
    try! AVAudioSession.sharedInstance().setActive(true)
  }
  
  func prepareFile(){
    self.audioFile = try! AVAudioFile(forReading: URL(fileURLWithPath: filePath!))
  }
  
  func prepareEngine() {
    self.audioEngine.connect(self.audioFilePlayer, to: self.audioEngine.mainMixerNode, format: audioFile.processingFormat)
  }
  
  func setupSegment(_ callback: @escaping RCTResponseSenderBlock){
    self.audioFilePlayer.scheduleSegment(audioFile,
                                         startingFrame: AVAudioFramePosition(0),
                                         frameCount: AVAudioFrameCount(self.audioFile.length),
                                         at: nil){
                                          self.completion()
                                          callback([true])
    }
  }
  
  func executePlay(){
    self.audioEngine.prepare()
    try! self.audioEngine.start()
    self.audioFilePlayer.play()
  }
  
  @objc
  func stopPlay() {
    self.resetPlayer()
  }
  
  func resetPlayer() {
    self.audioFilePlayer.stop()
    self.audioEngine.stop()
    self.audioFilePlayer.reset()
    self.audioEngine.mainMixerNode.reset()
    self.audioEngine.reset()
    try! AVAudioSession.sharedInstance().setActive(false)
  }
  
  func completion() {
    DispatchQueue.global().asyncAfter(deadline: .now()){
      self.resetPlayer()
    }
  }
  
}
