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
  static navigationOptions = ({ navigation }) => ({
    title: 'welcome user ',
    headerLeft: null,
  });

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
        <Button
          onPress={() => navigate('Login')}
          title="Login" />
          <Text>OR</Text>
        <Button
          onPress={() => navigate('SignUp')}
          title="Register" />
      </View>     
    );
  }
}

// _gettoken= async () =>{ 
//   try {
//     var token = await AsyncStorage.getItem('token');
//     if (token != null){
//       return token.json();
//     }
//     else{
//        return '';
//     }
//   } catch (error) {
//     return '';
//   }
// }

// var token = _gettoken();
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
        backgroundColor: '#42f4d9'
  },
  submit: {
      backgroundColor: 'silver',
      padding: 10,
      alignItems: 'center'
   }
});

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
