import React from "react";
import { View, StyleSheet, Picker, TouchableOpacity, Text, Button, TextInput, Image, ScrollView,pickerSelectStyles } from 'react-native';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import Header from '../Components/Header';


export default class Myapp extends React.Component {
render() {
return (
      
     <View >
     <View>
          <Header
            header="Report Detail"
            onPressLeft={() => this.props.navigation.goBack()}
            sourceLeft={require('../Images/back.png')}
          />
        </View >
        
        <View style={{borderWidth:1,borderColor:'black',margin:10}}>
         <View style={{flexDirection:'row'}}>
          <Text style={{ fontSize: 20, marginLeft: 10,marginTop:10 }}>City:</Text>
          <Text style={{ fontSize: 20,marginTop:10 }}> {this.props.navigation.state.params.Data.cityname}</Text>
        </View>
        
        <View style={styles.seprator}></View>
        
        <View style={{flexDirection:'row'}}>
          <Text style={{ fontSize: 20, marginLeft: 10 }}>Accident Type:</Text>
          <Text style={{ fontSize: 20 }}> {this.props.navigation.state.params.Data.reporttitle}</Text>
         </View>
        
         <View style={styles.seprator}></View>

        <View style={{flexDirection:'row'}}>
          <Text style={{ fontSize: 20, marginLeft: 10 }}>Date:</Text>
          <Text style={{ fontSize: 20 }}>{this.props.navigation.state.params.Data.createddate}</Text>
        </View>

        <View style={styles.seprator}></View>
        
        <View style={{flexDirection:'row'}}>
          <Text style={{ fontSize: 20, marginLeft: 10 }}>Address :</Text>
          <Text style={{ fontSize: 20,width: 280 }}> {this.props.navigation.state.params.Data.address}</Text>
        </View>

        <View style={styles.seprator}></View>
        
        <View style={{flexDirection:'row'}}> 
          <Text style={{ fontSize: 20, marginLeft: 10 }}>Description :</Text>
          <Text style={{ fontSize: 20,width: 250 }}> {this.props.navigation.state.params.Data.description}</Text>
        </View>
        
        <View style={styles.seprator}></View>

       <View>
          <Text style={{ fontSize: 20, marginLeft: 10 }}> Images :</Text>
        </View>
       <View>
       <View style={{ justifyContent:'center',alignItems:'center' }}>
            <Image style={{ width: 150, height: 150, margin: 10 }} source={{ uri: 'http://myreportsystem.000webhostapp.com/admin/images/'+ this.props.navigation.state.params.Data.image}}
            />
            

       </View>
       </View>
       </View>
       </View>
       
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 50,
    padding:16
 },
 seprator:{
  marginBottom: 5,
  marginTop: 5
 }
});