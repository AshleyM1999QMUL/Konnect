import React, {Component} from 'react'
import {View, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native'

var border_radius = 25;
var border_width = 1.5;
var border_colour = '#e6e6e6';
const default_placeholder = "Enter a username : MAX LENGTH 16"

export default class PreChatScreen extends Component{
    static navigationOptions = {
        title: "Chatter",
    };

    constructor(props){
        super(props);
        this.state={
            username: ""
        }
    }

    forward(){
        if(this.state.username<=0 || this.state.username>16){
            alert("Your username is invalid");
            console.log(this.props.navigation)
        }else{
            alert("Username is valid")
            console.log(this.props.navigation.state)
            this.props.navigation.navigate("Chat",
                {
                    name: this.state.username
                }
            )
        }
    }

    textChange(value){
        this.setState({
            username: value
        })
    }
    render(){
        return(
            <View style={styles.mainLayout}>
                <View style={styles.mainTop}>
                    <Text style={styles.preChatText}>Username</Text>
                    <TextInput
                        style={styles.textInput}
                        maxLength={16}
                        onChangeText={value => this.textChange(value)}
                        placeholder={default_placeholder}
                    />
                    <TouchableOpacity style={styles.continueButton} onPress={() => this.forward()}>
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainLayout:{
        flex: 1,
        backgroundColor: "#414a63",
        justifyContent: 'center',
        alignItems:'center',
    },
    mainTop:{
        marginTop: '10%',
        flex: 1,
        width: '100%',
        alignItems:'center'
    },
    preChatText:{
        marginTop: '10%',
        fontSize: 25,
        color: 'white',
        textShadowRadius: 10

    },
    textInput:{
        height: '10%',
        width: '70%',
        backgroundColor: 'white',
        borderRadius: border_radius,
        borderWidth: border_width,
        borderColor: border_colour,
        elevation: 5,
        shadowRadius: 10,
        marginTop: '2.5%',
        textAlign: 'center'
    },
    continueButton:{
        height: '7.5%',
        width: '35%',
        backgroundColor: '#494999',
        borderRadius: border_radius,
        borderColor: 'white',
        borderWidth: border_width,
        elevation: 2,
        marginTop: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    continueButtonText:{
        color:'white',
        fontSize: 17.5,
    },
})
