import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity, Text, Button, FlatList } from 'react-native';
import Header from '../Components/Header';
import API from '../API/Config';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

export default class edit extends React.Component {


  logout=()=>
  {
    console.log("Logogoogogo");
    AsyncStorage.removeItem('userData');
    this.props.navigation.navigate("Login")
  }

  constructor(props) {
    super(props)
    this.state = {

      email_address: '',
      mobile_no: '',
      gender: '',
      address: '',
      city: '',
      UserData: [],
      image: '',
      id: '',
    }
  }

  

  componentDidMount = async () => {
    
    const value = await AsyncStorage.getItem('userData');
    // console.log("Store Values main : ", JSON.stringify(value));
    //console.log("Store Values main : ", JSON.parse(value));
    let alldata = JSON.parse(value);
    let email = alldata.email;
    let id = alldata.userid;

    //console.log("User main : ", email);
    if (value != null) {
      this.setState({
        loading: false,
      })
      console.log("APi : ", API.SITE_URL + 'myprofile.php?email=' + email);
      console.log("user id :", id);
      fetch(API.SITE_URL + 'myprofile.php?email=' + email)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            loading: false
          })
          // console.log("URL Response : ", responseJson.data[0].email);
          if (responseJson.status == 1) {
            this.setState({
              UserData: responseJson.data[0],
              image: responseJson.data[0].image
            })
          }
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    }
    else {
      this.setState({
        loading: false
      })
    }

  }

  // componentDidMount() {
  //   var email_address = this.state.email_address;
  //   console.log("API : ", API.SITE_URL + 'myprofile.php?email=heman@gmail.com');
  //   fetch(API.SITE_URL + 'myprofile.php?email=heman@gmail.com')
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       this.setState({
  //         loading: false
  //       })
  //       // console.log("URL Response : ", responseJson.data[0].email);
  //       if (responseJson.status == 1) {

  //         console.log("username=>", responseJson.data[0].name)
  //         console.log("email=>", responseJson.data[0].email)
  //         console.log("phone No=>", responseJson.data[0].phone)
  //         console.log("Address=>", responseJson.data[0].address)
  //         console.log("City=>", responseJson.data[0].city)
  //         console.log("Gender=>", responseJson.data[0].gender)
  //         //email_address=responseJson.data[0].email;
  //         //dataSource: responseJson.data[0].email;
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("ERROR", error);
  //     });

  // }
  //const username =  AsyncStorage.getItem('username'); 


  render() {
    console.log("State Data : ", this.state.UserData);
    console.log("user id:", this.state.UserData.userid);
    let userid2 = this.state.UserData.userid;
    console.log("user idnew:",userid2);
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View>
          <Header
            header="Profile"
            onPressLeft={() => this.props.navigation.goBack()}
            onPressRight={() => this.props.navigation.navigate("editprofile",{image: this.state.image,userid1: userid2})}
            sourceLeft={require('../Images/back.png')}
            source={require('../Images/edit.png')}
          />
        </View>
        <Spinner
          visible={this.state.loading}
        />
        <View style={styles.container}>
          <View style={styles.header}>
            <ImageBackground style={styles.ImageBackground} source={require('../Images/accident.jpg')} />
          </View>
          <Image style={styles.avatar} source={{uri: 'http://myreportsystem.000webhostapp.com/admin/images/' + this.state.image}} />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>Username : {this.state.UserData.name}</Text>
              <Text style={styles.info}>Email ID : {this.state.UserData.email}</Text>
              <Text style={styles.info}>Mobile No: {this.state.UserData.phone}</Text>
              <Text style={styles.info}>Gender : {this.state.UserData.gender}</Text>
              <Text style={styles.info}>Address : {this.state.UserData.address}</Text>
              <Text style={styles.info}>city :{this.state.UserData.city}</Text>
              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate("changepassword", { userid1: userid2 })}>
                <Text style={{ color: '#fff' }}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer} onPress={this.logout}>
                <Text style={{ color: '#fff' }}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  ImageBackground: {
    height: 200,
    width: 415,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#000000",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#000",
  },
});
