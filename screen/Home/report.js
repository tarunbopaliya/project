import React from "react";
import { View, StyleSheet, Picker, TouchableOpacity, FlatList, Text, Button, TextInput, Image, ScrollView, pickerSelectStyles } from 'react-native';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import Header from '../Components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import API from '../API/Config';


export default class Myapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainData: [],
      loading: false,
      noRecords: false,
      userid:'',
    };
  }
  componentDidMount = async () => {

    const value = await AsyncStorage.getItem('userData');
    let alldata = JSON.parse(value);
    let id = alldata.userid;
    this.setState({
      loading: true,
     
    })
    const data = new FormData();
    data.append('userid', id);
    fetch(API.SITE_URL + 'GetReviewData.php', {
      method: 'POST',
      body: data
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false
        })
        console.log("Data : ", responseJson);
        if (responseJson.status == 1) {
          this.setState({
            noRecords: false,
            mainData: responseJson.data
          })
        }
        else {
          this.setState({
            noRecords: true
          })
        }
      })
      .catch((error) => {
        this.setState({
          loading: false
        })
      });


  }


  render() {
    return (
      <ScrollView>
        <View >
          <View>
            <Header
              header="Reports"
              onPressLeft={() => this.props.navigation.goBack()}
              sourceLeft={require('../Images/back.png')}

            />
          </View >

          <FlatList
            data={this.state.mainData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.props.navigation.navigate("reportdetails",{Data : item})}>
                <View style={styles.borderView}>
                  <View style={styles.imageBox}>
                    <View style={styles.boxShadow}>
                     
                        <Image source={{ uri: 'http://myreportsystem.000webhostapp.com/admin/images/'+item.image }}
                          resizeMode="cover"
                          style={styles.image} />
                      
                    </View>
                  </View>
                  <View style={styles.desc}>
                    <View>
                      <Text style={styles.headText}>Date : {item.createddate}</Text>
                    </View>
                    <View style={styles.descArea}>
                      <View style={styles.qtyarea}>
                        <Text style={styles.boldText}>Type :  : {item.reporttitle}</Text>
                      </View>
                    </View>
                    <View style={[styles.qtyarea, {
                      marginRight: 10,
                      justifyContent: 'flex-start'
                    }]}>
                      <Text style={styles.boldText}>Address : {item.address}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: 16
  },
  seprator: {
    marginBottom: 5,
    marginTop: 5
  },
  mainView: {
    flex: 1,
    marginBottom: 10,
  },
  borderView:
  {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,

  },
  imageBox:
  {
    flex: 2.5,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxShadow: {
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 1,
    shadowOpacity: 0.4,
    elevation: 4,
    backgroundColor: 'white',
  },
  image: {
    height: 70,
    width: 70,
  },
  desc:
  {
    flex: 7.5,
    justifyContent: 'center',
    paddingVertical: 10,
    paddingLeft: 7
  },
  descArea:
  {
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: "space-between"
  },
  qtyarea:
  {
    flexDirection: 'row',
  },
  boldText: {
    color: 'black',
    fontSize: 17,
  },
  headText: {
    color: 'black',
    fontSize: 17,
  },

});