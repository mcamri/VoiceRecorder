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
  var outref: ExtAudioFileRef?
  var audioFilePlayer: AVAudioPlayerNode!
  
  override init() {
    self.audioEngine = AVAudioEngine()
    self.audioFilePlayer = AVAudioPlayerNode()
    self.audioEngine.attach(audioFilePlayer)
  }
  
  override func supportedEvents() -> [String]! {
    return [kEventReceiveMicrophoneData]
  }
  
  
  @objc
  func activateMicrophone() {
    sendEvent(withName: kEventReceiveMicrophoneData, body: ["count": "count"])
  }
  
  @objc
  func deactivateMicrophone() {
    
  }

  
}
