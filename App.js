import React from 'react';
import { StyleSheet, Text, View, FlatList, AppRegistry, TouchableHighlight, ListView, ActivityIndicator} from 'react-native';
import { Button, List, ListItem} from 'native-base';
import { StackNavigator } from 'react-navigation';


const serverURL = 'http://192.168.42.217:5000';


import Component6 from './ManageSubscription.js';


class ListComponent extends React.Component {

  constructor(){
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
          userDataSource: ds,
          initialData : null
        };
  }

  componentDidMount(){
    this.fetchUsers();
  }

  fetchUsers(){
    fetch(serverURL+'/list_customer')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        userDataSource : this.state.userDataSource.cloneWithRows(responseJson.data),
        initialData : "data"
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
    
    renderRow(user,sectionId,rowId,highlightRow){
      const { navigate } = this.props.navigation;
    return(
      
       <TouchableHighlight  onPress={() => navigate('Chat',{ username: user.id, email:user.email})}>
          <View style={styles.view}>
           <Text style={styles.text}> {user.email}</Text>
        
          </View>
      </TouchableHighlight>  
    );
    }


  render(){
     if (!this.state.initialData) {
      return (
        <View  style={styles.indicator}>
        <ActivityIndicator
          animating={true}
          size="large"
        />
        <Text>Fetching Customer List...</Text>
        </View>
      );
    }
    const { navigate } = this.props.navigation;
    return(
   
      <View style={styles.outerView}>
      <ListView 
        dataSource={this.state.userDataSource}
        renderRow={this.renderRow.bind(this)}
      />

      </View>
    
      );
  }
}
export const SimpleApp = StackNavigator({
  Home: { screen: ListComponent},
  Chat: { screen: Component6 },
});

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}

const styles = StyleSheet.create({
  view : {
    flexDirection : "row",
    justifyContent : "center",
    padding : 10,
        backgroundColor : "#f4f4f4",
        marginBottom : 3,
  },
  text : {
    flex :1
  },
  outerView : {
    marginTop : 50
  },
   indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100
  }
});



AppRegistry.registerComponent('App',() => App);
