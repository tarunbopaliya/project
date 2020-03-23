import React from "react";
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, Button, TextInput, Image, showEmailError, Alert ,ActivityIndicator,} from 'react-native';
import Header from '../Components/Header';
import API from '../API/Config';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';


export default class forgotpsw extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading : false,
      email_address: '',
      showEmailError: true,
      showEmailErrorText: '',

    }
  }

  onChangeText(email_address) {
    this.setState({
      int2: email_address
    })
  }

  validateEmail = (email_address) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email_address);
  };

  buttonClickListener = () => {
    var email_address = this.state.email_address;
    var validationError = false;
    if (email_address == '') {
      validationError = true;
      this.setState({ showEmailError: true, showEmailErrorText: 'Please enter email' });
    }
     else {
      if (!this.validateEmail(this.state.email_address)) {
        validationError = true;
        this.setState({ showEmailError: true, showEmailErrorText: 'Please enter valid email' });
      } 
      
      else {
        this.setState({ showEmailError: false, loading : true});
        fetch(API.SITE_URL + 'ResetPass.php?email=' + this.state.email_address)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              loading : false
            })
            console.log("URL Response : ", responseJson);
            console.log("url message :", responseJson.message);
            console.log("url otp data :",responseJson.data[1]);
            if (responseJson.status == 1) {
              
              this.props.navigation.navigate("OTP",{email:this.state.email_address});
              
            } else {
              alert("Please enter correct email!")
            }
          })
          .catch((error) => {
            console.log("ERROR", error);
          });

      }
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>

        <Header
          onPressLeft={() => this.props.navigation.goBack()}
          header="Forgot Password"
          sourceLeft={require('../Images/back.png')}
        />
        <Spinner
          visible={this.state.loading}
        />
        <View style={{ alignItems: 'center', }}>
          <View >
            <Image
              style={{ height: 200, width: 300, marginLeft: 30 }}
              source={require('../Images/accident.jpg')}
            />
          </View>
          <View >
            <Text style={{ fontSize: 25, marginBottom: 25, }}> ACCIDENT REPORT SYSTEM</Text>
          </View>
          <View></View>
          <View >
            <Text style={{ fontSize: 15, }}> Please enter your registerd Email id</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder='Email Id'
              placeholderTextColor='black'
              onChangeText={email_address => this.setState({ email_address })}
              value={this.state.int2}
            />
            {this.state.showEmailError == true ? <Text style={{ color: 'red' }}>{this.state.showEmailErrorText}</Text> : null}

          </View>

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Back to Login</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.buttonClickListener()}>
              <Text style={styles.input1} > Sent</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>


    );
  }
}




const styles = StyleSheet.create({
  seprator: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#ebebeb',
    marginBottom: 5,
    marginTop: 5,

  },
  input1: {
    backgroundColor: '#12132b', color: '#fff',
    fontSize: 20,
    height: 50,
    width: 200,
    textAlign: 'center',
    padding: 8,
    marginTop: 15,
    borderRadius: 30,
  },
  input: {
    width: 300,
    marginLeft: 5,
    height: 55,
    backgroundColor: 'transparent',
    margin: 10,
    padding: 8,
    color: 'black',
    borderRadius: 7,
    fontSize: 18,
    fontWeight: '500',
    borderWidth: 1,

  },
  inputSearch: {
    backgroundColor: 'transparent',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
});