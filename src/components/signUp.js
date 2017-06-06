import React, { Component } from 'react';
import { AppRegistry, Text, View, TextInput, TouchableHighlight, StyleSheet } from 'react-native';

class SignUp extends Component {
  static navigationOptions = {
    title: 'Register',
  };
   constructor(){
      super()
      this.state={
         email:'',
         password:'',
         password_confirmation:''
      }
   }
   signUp =(email, password, password_confirmation) =>{
      if (this.state.email.length == 0){
        alert("please enter email");
        return ;
      }
      else if (this.state.password.length == 0){
        alert("please enter password");
        return ;
      }
      else if (this.state.password_confirmation.length == 0){
        alert("please enter confirm password");
        return ;
      }
      else{
        fetch('http://dubweb.herokuapp.com/api/users', {  
           method: 'POST',
           headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
           },
           body: JSON.stringify({user:{email: this.state.email, password: this.state.password, password_confirmation: this.state.password_confirmation}})
        }).then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.status == 'success'){
            this.props.logInUser(responseJson.user, responseJson.token)
          }else{
            alert("Error in registering user");
          }
        }).catch((error) => {
          alert("Error in registering user");
        })
      }
   }

   updateEmail = (text) =>{
      this.setState ({email: text})
   }

   updatePassword = (text) =>{
      this.setState ({password: text})
   }

   updateConfirPassword=(text) =>{
   		this.setState({password_confirmation: text})
   }
   redirectToLogin=() =>{
   	this.props.backToLogin();
   }


   render() {
      const { navigate } = this.props.navigation;
      return (
      <View style = {styles.container}>
        
        <Text style={styles.text}>Email</Text><TextInput onChangeText = {this.updateEmail} style = {styles.input} underlineColorAndroid='transparent'/>
        <Text style={styles.text}>Password</Text><TextInput onChangeText = {this.updatePassword} secureTextEntry={true} style = {styles.input} underlineColorAndroid='transparent'/>
        <Text style={styles.text}>Confirm Password</Text><TextInput onChangeText = {this.updateConfirPassword} secureTextEntry={true} style = {styles.input} underlineColorAndroid='transparent'/>
        <TouchableHighlight
            onPress = { () => this.signUp()} style = {styles.submit}>
            <Text>
               Register
            </Text>
        </TouchableHighlight>
        <Text style={{marginLeft: 50}}>or</Text>
        <TouchableHighlight
            onPress = { () => navigate('Home')} style = {styles.submit}>
            <Text>
               Cancel
            </Text>
         </TouchableHighlight>
      </View>
    );
  }
}
export default SignUp
const styles = StyleSheet.create ({
   container: {
        flex: 2
   },
   text: {
    marginLeft: 15
   },
   input: {
      margin: 15,
      borderColor: 'grey',
      borderWidth: 1
   },
   submit: {
      backgroundColor: 'silver',
      padding: 10,
      alignItems: 'center'
   }
})


AppRegistry.registerComponent('SignUp', () => SignUp);