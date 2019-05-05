import { NativeModules, NativeEventEmitter } from 'react-native'

class File extends NativeEventEmitter {
    
    constructor(nativeModule) {
      super(nativeModule);
      this.openFile = nativeModule.openFile
      this.closeFile = nativeModule.closeFile
      this.writeToFile = nativeModule.writeToFile
    }

  }
  
  export default new File(NativeModules.File)