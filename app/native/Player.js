import { NativeModules, NativeEventEmitter } from 'react-native'

class Player extends NativeEventEmitter {
    
    constructor(nativeModule) {
      super(nativeModule);
      this.startPlay = nativeModule.startPlay
      this.stopPlay = nativeModule.stopPlay
    }

  }
  
  export default new Player(NativeModules.Player)