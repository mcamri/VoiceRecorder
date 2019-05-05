import React, { Component } from 'react'
import { Button, View } from 'react-native'
import styles from './Home.style'

import Status from '../component/Status'
import Recorder from '../native/Recorder'

class Home extends Component {
  static navigationOptions = {
    title: 'Voice Recorder',
  }

  constructor() {
    super()
    this.state = {
      isSubscribed: false,
      isRecording: false,
      isPlaying: false,
      isPlayable: false
    }
  }



  onSubscribePressed = (button) => {
    Recorder.subscribe(this.listenToMicrophoneData)
    this.setState({ isSubscribed:true })
  }

  onUnsubscribePressed = (button) => {
    Recorder.unsubscribe()
    this.setState({ isSubscribed:false })
  }

  onRecordPressed = (button) => {
    Recorder.activateMicrophone()
    var { isRecording } = this.state
    var isPlayable = true
    isRecording = !isRecording
    if (!isRecording) {
      isPlayable = true
    } else {
      isPlayable = false
    }
    this.setState({ isRecording, isPlayable })
  }

  onPlayPressed = (button) => {
    var { isPlaying } = this.state
    isPlaying = !isPlaying
    this.setState({ isPlaying })
  }

  render() {
    const { isSubscribed, isPlayable, isRecording, isPlaying } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.status}>
          <Status isPlayable={isPlayable} isPlaying={isPlaying} isRecording={isRecording} isSubscribed={isSubscribed}></Status>
        </View>
        <View style={styles.horizontalSpread}>
          <View style={styles.subscribe}>
            <Button onPress={this.onSubscribePressed} title="Subscribe" type="solid" disabled={isSubscribed || isPlaying || isRecording} />
          </View>
          <View style={styles.unsubscribe}>
            <Button onPress={this.onUnsubscribePressed} title="Unsubscribe" type="solid" disabled={!isSubscribed || isPlaying || isRecording} />
          </View>
        </View>
        <View style={styles.verticalSpread}>
          <View style={styles.startRecording}>
            <Button onPress={this.onRecordPressed} title={isRecording ? "Stop Recording" : "Record"} type="outline"
              disabled={(!isSubscribed || isPlaying) && !isRecording} />
          </View>
          <View style={styles.play}>
            <Button onPress={this.onPlayPressed} title={isPlaying ? "Stop Playing" : "Play"} type="solid" disabled={!isSubscribed || isRecording || !isPlayable} />
          </View>
        </View>
      </View>
    );
  }

  listenToMicrophoneData = (bytes) => {
    console.log('listenToMicrophoneData', bytes)
  }

}




export default Home

