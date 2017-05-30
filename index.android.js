/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Profile from './src/components/profile';
import Login from './src/components/login';



export default class AwesomeProject extends Component {
  constructor(){
      super()
      this.state={
         user:{},
         token:'',
         showLogin: true
      }
   }

   async componentDidMount() {
    try {
      var token = await AsyncStorage.getItem('token');
      if (token !== null){
        this.setState({token: token, showLogin: false});
      } else {
        alert('Initialized with no selection on disk.');
      }
    } catch (error) {
      alert('AsyncStorage error: ' + error.message);
    }
   }

   setUserAndToken = async (user, token) =>{
    this.setState({user: user, token: token, showLogin: false})
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      alert('AsyncStorage error: ' + error.message);
    }
   }

   handleLogout=() =>{
    this.setState({showLogin: true})
   }


  render() {
    return (
      <View style={styles.container}>
        { this.state.showLogin ? <Login logInUser={this.setUserAndToken} showLogin={this.showLogin}/> : <Profile user={this.state.user} token={this.state.token} logout={this.handleLogout}/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FF3366'
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
