import React, { Component } from 'react';
import { AsyncStorage, AppRegistry, Text, View, TextInput, TouchableHighlight, StyleSheet, ListView } from 'react-native';

class Loading extends Component {
  
  render() {
      return (
      <View style = {styles.container}>
        
      </View>
    );
  }
}
export default Loading
const styles = StyleSheet.create ({
   container: {
      flex: 1      
   },
   input: {
      width: 100,
      margin: 15,
      borderColor: 'grey',
      borderWidth: 1
   },
   submit: {
      backgroundColor: 'silver',
      padding: 10
   }
})


AppRegistry.registerComponent('Loading', () => Loading);