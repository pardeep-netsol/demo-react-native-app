import React, { Component } from 'react';
import { AppRegistry, Text, View, TextInput, TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native';

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };
   constructor(props){
      super(props)
      this.state={
         email:'',
         password:''
      }
   }
   login =  (email, password) =>{
     var navigator = this.props.navigation;
     if (email.length == 0){
        alert("please enter email");
        return ;
      }
      else if (password.length == 0){
        alert("please enter password");
        return ;
      }
      else{
        fetch('http://dubweb.herokuapp.com/api/sessions', {  
           method: 'POST',
           headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
           },
           body: JSON.stringify({session:{email: email, password: password}})
        }).then((response) => response.json())
        .then(async (responseJson) => {
          if(responseJson.status == 'success'){
            try{
              await AsyncStorage.setItem('token', responseJson.token);
            }catch (error) {
              alert('AsyncStorage error: ' + error.message);
            }
            navigator.navigate('Profile', { user: responseJson.user, token: responseJson.token});
          }else{
            alert("invalid username or password");
          }
        });
      }
   }

   updateEmail = (text) =>{
      this.setState ({email: text})
   }

   updatePassword = (text) =>{
      this.setState ({password: text})
   }

   register = () =>{
    this.props.registerForm();
   }


   render() {
      const { navigate } = this.props.navigation;
      return (
      <View style = {styles.container}>
        
        <Text style={styles.text}>Email</Text><TextInput onChangeText = {this.updateEmail} style = {styles.input}/>
        <Text style={styles.text}>Password</Text><TextInput onChangeText = {this.updatePassword} secureTextEntry={true} style = {styles.input}/>
        <TouchableHighlight
            onPress = { () => this.login(this.state.email, this.state.password)} style = {styles.submit}>
            <Text>
               Submit
            </Text>
        </TouchableHighlight>
        <Text style={styles.text}>or</Text>

        <TouchableHighlight
            onPress = { () => navigate('SignUp')} style = {styles.submit}>
            <Text>
               Register Now
            </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
export default Login
const styles = StyleSheet.create ({
   container: {
        flex: 2
   },
   text: {
    alignItems: 'center'
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


AppRegistry.registerComponent('Login', () => Login);