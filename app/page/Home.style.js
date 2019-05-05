import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#EEE',
    },
    status: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#050',
    },
    horizontalSpread: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F500',
    },
    verticalSpread: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#4FF0',
    },
    subscribe: {
        flex: 1,
        padding: 8,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    unsubscribe: {
        flex: 1,
        padding: 8,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    startRecording: {
        padding: 8,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    play: {
        padding: 8,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    }
  });