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
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'


import SignUp from './src/components/signUp';
import Profile from './src/components/profile';
import Login from './src/components/login';
import UserListing from './src/components/userListing';
// import UserDetails from './src/components/userDetails';
global.auth_token = '';

class Home extends React.Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: 'welcome user ',
  //   headerLeft: null,
  //   headerTintColor: 'black',
  // });

  constructor(props){
      super(props)
      this.state={
         user:{},
         token:''
      }
   }

   async componentDidMount() {
    try {
      var token = await AsyncStorage.getItem('token');
      if (token !== null){
        this.setState({token: token});
        this.props.navigation.navigate('Profile', {token: token, user: {email: 'saini.pardeep87@gmail.com'}});
      } 
    } catch (error) {
      global.auth_token = '';
      alert('AsyncStorage error: ' + error.message);
    }
   }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#7d8da5'}}>Welcome to My App</Text>
        </View>
        <View style={styles.bottomNav}>
          <View style={styles.login}>
            <Button onPress={() => navigate('Login')} title="Login" />
          </View>
          <View style={styles.register}>
            <Button onPress={() => navigate('SignUp')} title="Register" />
          </View>
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
    backgroundColor: '#42f4d9',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title:{
    top:250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav:{
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-start'
  },
  login:{
    left:0,
  },
  register:{
    right: 0,
    alignItems: 'flex-end',
    paddingLeft: 230
  },
  submit: {
      backgroundColor: 'silver',
      padding: 10,
      alignItems: 'center'
   }
});

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);