import React from "react";
import Header from '../Components/Header';
import { View, StyleSheet, Picker, TouchableOpacity, Text, Button, TextInput, Image, ScrollView,pickerSelectStyles } from 'react-native';
//import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import API from '../API/Config';
import Spinner from 'react-native-loading-spinner-overlay';



var radio_props = [
  {label: 'Emergency', value: 0 },
  {label: 'Not Emergency', value: 1 }
];

export default class Myapp extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      text:'',
      text1:'',
      checked: 'first',
      reportid:'',
      userid:'',
      loading: false,
      value1:'',


    }

  }
 

  onChangeText(text) {
    this.setState({
      int: text
    })
  }
  onChangeText(text1) {
    this.setState({
      int5: text1
    })
  }
  onPress(value1) {
    this.setState({
      int6: value1
    })
  }


  buttonClickListener = () => {

    let reportid=this.props.navigation.state.params.id;
    let userid=this.props.navigation.state.params.userid;
    console.log("fdjdf")
    this.setState({
      reportid:reportid,
      userid:userid
    })

    const { text } = this.state;
    

    if (this.state.text == null || this.state.text == "") {
      this.setState({
        NameError4: true,
      })
    }
    else {
      this.setState({
        NameError4: false,
      })
    }

    const { text1 } = this.state;

    if (this.state.text1 == null || this.state.text1 == "") {
      this.setState({
        NameError5: true,
      })
    }
    else {
      this.setState({
        NameError5: false,
      })
    }

    const {value1} = this.state;
    if(value1 == null || value1 == ""){
      this.setState({
        NameError6: true,
      })
    }
    else{
      this.setState({
        NameError6: false,
      })
    }

    if (this.state.NameError4 == false && this.state.NameError5==false && this.state.NameError6==false) {
      this.setState({loading : true})

      console.log("jhfgnrebgdngd")
      console.log("userid",this.state.userid)
      console.log("report id:",this.state.reportid)
      console.log("address:",this.state.text1)
      console.log("description:",this.state.text)
      console.log("emergence value:",this.state.value1)
      fetch(API.SITE_URL + 'SecondPage.php?userid=' +this.state.userid +'&submitid=' +this.state.reportid+'&address='+ this.state.text1 + '&description=' + this.state.text+'&emergency=' + this.state.value1)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false
        })
        console.log("URL Response : ", responseJson);
        if (responseJson.status == 1) {
          this.props.navigation.navigate('home')
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }
    


  }

  render() {
    const { checked } = this.state;

    

    return (
      <ScrollView>
     <View >
     <View>
            <Header
              onPressLeft={() => this.props.navigation.goBack()}
              header="Report Description"
              sourceLeft={require('../Images/back.png')}
            />
          </View>
          <Spinner
          visible={this.state.loading}
        />

        
        <View style={{alignItems:'center'}}>
          <Text style={{ fontSize: 30,}}> Description :</Text>
        </View>
        <View style={{ alignItems: 'center', }}>
        <TextInput
            multiline={true}
            placeholder='Write Description Here'
            style={{ borderWidth: 1, height: 200, width: 300, paddingLeft: 10,borderRadius:10,paddingBottom:70}}
            underlineColorAndroid={'transparent'}
            onChangeText={text => this.setState({ text })}
            value={this.state.int}
          />
          {this.state.NameError4 == true ?
                <Text style={{ color: 'red' }}>Please select City</Text>
                :
                null}
       </View>
       <View style={{alignItems:'center'}}>
          <Text style={{ fontSize: 30, }}> Address:</Text>
        </View>
       <View style={{ alignItems: 'center', }}>
        <TextInput
            multiline={true}
            placeholder='Write Address Here'
            style={{ borderWidth: 1, height: 100, width: 300,borderRadius:10 }}
            underlineColorAndroid={'transparent'}
            onChangeText={text1 => this.setState({ text1 })}
            value={this.state.int5}
          />
          {this.state.NameError5 == true ?
                <Text style={{ color: 'red' }}>Please select City</Text>
                :
                null}
       </View>
       <View style={{alignItems:'center',marginTop:10}}>
       
        <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(value1) => { this.setState({ value1: value1 }) }}
          value={this.state.int6}
        />
        </View>
        <View style={{ alignItems: 'center', marginTop: 10}}>
              <TouchableOpacity onPress={this.buttonClickListener}>
                <Text style={styles.input1} >Submit</Text>
              </TouchableOpacity>
            </View>
       </View>
       </ScrollView>
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
});