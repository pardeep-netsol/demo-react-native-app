import React, { Component } from 'react';
import { AsyncStorage, AppRegistry, Text, View, TextInput, TouchableHighlight, StyleSheet, BackHandler, ListView } from 'react-native';
import { NavigationActions } from 'react-navigation'
import Dub from './dubs';

class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'welcome to profile',
    headerLeft: null,
  });

	constructor(props) {
    super(props);
	    this.state = {
	      loaded: false,
	     	dubs: [{"id":22,"caption":"dfsads ","source":{"url":"https://dubapp.s3.amazonaws.com/dub/source/22/1mb.mp4"},"longitude":null,"latitude":null,"parent_id":null,"raw_data":null,"ancestry":null,"created_at":"2017-05-31T05:23:15.922Z","updated_at":"2017-05-31T05:23:15.922Z"},{"id":19,"caption":"test dub","source":{"url":"https://dubapp.s3.amazonaws.com/dub/source/19/002-RDXSTAR.3gp"},"longitude":null,"latitude":null,"parent_id":null,"raw_data":null,"ancestry":null,"created_at":"2017-05-18T16:38:14.788Z","updated_at":"2017-05-18T16:38:14.788Z"}]
	    };
  }

  logout= async() =>{ 
    await AsyncStorage.removeItem('token');
    this.props.navigation.navigate('Home');
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    fetch('http://dubweb.herokuapp.com/api/dubs?auth_token='+this.props.token)  
  	.then((response) => response.json())	
  	.then((responseJson) => {
    	this.setState ({dubs: responseJson});
  	})
  	.catch((error) => {
  	})
  }

  componentWillMount(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({listViewDubs: ds.cloneWithRows(this.state.dubs)})
  }

  handleBackButton() {
    return true;
  }

   render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return (
      <View style = {styles.container}>
        <Text>Hey {params.user.email}</Text>
        <Text>Welcome to Dub App</Text>
        <TouchableHighlight
            onPress = { () => this.logout()} style={styles.submit}>
            <Text>
               Logout
            </Text>
         </TouchableHighlight>
         <Text>or</Text>
         <TouchableHighlight
            onPress = { () => navigate('UserListing', {token: params.token})} style={styles.submit}>
            <Text>
               List all users
            </Text>
         </TouchableHighlight>

         <ListView 
            dataSource={this.state.listViewDubs} 
            renderRow={(rowData) => <Dub dub={rowData} token={this.props.navigation.state.params.token} />} 
          />
      </View>
    );
  }
}
export default Profile
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


AppRegistry.registerComponent('Profile', () => Profile);