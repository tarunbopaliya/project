import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, Button, Image, Picker } from 'react-native';
import Header from '../Components/Header';
import ImagePicker from 'react-native-image-picker';
import API from '../API/Config';

export default class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            text1: '',
            text2: '',
            text3: '',


        };
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
        let userid=this.props.navigation.state.params.userid1;
        const { text } = this.state;
        console.log("Text Length : ", text.length);
        if (text == null || text == "") {
            this.setState({
                NameError: true,

            })
        }
        if (text.length < 6) {
            this.setState({
                NameError: true,

            })
        }
        else if (text.length >= 6) {
            this.setState({
                NameError: false,

            })
        }

        const { text1 } = this.state;
        console.log("Text1 Length:", text1.length);
        if (text1 == null || text1 == "") {
            this.setState({
                NameError1: true,
            })
        }
        if (text1.length < 6) {
            this.setState({
                NameError1: true,
            })
        }
        else if (text1.length >= 6) {
            this.setState({
                NameError1: false,
            })
        }

        const { text2 } = this.state;
        console.log("Text2 Length:", text2.length);
        if (text2 == null || text2 == "") {
            this.setState({
                NameError2: true,
            })
        }
        else if (text2 != text1) {
            this.setState({
                NameError2: true,
            })
        }
        else if (text2 == text1) {
            this.setState({
                NameError2: false,
            })
        }

        if (this.state.NameError == false && this.state.NameError1 == false && this.state.NameError2 == false) {
            fetch(API.SITE_URL + 'ChangePassword.php?id=' + userid + '&oldpass=' + this.state.text + '&password=' + this.state.text2 )
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        loading: false
                    })
                    console.log("user id",userid);
                    console.log("old password",this.state.text);
                    console.log("new password",this.state.text2);
                    if (responseJson.status == 1) {

                        this.props.navigation.navigate("profile");

                    }
                    else {
                        alert("Please Enter Valid Password");
                    }
                })
        }
       

    }

    render() {

        return (
            <View>
                <View>
                    <Header
                        header="Change Password"
                        onPressLeft={() => this.props.navigation.goBack()}
                        sourceLeft={require('../Images/back.png')}
                    />
                </View>
                <View>
                    <View style={{ marginTop: 50 }}>
                        <TextInput
                            style={{
                                backgroundColor: 'transparent',
                                color: 'white',
                            }}
                            label='Old Password'
                            value={this.state.text}
                            onChangeText={text => this.setState({ text })}
                        />
                        {this.state.NameError == true ?
                            <Text>Please Enter Right Password</Text>
                            :
                            null}

                        <TextInput
                            style={styles.inputSearch}
                            label='New Password'
                            value={this.state.int1}
                            onChangeText={text1 => this.setState({ text1 })}
                        />
                        {this.state.NameError1 == true ?
                            <Text>Please Enter valid Password</Text>
                            :
                            null}

                        <TextInput
                            style={styles.inputSearch}
                            label='Confirm Password'
                            value={this.state.int2}
                            onChangeText={text2 => this.setState({ text2 })}
                        />
                        {this.state.NameError2 == true ?
                            <Text>Please Enter same Password as new</Text>
                            :
                            null}
                        <View style={styles.seprator}></View>
                        <View>
                            <TouchableOpacity onPress={this.buttonClickListener}>
                                <Text style={{
                                    backgroundColor: '#000000',
                                    color: '#ffffff',
                                    fontSize: 20,
                                    padding: 10,
                                    width: 200,
                                    height: 50,
                                    marginLeft: 100,
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 10,
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
    body: {
        justifyContent: "center",
        flex: 1,
        padding: 25,
    },
    inputSearch: {
        backgroundColor: 'transparent',
        color: 'white'
    },
    header: {
        backgroundColor: "#00BFFF",
        height: 200,
    },
});