
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, seprator, TouchableOpacity, Image } from 'react-native';
import API from '../API/Config';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';


export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      email_address: '',
      password: '',
      showEmailError: false,
      showEmailErrorText: '',
      showPasswordErrorText: '',
      showPasswordError: false,
      
    }
  }

  onChangeText(email_address) {
    this.setState({
      int2: email_address
    })
  }
  onChangeText(password) {
    this.setState({
      int3: password
    })
  }

  validateEmail = (email_address) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email_address);
  };



  buttonClickListener = () => {
    var email_address = this.state.email_address;
    // alert(this.state.password);
    var validationError = false;

    if (email_address == '' || email_address==null) {
      validationError = true;
      this.setState({ showEmailError: true, showEmailErrorText: 'Please enter email' });
    }
    else if (!this.validateEmail(email_address)) 
    {
        validationError = true;
        this.setState({ showEmailError: true, showEmailErrorText: 'Please enter valid email' });
    }
    else 
    {
        validationError = false;
        this.setState({ showEmailError: false });
    }

    if (this.state.password=='' || this.state.password==null) {
      // alert("Kana");
      validationError = true;
      this.setState({ showPasswordError: true, showPasswordErrorText: 'Please enter password'});
    }

    else {
      validationError = false;
      this.setState({ showPasswordErrorText: false });
    }

    if (validationError==false) {
      this.setState({loading : true})
      console.log("API : ", API.SITE_URL + 'UserAppLogin.php?email=' + this.state.email_address + '&password=' + this.state.password);
      fetch(API.SITE_URL + 'UserAppLogin.php?email=' + this.state.email_address + '&password=' + this.state.password)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            loading: false
          })
          // console.log("URL Response : ", responseJson.data[0].email);
          if (responseJson.status == 1) {
            AsyncStorage.setItem('userData', JSON.stringify(responseJson.data[0]));
            this.props.navigation.navigate("home");
          } else {
            alert("please enter correct userid and password!");
          }
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    }
  
  }
  
  




  render() {
    return (
      <View style={styles.container}>
         <Spinner
          visible={this.state.loading}
        />
        <Image
          style={{ width: 150, height: 150, alignItems: 'flex-start', justifyContent: 'flex-start' }}
          source={require('../Images/accident.jpg')}
        />
        <View>
          <Text style={{ color: '#000', fontFamily: 'Lato-Black', fontSize: 30, marginBottom: 50 }}>Accident Report System</Text>
        </View>
        <View style={styles.logincontainer}>
          <View style={styles.inputbar}>
            <View >
              <Image
                style={{ width: 25, height: 25, marginTop: 10 }}
                source={require('../Images/email.png')}
              />
            </View>
            <TextInput
              style={{
                backgroundColor: '#fff',
                color: '#000',
                fontSize: 20,
                width: 275,
                height: 50,
                paddingTop: 10,
                paddingLeft: 15,
                paddingBottom: 15,
                paddingRight: 10,

              }}
              onChangeText={email_address => this.setState({ email_address })}
              value={this.state.email_address}
              placeholder='Email'
            />
          </View>
          <View>
            {this.state.showEmailError == true ? <Text style={{ color: 'red' }}>{this.state.showEmailErrorText}</Text> : null}
          </View>
          <View style={styles.seprator}></View>
          <View style={styles.inputbar}>
            <View>
              <Image
                style={{ width: 25, height: 25, marginTop: 10 }}
                source={require('../Images/lock.png')}
              />
            </View>
            <TextInput
              style={{
                backgroundColor: '#fff',
                color: '#000',
                fontSize: 20,
                width: 275,
                height: 50,
                paddingTop: 10,
                paddingLeft: 15,
                paddingBottom: 15,
                paddingRight: 10
              }}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              placeholder='Password'
              secureTextEntry ={true}
            />
          </View>
          <View>
            {this.state.showPasswordError == true ? <Text style={{ color: 'red' }}>{this.state.showPasswordErrorText}</Text> : null}
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("ForgotPass")} >
            <Text style={{ color: '#000', fontFamily: 'Lato-Black', fontSize: 17, marginBottom: 20 }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
            <Text style={{
              backgroundColor: '#12132c',
              color: 'white',
              fontSize: 20,
              padding: 10,
              width: 148,
              height: 50,
              textAlign: 'center',
              marginRight: 20,
              borderRadius: 30,

            }}>
              Register
               </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.buttonClickListener()}>
            <Text style={{
              backgroundColor: '#12132c',
              color: 'white',
              fontSize: 20,
              padding: 10,
              width: 148,
              height: 50,
              textAlign: 'center',
              borderRadius: 30
            }}>
              Sign In
               </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  logincontainer: {
    padding: 5,
    height: 140,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderWidth: 1,

  },
  inputbar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  seprator: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 5,
    marginTop: 5,
  }
});

