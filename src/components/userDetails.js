import React, { Component } from 'react';
import { AppRegistry, Text, View, TextInput, TouchableHighlight, StyleSheet , Image} from 'react-native';

class UserDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  updateRelationship =() =>{
    {this.props.user.follow ? this.unfollowUser() : this.followUser()}
  }

  followUser=()=>{
    fetch('http://reelweb.herokuapp.com/api/relationships', {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: this.props.user.id, auth_token: this.props.token})
    }).then((response) => response.json())
    .then(async (responseJson) => {
      if(responseJson.status == 'success'){
        this.props.parentCallback(this.state.user);
      }else{
        alert("there is some error at server end , please try again later");
      }
    });
  } 

  unfollowUser=()=>{
    fetch('http://reelweb.herokuapp.com/api/relationships/'+this.props.user.id+'?auth_token='+this.props.token, {  
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
    .then(async (responseJson) => {
      if(responseJson.status == 'success'){
        this.props.parentCallback(this.state.user);
      }else{
        alert("there is some error at server end , please try again later");
      }
    });
  } 

  render() {
      return (
      	<View>
          <View style={styles.container}>
  		      <View style={styles.outer}>
              <View style={styles.detail_cont}>
    		        <Text style={styles.text}>Name : </Text><Text>{this.props.user.name}</Text>        
    		      </View>
    		      <View style={styles.detail_cont}>
    		        <Text style={styles.text}>Email : </Text><Text>{this.props.user.email}</Text>        
    		      </View>
            </View>
            <View style={styles.profile_pic}>
              {(this.props.user.image.length == 0 ? <Image style={{width: 50, height: 50}} source={require('../../images/logo_og.png')} /> : <Image style={{width: 50, height: 50}}  source={{uri: this.props.user.image}} />)}
            </View>
          </View>          
          <TouchableHighlight
            onPress = { () => this.updateRelationship()} style={styles.submit}>
            <Text>
              {this.props.user.follow ? "Unfollow" : "Follow"}
            </Text>
         </TouchableHighlight>
		    </View>
    );
  }
}
export default UserDetails
const styles = StyleSheet.create ({
   container: {
      paddingLeft: 8,
      flexDirection: 'row',
   },
   outer:{
    flexDirection: 'column',
    paddingTop: 20
   },
   detail_cont:{
      width: 300,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'row',
   },
   profile_pic:{
      width: 50,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
   },
   text: {
   		width: 50,
  		alignItems: 'center',
  		justifyContent: 'flex-start'
   },
   submit:{
   		backgroundColor: 'silver',
      width: 100,
      alignItems: 'center',
      justifyContent: 'center'
  	},
})


AppRegistry.registerComponent('UserDetails', () => UserDetails);