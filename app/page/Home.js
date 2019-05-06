import React, { Component } from 'react'
import { Button, View } from 'react-native'

import Status from '../component/Status'
import Recorder from '../native/Recorder'
import File from '../native/File'
import Player from '../native/Player'

import styles from './Home.style'

class Home extends Component {
  static navigationOptions = {
    title: 'Voice Recorder',
    headerStyle: {
      backgroundColor: '#b1efff',
    },
    headerTintColor: '#222',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 26,
    },
  }

  constructor() {
    super()
    this.state = {
      isSubscribed: false,
      isRecording: false,
      isPlaying: false,
      isPlayable: false,
      isMicAllowed: false,
      disableAllButton: false
    }
  }

  componentDidMount() {
    Recorder.isRecorderAllowed(((granted) => {
      this.setState({isMicAllowed:granted})
    }).bind(this))
  }

  onSubscribePressed = () => {
    Recorder.subscribe(this.listenToMicrophoneData)
    this.setState({ isSubscribed: true })
  }

  listenToMicrophoneData = (bytes) => {
    File.writeToFile(bytes)
  }

  onUnsubscribePressed = () => {
    Recorder.unsubscribe()
    this.setState({ isSubscribed: false })
  }

  onRecordPressed = () => {
    var { isRecording } = this.state
    isRecording = !isRecording
    var isPlayable = !isRecording
    this.setupRecording.bind(this)(isRecording, isPlayable)
  }

  setupRecording = (isRecording, isPlayable) => {
    if (isRecording) {
      File.openFile()
      Recorder.activateMicrophone()
      this.setState({ isRecording, isPlayable })
    } else {
      this.setState({ disableAllButton:true})
      setTimeout((()=>{
        Recorder.deactivateMicrophone()
        File.closeFile()
        this.setState({ isRecording, isPlayable, disableAllButton:false })
      }).bind(this), 1500)
    }
  }

  onPlayPressed = () => {
    var { isPlaying } = this.state
    isPlaying = !isPlaying
    this.setState({ isPlaying })

    this.setupPlaying.bind(this)(isPlaying)
  }

  setupPlaying = (isPlaying) => {
    if (isPlaying) {
      Player.startPlay((() => {
        let isPlaying = false
        this.setState({ isPlaying })
      }).bind(this))
    } else {
      Player.stopPlay()
    }
  }

  render() {
    const { isSubscribed, isPlayable, isRecording, isPlaying, isMicAllowed, disableAllButton } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.status}>
          <Status isPlayable={isPlayable} isPlaying={isPlaying} isRecording={isRecording} isSubscribed={isSubscribed} disableAllButton={disableAllButton}></Status>
        </View>
        <View style={styles.horizontalSpread}>
          <View style={styles.subscribe}>
            <Button onPress={this.onSubscribePressed} title="Subscribe" type="solid" disabled={isSubscribed || isPlaying || isRecording || !isMicAllowed || disableAllButton} />
          </View>
          <View style={styles.unsubscribe}>
            <Button onPress={this.onUnsubscribePressed} title="Unsubscribe" type="solid" disabled={!isSubscribed || isPlaying || isRecording || disableAllButton} />
          </View>
        </View>
        <View style={styles.verticalSpread}>
          <View style={styles.startRecording}>
            <Button onPress={this.onRecordPressed} title={isRecording ? "Stop Recording" : "Record"} type="outline"
              disabled={disableAllButton || (!isSubscribed || isPlaying) && !isRecording} />
          </View>
          <View style={styles.play}>
            <Button onPress={this.onPlayPressed} title={isPlaying ? "Stop Playing" : "Play"} type="solid" disabled={!isSubscribed || isRecording || !isPlayable || disableAllButton} />
          </View>
        </View>
      </View>
    );
  }

}

export default Home

