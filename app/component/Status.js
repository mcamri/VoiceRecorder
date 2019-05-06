import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from './Status.style'

export default class Status extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Icon name={this.getIcon(this.props)} color="#4F8EF7" size={50} style={styles.icon} />
        <Text style={styles.text}> {this.getText(this.props)} </Text>
      </View>
    );
  }

  getText = (props) => {
    const { isPlaying, isRecording, isPlayable, isSubscribed, disableAllButton } = props
    var text
    if(disableAllButton){
      text = "Buffering ..."
    }else if (isPlaying) {
      text = "Playing Voice ..."
    } else if (isRecording) {
      text = "Recording Voice ..."
    } else if (isPlayable && isSubscribed) {
      text = "Ready to Play!"
    } else if (isSubscribed) {
      text = "Ready to Record!"
    } else {
      text = "Subscribe to Record!"
    }
    return text
  }

  getIcon = (props) => {
    const { isPlaying, isRecording, isPlayable, isSubscribed, disableAllButton } = props
    var text
    if(disableAllButton){
      text = "ios-cog"
    }else if (isPlaying) {
      text = "ios-headset"
    } else if (isRecording) {
      text = "ios-microphone"
    } else if (isPlayable && isSubscribed) {
      text = "ios-play"
    } else if (isSubscribed) {
      text = "ios-recording"
    } else {
      text = "ios-mic-off"
    }
    return text
  }

}



