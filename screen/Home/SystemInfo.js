import React from "react";
import Header from '../Components/Header';
import { View, StyleSheet, Text, styles} from 'react-native';
import { Paragraph } from 'react-native-paper';
import API from '../API/Config';


export default class systeminfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data:[],
        }
    }
    componentDidMount = () => {
        fetch(API.SITE_URL + 'data_strings.php')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            loading: false,
            data:responseJson,
          })
          console.log("URL Response : ", this.state.data);
        //   if (responseJson.status == 1) {
        //     this.setState({
        //       UserData: responseJson.data[0],
        //       image: responseJson.data[0].image
        //     })
        //   }
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    }

    render() {
        return (
            <View>
                <View>
                    <Header
                        header="System Information"
                        onPressLeft={() => this.props.navigation.navigate("home")}
                        sourceLeft={require('../Images/back.png')}
                    />
                </View >
                <View style={{alignItems:'center',backgroundColor:'white'}}>
                    <Text style={
                    {
                        height:800,
                        width:300,
                    }
                }>{this.state.data.st_aboutus}</Text>               
                </View>
            </View>
        );
    }
}

