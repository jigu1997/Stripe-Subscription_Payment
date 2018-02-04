import React from 'react';
import { StyleSheet, Text, View, FlatList, AppRegistry, TouchableHighlight, ListView,TouchableWithoutFeedback, Button, ActivityIndicator} from 'react-native';
import { List, ListItem} from 'native-base';
import { StackNavigator } from 'react-navigation';
import { CheckBox } from 'react-native-elements';

import RadioButton from 'radio-button-react-native';
import Formdata from 'FormData';

const serverURL = 'http://192.168.42.217:5000';

var formData = new FormData();

var planArray =[];

let postData = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
    },
    body: formData
}


export default class ManageSubscription extends React.Component {
    
    constructor(){
     super();
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
          userDataSource: ds,
          checked : false,
          planString:"Select a Plan",
          custid : "none",
          value :"send_invoice",
          initialData:null,
        
    };
    }
    
     componentDidMount(){
      this.fetchPlans();
     }

     handleOnPress(value){
      this.setState({value:value});
     }

     toggle() {
        this.setState({checked: !this.state.checked});
        
     }

     subscribeToPlan(customerid){
     
      this.setState({
        custid : customerid
      });
     formData.append('customer_id', customerid);
     formData.append('plan_id',this.state.planString);
     formData.append('bill',this.state.value);



    	fetch(serverURL+'/multiple_subscription', postData)
		  .then((response) =>{ 
			  console.log(response.status);
        console.log(response); 
        if(response.status==200){
        this.setState({
          subscribed:"yes"
        });}
        else{
          this.setState({
            subscribed : "failed"
          });
        }
      })
		  .catch((error) => { 
        console.error(error); 
		 });

    
    }

	

    fetchPlans(){
		fetch(serverURL+'/plan')
		.then((response) => response.json())
		.then((responseJson) => {
		
		this.setState({
		 userDataSource : this.state.userDataSource.cloneWithRows(responseJson.data),
     initialData:"data"
		});
		})
		.catch((error) => {
		console.error(error);
		});
	}
  
	managePlanList(planid){
         var planStringVariable ="empty";
         var flag=planArray.indexOf(planid);
         if(flag==-1){
          planArray.push(planid);
         }
         else{
          var position=planArray.indexOf(planid);
          planArray.splice(position,1);
         }

         for (var i = 0; i<planArray.length; i++) {
           
            if(planStringVariable=="empty"){
            planStringVariable=planArray[i];
           }
           else{
            planStringVariable=planStringVariable+","+planArray[i]; 
           }

         }
         this.setState({
           planString : planStringVariable
         });
         planStringVariable="empty";
	}

	renderRow(plans,sectionId,rowId,highlightRow){
    
    return(
   
       <TouchableHighlight onPress={() =>this.managePlanList(plans.id)}>
          <View style={styles.view}>
           <Text style={styles.text}> {plans.id}</Text>
          </View>
      </TouchableHighlight>
      
    );
    }

	render(){
    if (!this.state.initialData) {
      return (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />
      );
    }
		const { params } = this.props.navigation.state;
    

    if(this.state.subscribed=="yes"){
      return(
        <View style={styles.indicator}>
          <Text>Subscription Successful</Text>
          <Text>Customer name : {this.state.custid}</Text>
          <Text>Plan(s) Subscribed : {this.state.planString}</Text>
          <Text>Billing Method : {this.state.value}</Text>
        </View>
        );
       
    }
    else{
      if(this.state.subscribed=="failed"){
        return(
          <View style={styles.indicator}>
          <Text>Subscription Unsuccessful</Text>
          <Text>Please Try Again</Text>
          </View>
          );
      }
    }
		
		return(

	
			<View style={styles.heading}>
				<Text style={styles.textMedium}>Customer Id : {params.username}</Text>	

				<Text style={styles.textMedium}>Email Id : {params.email}</Text>	

        <Text style={styles.textBig}>Available Plans :</Text>
			
				  <ListView 
				    dataSource={this.state.userDataSource}
				    renderRow={this.renderRow.bind(this)}
				  />
          <Text style={styles.textBig}>Plans Selected : </Text>
          <Text style={styles.textMedium}>{this.state.planString}</Text>
          <Text style={styles.textBig}>Billing Method : </Text>

          <RadioButton style={styles.radioButtonStyle} currentValue={this.state.value} value={"send_invoice"} onPress={this.handleOnPress.bind(this)}>
                <Text style={styles.textMediumRadio}>Send Invoice</Text>
          </RadioButton>
                      
          <RadioButton style={styles.radioButtonStyle} currentValue={this.state.value} value={"charge_automatically"} onPress={this.handleOnPress.bind(this)}>
                 <Text style={styles.textMediumRadio}>Charge Automatically</Text>
          </RadioButton>
       

				<Button 
				  onPress={() => this.subscribeToPlan(params.username)}
				  title="Subscribe To Plan"
				/>
        
           </View>
		  
			)
	}
}

const styles = StyleSheet.create({
	heading : {
		justifyContent : "center",
		padding : 10
	},
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
  textBig : {
   fontSize : 20,
   padding : 10,
   color : "#08332B"
  },
  textMedium : {
    fontSize : 15,
    padding : 10
  },
    textMediumRadio : {
    fontSize : 15,
    paddingLeft : 5
  },
  radioButtonStyle : {
    paddingLeft : 10,
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100
  }
});

 


AppRegistry.registerComponent('ManageSubscription',() => ManageSubscription);
