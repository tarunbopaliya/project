import React, { Component } from 'react';
import Navigation from './screen/Navigation/Navigation';
import { Modal, View, Text, Platform, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Nav from './screen/Navigation/Nav';
import Spinner from 'react-native-loading-spinner-overlay';
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      login: false,
      loading : true
    }

  }
  componentDidMount = async () => {
    const value = await AsyncStorage.getItem('userData');
    console.log("Store Values main : ", value);
    if (value!= null ) {
      this.setState({
        loading : false
      })
      console.log("Store Values null : ", value);
      // value previously stored
      this.setState({
        login: true
      })
    }
    else
    {
      this.setState({
        loading : false
      })
      console.log("Store Values not null : ", value);
      // value previously stored
      this.setState({
        login: false
      })
    }

  }

  render() {
    console.disableYellowBox = true;
    return (
      <View style={{ flex: 1 }}>
         <Spinner
          visible={this.state.loading}
        />
        {this.state.login == false && this.state.loading==false ?
          <Navigation />
          :
         <Nav/>
        }
      </View>
    );
  }
}