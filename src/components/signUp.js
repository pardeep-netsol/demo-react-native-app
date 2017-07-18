import React, { Component } from 'react';
import { AppRegistry, Text, View, TextInput, TouchableHighlight, StyleSheet, Image } from 'react-native';

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
        <Image source={require('../../images/shadow-flat-logo.png')} style={styles.logo}/>
        <View style={styles.registerBox}>
          <View style={styles.inputContainer}>
            <Image source={require('../../images/avatar-1.png')} style={styles.imageIcon}/>
            <TextInput onChangeText = {this.updateEmail} style = {styles.input} placeholder="Email or Phone number" placeholderTextColor = "#8e8e89"/>
          </View> 
          <View style={styles.inputContainer}>
            <Image source={require('../../images/padlock.png')} style={styles.imageIcon}/>
            <TextInput onChangeText = {this.updatePassword} style = {styles.input} secureTextEntry={true} placeholder="Password" placeholderTextColor = "#8e8e89"/>
          </View> 
          <View style={styles.inputContainer}>
            <Image source={require('../../images/padlock.png')} style={styles.imageIcon}/>
            <TextInput onChangeText = {this.updateConfirPassword} style = {styles.input} secureTextEntry={true} placeholder="Confirm Password" placeholderTextColor = "#8e8e89"/>
          </View> 
        </View>
        <View style={{marginTop: 20}}>        
          <TouchableHighlight
            onPress = { () => this.signUp()} style = {styles.submit}>
            <Text style={{color: '#fff'}}>
               Register
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress = { () => navigate('Home')} style = {styles.submit}>
            <Text style={{color: '#fff'}}>
               Cancel
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
export default SignUp
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo:{
    height: 200,
    width: 200
  },
  registerBox:{
    borderColor: 'grey', 
    borderWidth: 1, 
    width: 300, 
    borderRadius: 5, 
    height: 120,
  },
  inputContainer:{ 
    flexDirection: 'row',
    marginTop: 15
  },
  imageIcon:{
    height: 20, 
    width: 20, 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start',
    marginLeft: 20,
    marginRight: 20
  },
  input: {
    borderColor: 'grey',
    color: '#fff',
    height: 20  ,
    justifyContent: 'flex-end',
    width: 500,
  },
  submit: {
    backgroundColor: '#1a9776',
    padding: 10,
    alignItems: 'center',
    width: 300,
    borderRadius: 5,
    marginBottom: 20
  },
})


// AppRegistry.registerComponent('SignUp', () => SignUp);