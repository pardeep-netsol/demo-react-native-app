import React, { Component } from 'react';
import { AppRegistry, Text, View, TextInput, TouchableOpacity, StyleSheet , Image, TouchableHighlight} from 'react-native';
// import Video from 'react-native-video';
// import MediaPlayer from 'react-native-android-video-player'
// import { Dimensions } from 'react-native'
import VideoPlayer from 'react-native-video-controls';

class Dubs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.dub,
      showVideoPlayer: false,
      showFullScreen:false
    };
  }

  loadStart=()=>{
    // alert("video start loading");
  }

  onBuffer=()=>{
    // alert("video is buffering");
  }

  loadFullScreen=()=>{
    //this.player.presentFullscreenPlayer()
    //this.setState({showFullScreen: true})
  }

  onEnd=()=>{
    this.setState({showFullScreen: false})
  }


  renderVideo=()=>{
    if (this.state.showVideoPlayer){
      return (
        <View style = {styles.videoTag}>
        <VideoPlayer
            source={{uri: this.props.dub.source.url }}
            navigator={ this.props.navigator }
        />
                       
        </View>
        );
      }else{
        return (
          <View style = {styles.videoTag}>
            <TouchableOpacity style={styles.container} onPress={() => this.setState({showVideoPlayer: true})}>
              <Text>
                Open Video Player
              </Text>
            </TouchableOpacity>
          </View>
        );
      }
  }


  
  render() {
      return (
      	<View style = {styles.videoTag}>
          <VideoPlayer
            source={{uri: this.props.dub.source.url }}
            playInBackground={ false }   // play audio when entering background 
            playWhenInactive={ false }   // [iOS] continuing playing when notification centre active 
            resizeMode={ 'contain' }     // 'contain' or 'cover' should be used. 
            paused={ true }             // stop playback entirely 
            repeat={ true }             // Repeats at end of duration 
            muted={ false }              // Mutes the audio entirely. 
            title={ '' }                 // Video title, if null title area is hidden 
            volume={ 1 }                 // 0 is muted, 1 is normal. 
            rate={ 1 }                   // 0 is paused, 1 is normal. 
         
            // settings 
            controlTimeout={ 15000 }     // hide controls after ms of inactivity. 
            navigator={ navigator }      // prop from React Native <Navigator> component 
            seekColor={ '#FFF' }         // fill/handle colour of the seekbar 
            videoStyle={ {} }            // Style appended to <Video> component 
            style={ {} }                 // Style appended to <View> container 
         
            // event callbacks 
            onError={ () => {} }         // Fired when an error is encountered on load 
            onBack={ () => {} }          // Function fired when back button is pressed. 
            onEnd={ () => {} } 
          />
          <View style={styles.bottomBar}>
            <TouchableHighlight
             style={styles.listing}>
            <Image source={require('../../images/chat.png')} style={styles.imageIcon}/>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.logout}>
              <Image source={require('../../images/eye.png')} style={styles.imageIcon}/>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.listing}>
              <Image source={require('../../images/like.png')} style={styles.imageIcon}/>
            </TouchableHighlight>
          </View>                       
        </View>
    );
  }
}
export default Dubs
// const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
   },
   videoTag: {
    height: 300,
   },
   backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    bottomBar:{
      height: 50,
      backgroundColor: '#1a9776',
      flexDirection: 'row',
      alignItems: 'center',
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
    imageIcon:{
      height: 20, 
      width: 20, 
      justifyContent: 'flex-start', 
      alignItems: 'flex-start',
      marginLeft: 10,
      marginRight: 10
    },
})


AppRegistry.registerComponent('Dubs', () => Dubs);