import React, { Component } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Platform,
    SafeAreaView,
    StatusBar,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View> 
                <View
                    style={{
                        backgroundColor: '#E4E4E4',
                        height: Platform.OS === 'ios' ? 20 : 0,
                    }}>
                </View>
                {/* <StatusBar
                    backgroundColor="#E4E4E4"
                    barStyle="dark-content" /> */}

                <View style={[styles.headerView, this.props.headerView]}>
                    <View style={[styles.left, this.props.left]}>
                        <TouchableOpacity onPress={this.props.onPressLeft}>
                            <Image source={this.props.sourceLeft}
                                style={[styles.logoLeft, this.props.logoLeft]}
                                resizeMethod="resize" />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.center, this.props.center]}>
                        <Text style={[styles.haederText, this.props.haederText]}>{this.props.header}</Text>
                    </View>
                    <View style={[styles.right, this.props.right]}>
                        <TouchableOpacity onPress={this.props.onPressRight}>
                            <Image source={this.props.source}
                                style={[styles.logoright, this.props.logoright]}
                                resizeMethod="resize" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerView:
    {
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    left:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    center:
    {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    right:
    {
        flex: 1,
        justifyContent: 'center'
    },
    haederText:
    {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black'
    },
    logoright:
    {
        height: 22,
        width: 22,
        resizeMode: 'contain'
    },
    logoLeft:
    {
        height: 22,
        width: 22,
        resizeMode: 'contain'
    },
})