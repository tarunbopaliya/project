import React from "react";
import { View, StyleSheet, Picker, TouchableOpacity, Text, Button, TextInput, Image, DatePickerAndroid } from 'react-native';
import Header from '../Components/Header';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import { ScrollView } from "react-native-gesture-handler";
import ImagePicker from 'react-native-image-picker';
import API from '../API/Config';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';






class Myapp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
      imagePath: '',
      ImageData: null,
      value: '',
      value1: '',
      CityData: [],
      ReportData: [],
      city: 1,
      report: 1,
      userID: '',
      loading: false,



    };
  }
  componentDidMount = async () => {
    const value = await AsyncStorage.getItem('userData');
    let alldata = JSON.parse(value);
    this.setState({
      userID: alldata.userid
    })

    fetch(API.SITE_URL + 'GetCityList.php')
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == 1) {
          var tempArray = [];
          for (var i = 0; i < responseJson.data.length; i++) {
            tempArray.push({
              value: responseJson.data[i].city_id,
              label: responseJson.data[i].city_name,
            });
          }
          this.setState({
            CityData: tempArray
          });
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
      });

    fetch(API.SITE_URL + 'GetReportTypes.php')
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == 1) {
          console.log("dataa : ", responseJson);
          var tempArray1 = [];
          for (var i = 0; i < responseJson.data.length; i++) {
            tempArray1.push({
              value: responseJson.data[i].type_id,
              label: responseJson.data[i].report_title,
            });
          }
          this.setState({
            ReportData: tempArray1
          });
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }

  onValueChange(value) {
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
    if (this.state.city == null || this.state.city == "") {
      this.setState({
        NameError4: true,
      })
    }
    else {
      this.setState({
        NameError4: false,
      })
    }

    const { value1 } = this.state;
    if (this.state.report == null || this.state.report == "") {
      this.setState({
        NameError5: true,
      })
    }
    else {
      this.setState({
        NameError5: false,
      })
    }
    if (this.state.ImageData == null) {
      this.setState({
        NameError6: true,
      })
    }
    else {
      this.setState({
        NameError6: false,
      })
    }

    if (this.state.NameError4 == false && this.state.NameError5 == false && this.state.NameError6 == false) {
      this.setState({ loading: true })

      //console.log("State : ", this.state);
      // this.props.navigation.navigate("reportdescription");
      var uploadUrl = API.SITE_URL + 'FirstPage.php';  // For testing purposes, go to http://requestb.in/ and create your own link
      const data = new FormData();
      data.append('userid', this.state.userID);
      data.append('cityid', this.state.city);
      data.append('reportid', this.state.report);
      if (this.state.ImageData != null) {
        data.append('report_image', {
          name: 'image',
          uri: this.state.ImageData.filepath,
          type: this.state.ImageData.filetype,
        });
      }
      console.log("Data : ");

      fetch(uploadUrl, {
        method: 'POST',
        body: data
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log("file upload response :  ", responseJson.data.reportid);
          this.setState({ loading: false })
          if (responseJson.status == 1) {
            this.props.navigation.navigate("reportdescription", { id:responseJson.data.reportid , userid: this.state.userID });
          }

        });
    }


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

  render() {

    const placeholder = {
      label: 'Select a city...',
      value: null,
      color: 'black',
    };
    const placeholder1 = {
      label: 'Select an Area...',
      value: null,
      color: 'black',
    };
    const placeholder2 = {
      label: 'Select an Acciedent type...',
      value: null,
      color: 'black',
    };
    console.log("Image Data : ", this.state.ImageData)

    return (


      <View>

        <Header
          header="New Report"
          onPressLeft={() => this.props.navigation.navigate("home")}
          // onPressLeft={() => this.props.navigation.goBack()}
          sourceLeft={require('../Images/back.png')}
        />
        <Spinner
          visible={this.state.loading}
        />
        <View style={{ alignItems: 'center', marginTop: 100 }}>
          <View style={{ width: 250 }}>
            <View style={{ borderColor: 'grey', borderWidth: 1 }}>
              <Text style={{ fontSize: 20 }}>City:</Text>
              <RNPickerSelect
                onValueChange={(value) => this.setState({ city: value })}
                value={this.state.city}
                items={this.state.CityData}
                placeholder={placeholder}
                style={pickerSelectStyles}
              />
              {this.state.NameError4 == true ?
                <Text style={{ color: 'red' }}>Please select City</Text>
                :
                null}
            </View>


            <View style={{ borderColor: 'grey', borderWidth: 1, marginTop: 20 }}>
              <Text style={{ fontSize: 20 }}>Acciedent Type:</Text>

              <RNPickerSelect
                onValueChange={(value1) => this.setState({ report: value1 })}
                value1={this.state.report}
                items={this.state.ReportData}
                placeholder={placeholder2}

                style={pickerSelectStyles}
              />
              {this.state.NameError5 == true ?
                <Text style={{ color: 'red' }}>Please select Accident Type</Text>
                :
                null}
            </View>

            <View style={{ alignItems: 'center', borderColor: 'grey', borderWidth: 1, marginTop: 20, }}>
              <Text style={{ fontSize: 20 }}>Select Image:</Text>
              <TouchableOpacity onPress={this.chooseFile.bind(this)}>
                {this.state.ImageData == null ?
                  <Image style={{ width: 200, height: 200 }} source={require('../Images/camera.png')}
                  />
                  :
                  <Image style={{ width: 200, height: 200 }} source={{ uri: this.state.imagePath }}
                  />
                }
              </TouchableOpacity>
              {this.state.NameError6 == true ?
                <Text style={{ color: 'red' }}>Please Add Image</Text>
                :
                null}
            </View>

            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={this.buttonClickListener}>
                <Text style={styles.input1} >Next</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>



      </View>
    );
  }
}

const AppNavigator = createStackNavigator({

  createnewreport: {
    screen: Myapp,
  },
},
  {
    defaultNavigationOptions: {
      header: null,
    }
  });

export default createAppContainer(AppNavigator);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input1: {
    backgroundColor: '#12132c', color: '#fff',
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    // color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});