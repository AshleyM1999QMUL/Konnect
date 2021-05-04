import React, {Component} from 'react'
import {Modal, StyleSheet, View, Dimensions, Text} from 'react-native'
import Animated from 'react-native-reanimated';

export default class ModalBox extends Component{
    constructor(props){
        super(props);
        this.state={
            isVisible: false,
        }
    }

    componentDidMount(){

    }

    changeVisibility = () => {
        this.setState({
            isVisible: !this.state.visible,
        })
    }

    render(){
        return(
            <Modal
                animationType={'fade'}
                transparent={false}
                visible={this.state.isVisible} 
            >
            <Text> Hello </Text>
            </Modal>
        )
    }
}

export const popUp = new ModalBox();

const styles = StyleSheet.create({
    popUp:{
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    container:{
        backgroundColor: 'white',
        paddingTop: 12,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    }
});
