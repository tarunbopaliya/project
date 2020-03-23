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
  ScrollView
} from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';
import Header from '../Components/Header';
import ImagePicker from 'react-native-image-picker';
import API from '../API/Config';
import Spinner from 'react-native-loading-spinner-overlay';




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
      ImageData: null,
      loading: false,
      cityname: [],
      UserData: [],
      filePath: {},
      imagePath: '',
      PickerSelectedVal: '',
      image1:'',
      userid:'',
      city_id:1,
      genders:1,

    }

  }

  componentDidMount = () => {
  
     let data=this.props.navigation.state.params.image;
     let id=this.props.navigation.state.params.userid1;
     this.setState({
       image1:data,
       userid:id,
     })
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
  update = (PickerSelectedVal) => {
    this.setState({ PickerSelectedVal: PickerSelectedVal })
  }

  chooseFile = () => {
    var options = {
      title: 'Select Image',

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:

        this.setState({
          ImageData: {
            // name: 'shop_img',
            filename: 'image',
            filepath: response.uri,
            filetype: response.type,

          },
          imagePath: response.uri
        });
      }
    });
  };
  

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
  
  onChangeText(mobile) {
    this.setState({
      int3: mobile
    })
  }
  onChangeText(address) {
    this.setState({
      int4: address
    })
  }
  onValueChange(city_id) {
    this.setState({
      int5: city_id
    })
  }
  onPress(genders) {
    this.setState({
      int6: genders
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

    const { address } = this.state;
    if (address == null || address == "") {
      this.setState({
        NameError3: true,
      })
    }
    else {
      this.setState({
        NameError3: false,
      })
    }

    
    if (this.state.city_id == null || this.state.city_id == "") {
      this.setState({
        NameError4: true,
      })
    }
    else {
      this.setState({
        NameError4: false,
      })
    }

    
    if (this.state.genders == null || this.state.
      genders == "") {
      this.setState({
        NameError5: true,
      })
    }
    else {
      this.setState({
        NameError5: false,
      })
    }



    if (this.state.NameError == false && this.state.validated == true  && this.state.NameError2 == false && this.state.NameError3 == false && this.state.NameError4 == false && this.state.NameError5 == false) {
      this.setState({loading : true})
      console.log('fjfkk')

      
      var uploadUrl = API.SITE_URL + 'UpdateProfile.php';  // For testing purposes, go to http://requestb.in/ and create your own link
      const data = new FormData();
      data.append('id', this.state.userid);
      data.append('name', this.state.username);
      data.append('email', this.state.emailid);
      data.append('mobile', this.state.mobile);
      data.append('address', this.state.address);
      data.append('city', this.state.city_id);
      data.append('gender', this.state.genders);
      if (this.state.ImageData != null) {
        data.append('image', {
          name: 'image',
          uri: this.state.ImageData.filepath,
          type: this.state.ImageData.filetype,
        });
      }
    // console.log("userid  : ",this.state.userid);
    // console.log("name : ",this.state.username);
    // console.log("email:",this.state.emailid);
    // console.log("mobile:",this.state.mobile);
    // console.log("address:",this.state.address);
    // console.log("city:",this.state.city_id);
    // console.log("gender",this.state.genders);
    // console.log("image:",this.state.imagePath);

      fetch(uploadUrl, {
        method: 'POST',
        body: data
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log("file upload response :  ", responseJson);
          this.setState({loading : false})
      if(responseJson.status==1)
      {
        this.props.navigation.navigate("profile");
      }
          
        });

    }



  }



  render() {
    const placeholder = {
      label: 'Select a city...',
      value: null,
      color: 'black',
    };
    return (
      <ScrollView>
        <View>
          <Header
            header="Edit Profile"
            sourceLeft={require('../Images/back.png')}
            onPressLeft={() => this.props.navigation.goBack()}
          />
           <Spinner
          visible={this.state.loading}
          />

          <View style={styles.container}>


            <TouchableOpacity onPress={this.chooseFile.bind(this)}>
              {this.state.ImageData == null ?
                <Image
                  style={styles.img}
                  source={{uri: 'http://myreportsystem.000webhostapp.com/admin/images/' + this.state.image1}}
                />
                :
                <Image
                  style={styles.img}
                  source={{ uri: this.state.imagePath }}
                />
              }
            </TouchableOpacity>



            <TextInput
              style={styles.input}
              placeholder='Name'
              placeholderTextColor='black'
              onChangeText={username => this.setState({ username })}
              value={this.state.int}
            />
            {this.state.NameError == true ?
              <Text>Please Enter Name</Text>
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
              <Text> please enter the valid email</Text>
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
              <Text>Please Enter valid number</Text>
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
              <Text>Please Enter Addresss</Text>
              :
              null}
            <View style={{ marginTop: 10 }}>
              <View style={{ width: 345 }}>
                <View style={{ borderColor: 'grey', borderWidth: 1, borderRadius: 14 }}>
                  <Text style={{ fontSize: 18 }}> City:</Text>
                  <RNPickerSelect

                    onValueChange={(value) => this.setState({city_id : value})}
                    value={this.state.city_id}
                    items={this.state.UserData}
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
                  onPress={(value1) => { this.setState({ genders: value1 }) }}
                  value={this.state.genders}
                />
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={this.buttonClickListener}>
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
                  Save
               </Text>
              </TouchableOpacity>
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
    marginRight: 250
  },
  img: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    alignSelf: 'center',
    marginTop: 30
  },
  button: {
    backgroundColor: '#12132c',
    color: 'white',
    fontSize: 20,
    padding: 10,
    width: 148,
    height: 50,
    textAlign: 'center',
    borderRadius: 30
  }
})