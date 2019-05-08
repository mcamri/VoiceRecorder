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

struct Configuration {
  
  static var outputFormat = AVAudioFormat(commonFormat: .pcmFormatInt16,
                                          sampleRate: 16000,
                                          channels: 1,
                                          interleaved: false)!
  
  static var filePath : String! =
    (NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true).first! as String)
      .appending("/temp.wav")
}





