import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import { Video } from 'expo-av';
import { Colors, Sizes } from '../constants';
import { BackBtn } from '../components';

const VideoShowing = ({ navigation }) => {
  const video = React.useRef(null);
  // const secondVideo = React.useRef(null);
  const [status, setStatus] = useState({});
  // const [statusSecondVideo, setStatusSecondVideo] = useState({});

  return (
    <View style={styles.container}>
      <BackBtn style={{ top: Sizes.xxLarge }} onPress={() => navigation.goBack()}></BackBtn>



      <Video
        ref={video}
        style={styles.video}
        source={require("../assets/videos/Natural Coffee Processing.mp4")}
        useNativeControls
        resizeMode='contain'
        isLooping
        onPlaybackStatusUpdate={setStatus}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => video.current.playFromPositionAsync(5000)}>
          <Text style={styles.buttonText}>Play from 5s</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => video.current.setIsLoopingAsync(!status.isLooping)}>
          <Text style={styles.buttonText}>{status.isLooping ? "Turn off loop" : "Turn on loop"}</Text>
        </TouchableOpacity>
      </View>



    </View>


  )
}

export default VideoShowing;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    backgroundColor: Colors.white,
    // alignItems: "center",
    justifyContent: "center"
  },
  video: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch"
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})