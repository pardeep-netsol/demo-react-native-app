import React, { Component } from 'react';
import { AppRegistry, Text, View, TextInput, TouchableHighlight, StyleSheet , Image} from 'react-native';
import Video from 'react-native-video';
// import MediaPlayer from 'react-native-android-video-player'
// import { Dimensions } from 'react-native'
// import VideoPlayer from 'react-native-video-controls';

class Dubs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.dub
    };
  }

  
  render() {
      return (
      	<View>
          <Text>{this.props.dub.caption}</Text>
          <View style = {styles.videoTag}>
            <Video source={{uri: this.props.dub.source.url}}
              ref={(ref) => {
                   this.player = ref
                 }} 
               rate={0}                              // 0 is paused, 1 is normal.
               volume={1.0}                            // 0 is muted, 1 is normal.
               muted={false}                           // Mutes the audio entirely.
               paused={true}
               controls={true} 
               fullscreen={true}                          // Pauses playback entirely.
               resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
               repeat={false}                           // Repeat forever.
               playInBackground={false}                // Audio continues to play when app entering background.
               playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
               ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
               progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
               onLoadStart={this.loadStart}            // Callback when video starts to load
               onLoad={this.setDuration}               // Callback when video loads
               onProgress={this.setTime}               // Callback every ~250ms with currentTime
               onEnd={this.onEnd}                      // Callback when playback finishes
               onError={this.videoError}               // Callback when video cannot be loaded
               onBuffer={this.onBuffer}                // Callback when remote video is buffering
               onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
               style={styles.backgroundVideo}
               />            
          </View>
        </View> 
    );
  }
}
export default Dubs
// const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create ({
   container: {
      paddingLeft: 8,
      flexDirection: 'row',
   },
   videoTag: {
    height: 300,
    paddingTop: 50,
   },
   backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
   outer:{
    flexDirection: 'column',
    paddingTop: 20
   },
   detail_cont:{
      width: 300,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'row',
   },
   profile_pic:{
      width: 50,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
   },
   text: {
   		width: 50,
  		alignItems: 'center',
  		justifyContent: 'flex-start'
   },
   submit:{
   		backgroundColor: 'silver',
      width: 100,
      alignItems: 'center',
      justifyContent: 'center'
  	},
})


AppRegistry.registerComponent('Dubs', () => Dubs);