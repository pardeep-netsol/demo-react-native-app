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
  TouchableHighlight, 
  Button, Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'


import SignUp from './src/components/signUp';
import Profile from './src/components/profile';
import Login from './src/components/login';
import UserListing from './src/components/userListing';
// import UserDetails from './src/components/userDetails';
// global.auth_token = '';

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    // title: 'welcome user ',
    headerLeft: null,
    headerTintColor: '#1a1a1a',
  });
  constructor(props){
      super(props)
      this.state={
         user:{},
         token:''
      }
   }

   async componentWillMount() {
    try {
      var token = await AsyncStorage.getItem('token');
      if (token !== null){
        this.setState({token: token});
        this.props.navigation.navigate('Profile', {token: token, user: {email: 'saini.pardeep87@gmail.com'}});
      }else{
        this.props.navigation.navigate('Login');
      } 
    } catch (error) {
      alert('AsyncStorage error: ' + error.message);
    }
   }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Image source={require('./images/shadow-flat-logo.png')} />
        </View>
      </View>     
    );
  }
}

const AwesomeProject = StackNavigator({
  // initialRouteName: {screen: (token.length == 0 ? Home : Profile)},
  Home: { screen: Home },
  Login: {screen:  Login},
  SignUp: {screen: SignUp},
  Profile: {screen: Profile},
  UserListing: {screen: UserListing}

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1a1a1a'
  },
  title:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100  
  },
  bottomNav:{
    flexDirection: 'column',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  login:{
    backgroundColor: '#1a9776',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);