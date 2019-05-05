import { NativeModules, NativeEventEmitter } from 'react-native'

let kEventReceiveMicrophoneData = "kEventReceiveMicrophoneData"

class Recorder extends NativeEventEmitter {
    
    constructor(nativeModule) {
      super(nativeModule);
      this.activateMicrophone = nativeModule.activateMicrophone
      this.deactivateMicrophone = nativeModule.deactivateMicrophone
      this.subscriber = null
    }

    subscribe = (callback) => {
        this.subscriber = this.addListener(kEventReceiveMicrophoneData, (bytes) => {
            callback(bytes)
        })
    }

    unsubscribe = () => {
        this.subscriber.remove()
    }

  }
  
  export default new Recorder(NativeModules.Recorder)