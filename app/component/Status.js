import React, { Component } from 'react'
import { Text , View } from 'react-native'

import styles from './Status.style'

export default class Status extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> {this.getText(this.props)} </Text>
      </View>
    );
  }

  getText = (props) => {
    const { isPlaying, isRecording, isPlayable, isSubscribed } = props
    var text
    if(isPlaying) {
        text = "Playing Voice ..."
    }else if(isRecording){
        text = "Recording Voice ..."
    }else if(isPlayable && isSubscribed){
        text = "Ready to Play!"
    }else if(isSubscribed){
        text = "Ready to Record!"
    }else {
        text = "Subscribe to Record!"
    }
    return text
  }

}



