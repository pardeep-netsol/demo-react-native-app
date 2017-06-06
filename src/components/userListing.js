import React, { Component } from 'react';
import { AsyncStorage, AppRegistry, Text, View, TextInput, TouchableHighlight, StyleSheet, ListView } from 'react-native';
import UserDetails from './userDetails';

class UserListing extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "User Listing",
  });

	constructor(props) {
    super(props);
    this.state = {
      loaded: false,
     	users: [{"id":5,"name":"DuBose Digtial","username":"thenext","email":"jacoby@james.com","city":null,"state":null,"verified":null,"director":null,"image":"","bio":null,"created_at":"2017-05-05T17:38:24.580Z","updated_at":"2017-05-05T17:38:24.592Z", "follow": true},{"id":12,"name":null,"username":null,"email":"saini.pardeep87@live.com","city":null,"state":null,"verified":null,"director":null,"image":"","bio":null,"created_at":"2017-05-06T16:37:51.139Z","updated_at":"2017-05-06T16:37:51.241Z", "follow": true},{"id":6,"name":"aa","username":"aa","email":"abc@james.com","city":null,"state":null,"verified":null,"director":null,"image":"","bio":null,"created_at":"2017-05-06T05:39:15.478Z","updated_at":"2017-05-06T05:39:15.497Z", "follow": false},{"id":7,"name":"DuBose Digtial","username":"thenext","email":"jacoby@jas.com","city":null,"state":null,"verified":null,"director":null,"image":"","bio":null,"created_at":"2017-05-06T05:47:32.771Z","updated_at":"2017-05-06T05:47:32.782Z", "follow": false},{"id":1,"name":"Coby DuBose","username":"cobydub","email":"jacoby@itsreel.tv","city":null,"state":null,"verified":true,"director":true,"image":"http://s3.amazonaws.com/dubapp/users/images/000/000/001/original/run.jpg?1494996885","bio":"I will write about myself here","created_at":"2017-04-25T15:38:40.880Z","updated_at":"2017-05-23T11:24:15.898Z", "follow": false},{"id":3,"name":null,"username":null,"email":"antoniomarquis@gmail.com","city":null,"state":null,"verified":null,"director":null,"image":"","bio":null,"created_at":"2017-05-05T14:30:48.040Z","updated_at":"2017-05-06T05:50:55.985Z"},{"id":9,"name":"Roadies","username":"Roadies","email":"developer.roadie@gmail.com","city":null,"state":null,"verified":null,"director":null,"image":"","bio":null,"created_at":"2017-05-06T05:54:44.551Z","updated_at":"2017-05-06T05:54:44.563Z", "follow": false},{"id":10,"name":"rrr","username":"rrr","email":"r@s.com","city":null,"state":null,"verified":null,"director":null,"image":"","bio":null,"created_at":"2017-05-06T05:58:50.575Z","updated_at":"2017-05-06T05:58:50.585Z", "follow": false},{"id":8,"name":"Roadies","username":"Roadies","email":"developer.roadies@gmail.com","city":null,"state":null,"verified":null,"director":null,"image":"","bio":null,"created_at":"2017-05-06T05:48:52.284Z","updated_at":"2017-05-06T12:16:34.520Z", "follow": false},{"id":4,"name":"DuBose Digtial","username":"thenextblackbillionaire","email":"jacoby@dub.digital","city":null,"state":null,"verified":null,"director":null,"image":"","bio":null,"created_at":"2017-05-05T17:08:52.245Z","updated_at":"2017-05-05T17:08:52.279Z", "follow": false},{"id":14,"name":null,"username":null,"email":"a@mail.com","city":null,"state":null,"verified":null,"director":null,"image":"","bio":null,"created_at":"2017-05-09T03:34:21.272Z","updated_at":"2017-05-09T03:34:21.287Z", "follow": false},{"id":15,"name":null,"username":null,"email":"saini.pardeep5704@gmail.com","city":null,"state":null,"verified":null,"director":null,"image":"","bio":null,"created_at":"2017-05-31T07:02:33.471Z","updated_at":"2017-05-31T07:02:33.523Z", "follow": false},{"id":16,"name":null,"username":null,"email":"pardeep.saini@netsolutions.in","city":null,"state":null,"verified":null,"director":null,"image":"","bio":null,"created_at":"2017-05-31T07:22:24.925Z","updated_at":"2017-05-31T07:22:24.945Z", "follow": false},{"id":2,"name":null,"username":null,"email":"saini.pardeep87@gmail.com","city":null,"state":null,"verified":null,"director":null,"image":"","bio":null,"created_at":"2017-04-25T15:58:41.864Z","updated_at":"2017-06-01T09:59:15.863Z", "follow": false},{"id":11,"name":"James Demo","username":"jamesdemo","email":"james@demo.com","city":null,"state":null,"verified":null,"director":null,"image":"","bio":"","created_at":"2017-05-06T12:17:51.377Z","updated_at":"2017-05-23T11:09:33.671Z", "follow": false},{"id":13,"name":null,"username":null,"email":"jax@dub.com","city":null,"state":null,"verified":null,"director":null,"image":"","bio":null,"created_at":"2017-05-08T03:11:10.941Z","updated_at":"2017-05-23T11:12:59.454Z", "follow": false}]
    };
  }

  updateUserRelationship = (user) =>{
    this.state.users.map(function(u){
      if (u.id == user.id){
        u.follow = !u.follow
      }
    });
    this.setState({users: this.state.users});
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({listViewUsers: ds.cloneWithRows(this.state.users)})
  }

  componentWillMount(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({listViewUsers: ds.cloneWithRows(this.state.users)})
  }

  componentDidMount() {
    
    // this.setState({users: ds.cloneWithRows(this.state.users)})
    // ds.cloneWithRows([{"id":5,"name":"DuBose Digtial","username":"thenext","email":"jacoby@james.com","city":null,"state":null,"verified":null,"director":null,"image":"/images/original/missing.png","bio":null,"created_at":"2017-05-05T17:38:24.580Z","updated_at":"2017-05-05T17:38:24.592Z", "follow": true},{"id":12,"name":null,"username":null,"email":"saini.pardeep87@live.com","city":null,"state":null,"verified":null,"director":null,"image":"/images/original/missing.png","bio":null,"created_at":"2017-05-06T16:37:51.139Z","updated_at":"2017-05-06T16:37:51.241Z", "follow": true},{"id":6,"name":"aa","username":"aa","email":"abc@james.com","city":null,"state":null,"verified":null,"director":null,"image":"/images/original/missing.png","bio":null,"created_at":"2017-05-06T05:39:15.478Z","updated_at":"2017-05-06T05:39:15.497Z", "follow": false},{"id":7,"name":"DuBose Digtial","username":"thenext","email":"jacoby@jas.com","city":null,"state":null,"verified":null,"director":null,"image":"/images/original/missing.png","bio":null,"created_at":"2017-05-06T05:47:32.771Z","updated_at":"2017-05-06T05:47:32.782Z", "follow": false},{"id":1,"name":"Coby DuBose","username":"cobydub","email":"jacoby@itsreel.tv","city":null,"state":null,"verified":true,"director":true,"image":"http://s3.amazonaws.com/dubapp/users/images/000/000/001/original/run.jpg?1494996885","bio":"I will write about myself here","created_at":"2017-04-25T15:38:40.880Z","updated_at":"2017-05-23T11:24:15.898Z", "follow": false},{"id":3,"name":null,"username":null,"email":"antoniomarquis@gmail.com","city":null,"state":null,"verified":null,"director":null,"image":"/images/original/missing.png","bio":null,"created_at":"2017-05-05T14:30:48.040Z","updated_at":"2017-05-06T05:50:55.985Z"},{"id":9,"name":"Roadies","username":"Roadies","email":"developer.roadie@gmail.com","city":null,"state":null,"verified":null,"director":null,"image":"/images/original/missing.png","bio":null,"created_at":"2017-05-06T05:54:44.551Z","updated_at":"2017-05-06T05:54:44.563Z", "follow": false},{"id":10,"name":"rrr","username":"rrr","email":"r@s.com","city":null,"state":null,"verified":null,"director":null,"image":"/images/original/missing.png","bio":null,"created_at":"2017-05-06T05:58:50.575Z","updated_at":"2017-05-06T05:58:50.585Z", "follow": false},{"id":8,"name":"Roadies","username":"Roadies","email":"developer.roadies@gmail.com","city":null,"state":null,"verified":null,"director":null,"image":"/images/original/missing.png","bio":null,"created_at":"2017-05-06T05:48:52.284Z","updated_at":"2017-05-06T12:16:34.520Z", "follow": false},{"id":4,"name":"DuBose Digtial","username":"thenextblackbillionaire","email":"jacoby@dub.digital","city":null,"state":null,"verified":null,"director":null,"image":"/images/original/missing.png","bio":null,"created_at":"2017-05-05T17:08:52.245Z","updated_at":"2017-05-05T17:08:52.279Z", "follow": false},{"id":14,"name":null,"username":null,"email":"a@mail.com","city":null,"state":null,"verified":null,"director":null,"image":"/images/original/missing.png","bio":null,"created_at":"2017-05-09T03:34:21.272Z","updated_at":"2017-05-09T03:34:21.287Z", "follow": false},{"id":15,"name":null,"username":null,"email":"saini.pardeep5704@gmail.com","city":null,"state":null,"verified":null,"director":null,"image":"/images/original/missing.png","bio":null,"created_at":"2017-05-31T07:02:33.471Z","updated_at":"2017-05-31T07:02:33.523Z", "follow": false},{"id":16,"name":null,"username":null,"email":"pardeep.saini@netsolutions.in","city":null,"state":null,"verified":null,"director":null,"image":"/images/original/missing.png","bio":null,"created_at":"2017-05-31T07:22:24.925Z","updated_at":"2017-05-31T07:22:24.945Z", "follow": false},{"id":2,"name":null,"username":null,"email":"saini.pardeep87@gmail.com","city":null,"state":null,"verified":null,"director":null,"image":"/images/original/missing.png","bio":null,"created_at":"2017-04-25T15:58:41.864Z","updated_at":"2017-06-01T09:59:15.863Z", "follow": false},{"id":11,"name":"James Demo","username":"jamesdemo","email":"james@demo.com","city":null,"state":null,"verified":null,"director":null,"image":"/images/original/missing.png","bio":"","created_at":"2017-05-06T12:17:51.377Z","updated_at":"2017-05-23T11:09:33.671Z", "follow": false},{"id":13,"name":null,"username":null,"email":"jax@dub.com","city":null,"state":null,"verified":null,"director":null,"image":"/images/original/missing.png","bio":null,"created_at":"2017-05-08T03:11:10.941Z","updated_at":"2017-05-23T11:12:59.454Z", "follow": false}])
   //  fetch('http://dubweb.herokuapp.com/api/users?auth_token='+this.props.navigation.state.params.token)
   //  .then((response) => response.json())    
  	// .then((responseJson) => {
   //  	this.setState ({dubs: responseJson});
  	// })
  	// .catch((error) => {
  	// })
  }

   render() {
      return (
      <View style = {styles.container}>
        <ListView 
          dataSource={this.state.listViewUsers} 
          renderRow={(rowData) => <UserDetails user={rowData} token={this.props.navigation.state.params.token} parentCallback={this.updateUserRelationship.bind(this)} />} 
        />
      </View>
    );
  }
}
export default UserListing
const styles = StyleSheet.create ({
   container: {
      flex: 1      
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


AppRegistry.registerComponent('UserListing', () => UserListing);