//
//  Configuration.swift
//  VoiceRecorder
//
//  Created by Muchamad Chozinul Amri on 5/5/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import AVFoundation
import AudioToolbox

let kEventReceiveMicrophoneData = "kEventReceiveMicrophoneData"

let outputFormat = AVAudioFormat(commonFormat: .pcmFormatFloat32,
                                 sampleRate: 16000,
                                 channels: 1,
                                 interleaved: true)!

var filePath : String! =
  (NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true).first! as String)
  .appending("/temp.wav")
