//
//  ConfigurationTests.swift
//  VoiceRecorderTests
//
//  Created by Muchamad Chozinul Amri on 7/5/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import XCTest
@testable import VoiceRecorder

class ConfigurationText: XCTestCase {
  
  func testConfigurationEventConstant(){
    XCTAssertEqual(Configuration.kEventReceiveMicrophoneData, "kEventReceiveMicrophoneData", "")
  }
  
  func testConfigurationFormat() {
    XCTAssertEqual(Configuration.outputFormat.channelCount, 1, "")
    XCTAssertEqual(Configuration.outputFormat.sampleRate, 16000.0, "")
  }
  
  func testFilePath() {
    let  filePath : String! =
      (NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true).first! as String)
        .appending("/temp.wav")
    XCTAssertEqual(Configuration.filePath, filePath, "")
  }
  
}
