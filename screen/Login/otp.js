import React from "react";
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, Button, TextInput, Image } from 'react-native';
import Header from '../Components/Header';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import OTPTextView from 'react-native-otp-textinput';
import API from '../API/Config';

export default class OTP extends React.Component {


   
    //componentDidMount = async () => {  
        
    //}
    constructor(props) {
        super(props)
        this.state = {
          OTPVal: '',
                  
        }
      }
    


    buttonClickListener = () => {
        let emailid=this.props.navigation.state.params.email;
        console.log("Email : ", emailid);
        console.log("OTP : ", this.state.OTPVal);
        // let OTP=this.props.navigation.state.params.otp;
        //console.log("email:",emailid);
        //console.log("otp:",OTP);
        fetch(API.SITE_URL + 'VerifyOTP.php?email=' + emailid + '&otp=' + this.state.OTPVal)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            loading: false
          })
          console.log("URL OTP Response : ", responseJson);
          if (responseJson.status == 1) {
            
            this.props.navigation.navigate("setnewpassword",{email:responseJson.data[0].email,id:responseJson.data[0].userid});
          }
          else{
            alert("Please enter correct otp!")
          }
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
                        header="Verify OTP"
                        sourceLeft={require('../Images/back.png')}
                        onPressLeft={() => this.props.navigation.goBack()}

                        
                    />
                </View>

                <View>
                    <View style={{ marginTop: 20 ,alignItems:'center'}}>
                        <Text> We have sent you an OTP on your registered Email-id</Text>
                    </View>
                    <View style={{borderWidth:1,margin:10,alignItems:'center'}} >
                        <Text style={{fontSize:25,marginTop:10}}>Write OTP Here</Text>

                        
                                <OTPTextView
                                    handleTextChange={text => this.setState({ OTPVal: text })}
                                    inputCount={4}
                                    keyboardType="numeric"
                                    tintColor="grey"
                                    offTintColor="black"
                                    // textInputStyle = {styles.OTPTextInput}
                                />
                            



                        {/* <OTPInputView
                            style={{ width: '80%', height: 150,}}
                            pinCount={4}
                            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                            // onCodeChanged = {code => { this.setState({code})}}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled={(code => {
                                console.log(`Code is ${code}, you are good to go!`)
                            })}
                        /> */}
                    </View>
                    <View style={{alignItems:'center'}}>                       
                        <Text style={styles.input} >Resend OTP</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity onPress={() => this.buttonClickListener()}>
                            <Text style={styles.input1}> Verify</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
    }


}
const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45
    },
    input: {

        textDecorationLine: 'underline',
    

    },

    borderStyleHighLighted: {
        borderColor: "black",
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

    underlineStyleBase: {
        width: 40,
        height: 45,
        borderWidth: 1,
        borderBottomWidth: 1,
        color:'black',
        
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    
    },
});