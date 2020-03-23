import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../Components/Header';
import API from '../API/Config';
import Spinner from 'react-native-loading-spinner-overlay';


export default class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      emailid: '',
      message: '',
      loading: false,

    }

  }


  onChangeText(username) {
    this.setState({
      int: username
    })
  }
  onChangeText(emailid) {
    this.setState({
      int1: emailid
    })
  }
  onChangeText(message) {
    this.setState({
      int5: message
    })
  }

  buttonClickListener = () => {
    const { username } = this.state;
    console.log("Text Length : ", username.length);
    if (username == null || username == "") {
      this.setState({
        NameError: true,
      })
    }
    if (username.length < 4) {
      this.setState({
        NameError: true,
      })
    }
    else if (username.length > 4) {
      this.setState({
        NameError: false,
      })
    }



    const { emailid } = this.state;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.emailid) == true) {
      this.setState({
        validated: true,
      })
    }
    else {
      this.setState({
        validated: false,
      })
    }

    const { message } = this.state;
    if (this.state.message == null || this.state.message == "") {
        this.setState({
          NameError1: true,
        })
      }
      else {
        this.setState({
          NameError1: false,
        })
      }
    if (this.state.NameError == false && this.state.validated == true && this.state.NameError1== false) {
        this.setState({loading : true})
        fetch(API.SITE_URL + 'data_contact_form.php?name=' + this.state.username+'&email='+this.state.emailid+'&message='+this.state.message)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            loading: false
          })
          // console.log("URL Response : ", responseJson.data[0].email);
          if (responseJson.status == 1) {
            this.props.navigation.navigate("home")
          }
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
      this.props.navigation.navigate("home")
    }
  }
  render() {

    return (

      <View>
        <Header
          header="Contact us"
          sourceLeft={require('../Images/back.png')}
          onPressLeft={() => this.props.navigation.goBack()}            
        />
        <Spinner
          visible={this.state.loading}
        />
        <View >
           <View style={{alignItems:'center'}}>
          <TextInput
            style={styles.input}
            placeholder='Name'
            placeholderTextColor='black'
            onChangeText={username => this.setState({ username })}
            value={this.state.int}
          />
          {this.state.NameError == true ?
            <Text style={{ color: 'red' }}>Please Enter Name</Text>
            :
            null}

          <TextInput
            style={styles.input}
            placeholder='Email Id'
            placeholderTextColor='black'
            onChangeText={emailid => this.setState({ emailid })}
            value={this.state.int1}
          />
          {this.state.validated == false ?
            <Text style={{ color: 'red' }}> please enter the valid email</Text>
            :
            null}
            </View>


          <View style={{ alignItems:'center' }}>
            <Text style={{ fontSize: 30, }}> Message :</Text>
          </View>
          <View style={{ alignItems:'center' }}>
            <TextInput
              multiline={true}
              placeholder='Write Message Here'
              style={{ borderWidth: 1, height: 200, width: 300, paddingLeft: 10, borderRadius: 10, paddingBottom: 70, marginBottom: 15 }}
              underlineColorAndroid={'transparent'}
              onChangeText={message => this.setState({ message })}
              value={this.state.int5}
            />
            {this.state.NameError == true ?
                <Text style={{ color: 'red' }}>Please Enter Message</Text>
                :
                null}
          </View>
          
          <View style={{alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity onPress={this.buttonClickListener}>
               <Text style={{
                   backgroundColor: '#000',
                   color: '#fff',
                   fontSize: 18,
                   padding: 13,
                   width: 250,
                   height: 50,
                   textAlign: 'center',
                   margin: 40,
                   borderRadius:30,
                    
               }}>
                   Submit
               </Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 50,
    backgroundColor: 'white',
    margin: 10,
    padding: 8,
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
    borderColor: 'grey',
    borderWidth: 1,

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

})