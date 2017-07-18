import React, { Component } from 'react';
import { AppRegistry, Text, Image, View, TextInput, TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native';
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

class Login extends Component {
  static navigationOptions = {
    title: 'Sign In',
    // headerLeft: (<View style={{flexDirection: 'row'}}><Image source={require('../../images/icon-left.png')} style = {{height: 20, width: 50}}/><Text style={{color: '#fff'}}>welcome</Text></View>),
    headerTitleStyle: {
      backgroundColor: '#000'
    },
    headerTitleStyle: {
      color: '#000'
    }
  };
  constructor(props){
    super(props)
    this.state={
       email:'',
       password:'',
       loader: false
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
      loaderHandler.showLoader("Loading...");
      this.setState({loader: true})
      fetch('https://dubweb.herokuapp.com/api/sessions', {  
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
            loaderHandler.hideLoader();
            this.setState({loader: false})
            alert('AsyncStorage error: ' + error.message);
          }
          loaderHandler.hideLoader();
          this.setState({loader: false})
          navigator.navigate('Profile', { user: responseJson.user, token: responseJson.token});
        }else{
          loaderHandler.hideLoader();
          this.setState({loader: false})
          alert("invalid username or password");
        }
      }).catch((error) => {
        loaderHandler.hideLoader();
        this.setState({loader: false})
        alert("Error in login user");
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
        <BusyIndicator />
        <Text style={styles.titleH1}><Image source={require('../../images/shadow-flat-logo.png')} style={styles.logo}/></Text>
        <View style={styles.loginBox}>
          <View style={styles.inputContainer}>
            <Image source={require('../../images/avatar-1.png')} style={styles.imageIcon}/>
            <TextInput onChangeText = {this.updateEmail} style = {styles.input} placeholder="Email or Phone number" placeholderTextColor = "#8e8e89"/>
          </View>
          <View style={styles.inputContainer}>
            <Image source={require('../../images/padlock.png')} style={styles.imageIcon}/>
            <TextInput onChangeText = {this.updatePassword} secureTextEntry={true} style = {styles.input} placeholder="Password" placeholderTextColor ="#8e8e89"/>
          </View>
        </View>
        <View><Text style={{fontSize: 10, marginLeft: 220, marginTop: 10, color: '#fff'}}>Forgot Password?</Text></View>
        <View style={{marginTop: 20}}>        
          <TouchableHighlight
            onPress = { () => this.login(this.state.email, this.state.password)} style = {styles.submit} >
            <Text style={{color: '#fff', fontSize: 15}}>
               Login
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.signUp}>
          <Text style={{fontSize: 15, color: '#fff'}}>Don't have an account?</Text>
          <Text style={{marginTop: 10, color: '#e5e6e8'}}>Sign Up with</Text>
        </View>
        <View style={styles.bottomButton}>
          <TouchableHighlight
            onPress = { () => navigate('SignUp')} style = {styles.register}>
            <Text style={styles.socialButton}>
               Register
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress = { () => navigate('SignUp')} style = {styles.google}>
            <Text style={{color: '#ff6454'}}>
               Google
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress = { () => navigate('SignUp')} style = {styles.facebook}>
            <Text style={{color: '#385dad'}}>
               Facebook
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress = { () => navigate('SignUp')} style = {styles.twitter}>
            <Text style={{color: '#00c4ff'}}>
               Twitter
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
export default Login
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleH1:{
    fontSize: 35,
    color: '#7d8da5',
    fontWeight: "bold",
    marginTop: 20    
  },
  logo:{
    height: 200,
    width: 200
  },
  text: {
    alignItems: 'center'
  },
  loginBox:{
    borderColor: 'grey', 
    borderWidth: 1, 
    width: 300, 
    borderRadius: 5, 
    height: 83,
    // marginTop: 80
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
   image: {
      width: 50,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
   },
  bottomButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 50,
    position: 'absolute',
    bottom: 10
  },
   submit: {
      backgroundColor: '#1a9776',
      padding: 10,
      alignItems: 'center',
      width: 300,
      borderRadius: 5
  },
  register:{
    marginLeft: 10,
    backgroundColor: '#000',
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5
  },
  google:{
    marginLeft: 10,
    backgroundColor: '#000',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ff6454',
    borderRadius: 5
  },
  facebook:{
    marginLeft: 10,
    backgroundColor: '#000',
    padding: 10,
    borderWidth: 1,
    borderColor: '#385dad',
    borderRadius: 5
  },
  twitter:{
    marginLeft: 10,
    backgroundColor: '#000',
    padding: 10,
    borderWidth: 1,
    borderColor: '#00c4ff',
    borderRadius: 5
  },
  signUp:{
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  socialButton:{
    color: '#fff'
  }
})


AppRegistry.registerComponent('Login', () => Login);