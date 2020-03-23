import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, Button, Image, Picker } from 'react-native';
import Header from '../Components/Header';
import API from '../API/Config';


export default class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            text1: '',
            text2: '',
            text3: '',
            NameError: false,
            NameError1: false,
            
        };
    }
    componentDidMount = async () => {

        
    }


    onChangeText(text) {
        this.setState({
            int1: text
        })
    }
    onChangeText(text1) {
        this.setState({
            int1: text1
        })
    }
    onChangeText(text2) {
        this.setState({
            int2: text2
        })
    }
    buttonClickListener = () => {
 
       
        let emailid=this.props.navigation.state.params.email;
        let userid=this.props.navigation.state.params.id;
        console.log("Email : ", emailid);
        console.log("user id:", userid);
        //console.log("password:",text2);
        const {text1}=this.state;
        console.log("Text1 Length:",text1.length);
        if(text1==null || text1=="")
        {
            this.setState({
                NameError1:true,
            })
        }
        if(text1.length<6)
        {
            this.setState({
                NameError1:true,
            })
        }
        else if(text1.length>=6)
        {
            this.setState({
                NameError1:false,
            })
        }

        const {text2}=this.state;
        console.log("Text2 Length:",text2.length);
        if(text2==text1)
        {
            this.setState({
                NameError2:false,
            })
        }
        else if(text2!=text1)
        {
            this.setState({
                NameError2:true,
            })
        }
         if(this.state.NameError1==false & this.state.NameError2==false){

            
            fetch(API.SITE_URL + 'UserUpdatePass.php?id='+userid+'&email=' + emailid + '&password=' + this.state.text2)
            .then((response) => response.json())
            .then((responseJson) => {
             this.setState({
                  loading: false
            })
          console.log("URL OTP Response : ", responseJson);
          if (responseJson.status == 1) {
            
            this.props.navigation.navigate("Login",);
          }
          else{
            alert("Please enter valid password!")
          }
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
            
         }


        
    }

    render() {

        return (
            <View>
                    <Header
                        header="Set New Password"
                        onPressLeft={() => this.props.navigation.goBack()}
                        sourceLeft={require('../Images/back.png')}
                    />
                
                <View style={{backgroundColor:'white'}}>
                        <View style={{marginTop:50, backgroundColor:'white' }}>
                            <View style={{alignItems:'center'}}>
                            <Text style={{fontSize:30}}>Set Your New Passwords</Text>
                            <TextInput
                                style={styles.inputSearch}
                                label='New Password'
                                value={this.state.int1}
                                onChangeText={text1 => this.setState({ text1 })}
                            />
                             {this.state.NameError1==true ?
                                <Text>Please Enter valid Password</Text>
                                :
                                null}

                            <TextInput
                                style={styles.inputSearch}
                                label='Confirm Password'
                                value={this.state.int2}
                                onChangeText={text2 => this.setState({ text2 })}
                            />     
                            {this.state.NameError2==true ?
                                <Text>Please Enter same Password as new</Text>
                                :
                                null}                           
                            
                            
                                <TouchableOpacity onPress={() => this.buttonClickListener()}>
                                    <Text style={{
                                        backgroundColor: '#000000',
                                        color: '#ffffff',
                                        fontSize: 20,
                                        padding: 10,
                                        width: 200,
                                        height: 50,                                        
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        marginTop: 10,
                                        marginBottom:500,
                                        borderRadius: 30
                                    }}>
                                        save
                                    </Text>
                                </TouchableOpacity>
                                </View>   
                        </View>
                    </View>
                </View>
            
        );
    }
}

const styles = StyleSheet.create({
    seprator: {
        borderBottomWidth: 0.8,
        borderBottomColor: '#ebebeb',
        marginBottom: 8,
        marginTop: 8
    },
    inputSearch: {
        backgroundColor: 'transparent',
        color: 'white',
        marginTop:10,
        height:50,
        width:400,
    },
       
});

