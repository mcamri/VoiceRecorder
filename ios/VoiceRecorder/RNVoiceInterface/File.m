//
//  Recorder.m
//  VoiceRecorder
//
//  Created by Muchamad Chozinul Amri on 5/5/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(File, RCTEventEmitter)

RCT_EXTERN_METHOD(openFile)

RCT_EXTERN_METHOD(closeFile)

RCT_EXTERN_METHOD(writeToFile:(NSArray<NSNumber*>*) arr)

@end

