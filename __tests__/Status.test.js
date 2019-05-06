import Status from '../app/component/Status'

test('Test getText in status component', () => {    
    const props = { isPlaying: false, isRecording: false, isPlayable:false, isSubscribed:false }
    const status = new Status(props)
    expect(status.getText(props)).toBe("Subscribe to Record!")
}) 

test('Test getIcon in status component', () => {
    const props = { isPlaying: false, isRecording: false, isPlayable:false, isSubscribed:false }
    const status = new Status(props)
    expect(status.getIcon(props)).toBe("ios-mic-off")
})

test('Test getText in status component', () => {    
    const props = { isPlaying: true, isRecording: false, isPlayable:false, isSubscribed:false }
    const status = new Status(props)
    expect(status.getText(props)).toBe("Playing Voice ...")
}) 

test('Test getIcon in status component', () => {
    const props = { isPlaying: true, isRecording: false, isPlayable:false, isSubscribed:false }
    const status = new Status(props)
    expect(status.getIcon(props)).toBe("ios-headset")
})

test('Test getText in status component', () => {    
    const props = { isPlaying: false, isRecording: true, isPlayable:false, isSubscribed:false }
    const status = new Status(props)
    expect(status.getText(props)).toBe("Recording Voice ...")
}) 

test('Test getIcon in status component', () => {
    const props = { isPlaying: false, isRecording: true, isPlayable:false, isSubscribed:false }
    const status = new Status(props)
    expect(status.getIcon(props)).toBe("ios-microphone")
})

test('Test getText in status component', () => {    
    const props = { isPlaying: false, isRecording: false, isPlayable:true, isSubscribed:true }
    const status = new Status(props)
    expect(status.getText(props)).toBe("Ready to Play!")
}) 

test('Test getIcon in status component', () => {
    const props = { isPlaying: false, isRecording: false, isPlayable:true, isSubscribed:true }
    const status = new Status(props)
    expect(status.getIcon(props)).toBe("ios-play")
})