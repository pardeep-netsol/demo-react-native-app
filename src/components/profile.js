import React, { Component } from 'react';
import { AsyncStorage, AppRegistry, Text, View, TextInput, TouchableHighlight, StyleSheet } from 'react-native';

class Profile extends Component {
	constructor(props) {
    super(props);
	    this.state = {
	      loaded: false,
	     	dubs: []
	    };
  }

  logout= async() =>{ 
    await AsyncStorage.removeItem('token');
    this.props.logout();
  }

  componentDidMount() {
    fetch('http://dubweb.herokuapp.com/api/dubs?auth_token='+this.props.token)  
  	.then((response) => response.json())	
  	.then((responseJson) => {
    	this.setState ({dubs: responseJson});
  	})
  	.catch((error) => {
  	})
  }

   render() {
      return (
      <View style = {styles.container}>
        <Text>Hey {this.props.user.email}</Text>
        <Text>Welcome to Dub App</Text>
        <TouchableHighlight
            onPress = { () => this.logout()} style={styles.submit}>
            <Text>
               Logout
            </Text>
         </TouchableHighlight>
      </View>
    );
  }
}
export default Profile
const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent:'center',
      paddingTop: 23
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


AppRegistry.registerComponent('Profile', () => Profile);