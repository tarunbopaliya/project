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
  pickerSelectStyles,
  ScrollView,
  FlatList
} from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';
import Header from '../Components/Header';
import API from '../API/Config';



var radio_props = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' }
];



export default class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      emailid: '',
      password: '',
      mobile: '',
      citylistid: [],
      cityname: [],
      UserData: [],
      value2:[],
      city_id : 1,
      
      
    }

  }
  componentDidMount = () => {

    fetch(API.SITE_URL + 'GetCityList.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false
        })
        console.log("URL Response : ", responseJson.data);
        if (responseJson.status == 1) {
          // this.setState({
          //   UserData: responseJson.data
          
          // })
          var tempArray = [];
          for (var i = 0; i < responseJson.data.length; i++) {
              tempArray.push({
                value: responseJson.data[i].city_id,
                  label: responseJson.data[i].city_name,
                
              });
          }
          this.setState({
            UserData: tempArray
          });
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
      });

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
  onChangeText(password) {
    this.setState({
      int2: password
    })
  }
  onChangeText(mobile) {
    this.setState({
      int3: mobile
    })
  }
  onChangeText(address){
    this.setState({
      int4: address
    })
  }
  onValueChange(value) {
    alert("NEwwew : ", value);

    this.setState({
      int5: value
    })
  }
  onPress(value1) {
    this.setState({
      int6: value1
    })
  }

  buttonClickListener = () => {
    alert(this.state.city_id.toString());
    console.log("Selected City Vale : ", this.state.city_id);
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

    const { password } = this.state;
    if (password.length < 6) {
      this.setState({
        NameError1: true,
      })
    }
    else if (password.length > 5) {
      this.setState({
        NameError1: false,
      })
    }

    const { mobile } = this.state;
    if (mobile.length != 10) {
      this.setState({
        NameError2: true,
      })
    }
    else {
      this.setState({
        NameError2: false,
      })
    }

    const {address} = this.state;
    if(address == null || address == ""){
      this.setState({
        NameError3: true,
      })
    }
    else{
      this.setState({
        NameError3:false,
      })
    }

    const { value } = this.state;
    if (value == null || value == "") {
      this.setState({
        NameError4: true,
      })
    }
    else {
      this.setState({
        NameError4: false,
      })
    }

    const {value1} = this.state;
    if(value1 == null || value1 == ""){
      this.setState({
        NameError5: true,
      })
    }
    else{
      this.setState({
        NameError5: false,
      })
    }

    

    if (this.state.NameError == false && this.state.validated == true && this.state.NameError1 == false && this.state.NameError2 == false && this.state.NameError3 == false && this.state.NameError4 ==false && this.state.NameError5 ==false) {
      fetch(API.SITE_URL + 'UserRegister.php?name=' + this.state.username + '&email=' + this.state.emailid + '&password=' + this.state.password + '&mobile=' + this.state.mobile + '&address='+ this.state.address+'&city=' + this.state.value + '&gender=' + this.state.value1)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            loading: false
          })
          console.log("name:",this.state.username);
          console.log("email:",this.state.emailid);
          console.log("password:",this.state.password);
          console.log("mobile:",this.state.mobile);
          console.log("city:",this.state.value);
          console.log("gender:",this.state.value1);
          console.log("address:",this.state.address)
          console.log("status:", responseJson.status);

          if (responseJson.status == 1) {

            this.props.navigation.navigate("Login");

          }
          else {
            alert("You have not Registered Yet");
          }
        })
        .catch((error) => {
          console.log("ERROR", error);
        });

    }



  }



  render() {
    const placeholder = {
      label: 'Select a city...',
      value: null,
      color: 'black',
    };
    console.log("City Data : ", this.state.city_id);
    return (
      <ScrollView>
        <View>
          <Header
            header="Registration"
            sourceLeft={require('../Images/back.png')}
            onPressLeft={() => this.props.navigation.goBack()}
          />

          <View style={styles.container}>
            <Image
              style={{ width: 110, height: 110 }}
              source={require('../Images/accident.jpg')}
            />
            <View>
              <Text style={{ color: 'black', fontSize: 30, marginBottom: 30 }}>Accident Report System</Text>

            </View>


            <TextInput
              style={styles.input}
              placeholder='Name'
              placeholderTextColor='black'
              onChangeText={username => this.setState({ username })}
              value={this.state.int}
            />
            {this.state.NameError == true ?
              <Text style={{color:'red'}}>Please Enter Name</Text>
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
              <Text style={{color:'red'}}> please enter the valid email</Text>
              :
              null}
            <TextInput
              style={styles.input}
              placeholder='Password'
              placeholderTextColor='black'
              onChangeText={password => this.setState({ password })}
              value={this.state.int2}
            />
            {this.state.NameError1 == true ?
              <Text style={{color:'red'}}>atleast six character</Text>
              :
              null}

            <TextInput
              style={styles.input}
              placeholder='Contact No'
              placeholderTextColor='black'
              onChangeText={mobile => this.setState({ mobile })}
              value={this.state.int3}
            />
            {this.state.NameError2 == true ?
              <Text style={{color:'red'}}>Please Enter valid number</Text>
              :
              null}

            <TextInput
              style={styles.input}
              placeholder='Addresss'
              placeholderTextColor='black'
              onChangeText={address => this.setState({ address })}
              value={this.state.int4}
            />
            {this.state.NameError3 == true ?
              <Text style={{color:'red'}}>Please Enter Addresss</Text>
              :
              null}
            <View style={{ marginTop: 10 }}>
              <View style={{ width: 345 }}>
                <View style={{ borderColor: 'grey', borderWidth: 1, borderRadius: 14 }}>
                  <Text style={{ fontSize: 18 }}> City:</Text>
                  {/* <FlatList
        data={this.state.UserData}
        renderItem={({ item }) => this.setState({ value2:item.city_name})}
        keyExtractor={item => item.id}
      /> */}
                  <RNPickerSelect

                    onValueChange={(value) => this.setState({city_id : value})}
                    // value={this.state.city_id}
                    // items={[
                    //   { label: 'Ahmedabad', value: 1 },
                    //  ]}
                    items ={this.state.UserData}
                    placeholder={placeholder}
                    style={pickerSelectStyles}
                  />
                </View>
              </View>
            </View>
            <View style={styles.radio}>
              <View>
                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  buttonColor={'#000'}
                  onPress={(value1) => { this.setState({ value1: value1 }) }}
                  value1={this.state.int6}
                />
              </View>
            </View>
            <View>
              <Button
                onPress={this.buttonClickListener}
                title="Register  Now"
                color="#000"
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
    borderWidth: 1

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  radio: {
    marginTop: 15,
    marginRight: 250,
  }
})