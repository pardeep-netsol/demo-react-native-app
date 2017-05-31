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
  View,
  TouchableHighlight
} from 'react-native';

import SignUp from './src/components/signUp';
import Profile from './src/components/profile';
import Login from './src/components/login';

export default class AwesomeProject extends Component {
  constructor(){
      super()
      this.state={
         user:{},
         token:'',
         showLogin: true,
         showSignUp:false
      }
   }

   async componentDidMount() {
    try {
      var token = await AsyncStorage.getItem('token');
      if (token !== null){
        this.setState({token: token, showLogin: false});
      } 
    } catch (error) {
      alert('AsyncStorage error: ' + error.message);
    }
   }

   setUserAndToken = async (user, token) =>{
    this.setState({user: user, token: token, showLogin: false, showSignUp: false})
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      alert('AsyncStorage error: ' + error.message);
    }
   }

   handleLogout=() =>{
    this.setState({showLogin: true})
   }

   showSingUP=() =>{
    this.setState({showLogin: false, showSignUp: true})
   }

   backToLogin=()=>{
    this.setState({showLogin: true, showSignUp: false})
   }



  render() {
    return (
      <View style={styles.container}>
        { this.state.showLogin ? <Login logInUser={this.setUserAndToken} showLogin={this.showLogin} registerForm={this.showSingUP}/> : null}
        {(!this.state.showLogin && !this.state.showSignUp) ? <Profile user={this.state.user} token={this.state.token} logout={this.handleLogout}/> : null}
        {this.state.showSignUp ? <SignUp logInUser={this.setUserAndToken} backToLogin={this.backToLogin}/> : null}
      </View>     
    );
  }
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#42f4d9'
  },
  submit: {
      backgroundColor: 'silver',
      padding: 10,
      alignItems: 'center'
   }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
