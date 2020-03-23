import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,


 } from 'react-native';
 import Header from '../Components/Header';
 import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component{

  logout=()=>
  {
    console.log("Logogoogogo");
    AsyncStorage.removeItem('userData');
    this.props.navigation.navigate("Login")
  }

 render(){
   
  const { navigation } = this.props;  
  const emailid = navigation.getParam('email', 'NO-User');
  return(
    <View style={{backgroundColor : 'white', flex : 1}}>
        <View>
          <Header
            header="Home"
            
          />
        </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("profile")}>
               <Text style={{
                   backgroundColor: '#000',
                   color: '#fff',
                   fontSize: 16,
                   padding: 10,
                   width: 105,
                   height: 50,
                   textAlign: 'center',
                   margin: 10,
                   borderRadius:30,

               }}>
                   Profile
               </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("systeminformation")}>
               <Text style={{
                   backgroundColor: '#000',
                   color: '#fff',
                   fontSize: 16,
                   padding: 10,
                   width: 120,
                   height: 50,
                   textAlign: 'center',
                   margin: 10,
                   borderRadius:30,
                    
               }}>
                   Information
               </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("report",{})}>
               <Text style={{
                   backgroundColor: '#000',
                   color: '#fff',
                   fontSize: 16,
                   padding: 10,
                   width: 105,
                   height: 50,
                   textAlign: 'center',
                   margin: 10,
                   borderRadius:30,
                    
               }}>
                   Report
               </Text>
          </TouchableOpacity>
     </View>
     <View style={{alignItems:'center'}}>
     <Image
          style={{width: 180, height: 180}}
            source={require('../Images/accident.jpg')}
             />
      <View>
        <Text style={{color: '#000', fontFamily: 'Lato-Black', fontSize: 30,marginTop: 15}}>Accident Report System</Text>
      </View>
      
     </View>
     <View style={{alignItems:'center'}}>
     <TouchableOpacity onPress={() => this.props.navigation.navigate("createnewreport")}>
               <Text style={{
                   backgroundColor: '#000',
                   color: '#fff',
                   fontSize: 16,
                   padding: 10,
                   width: 350,
                   height: 50,
                   textAlign: 'center',
                   margin: 40,
                   borderRadius:30,
                    
               }}>
                   Create New Report
               </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.logout}>
               <Text style={{
                   backgroundColor: '#000',
                   color: '#fff',
                   fontSize: 16,
                   padding: 10,
                   width: 130,
                   height: 50,
                   textAlign: 'center',                   
                   marginTop: 15,
                   borderRadius:30,
                    
               }}>
                   Log Out
               </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("contactus")}>
            <Text style={{
                   backgroundColor: '#000',
                   color: '#fff',
                   fontSize: 16,
                   padding: 10,
                   width: 130,
                   height: 50,
                   textAlign: 'center',                  
                   marginTop: 30,
                   borderRadius:30,
                    
               }}>Contact Us</Text>
          </TouchableOpacity>
     </View>
   </View>
  );
 }
}