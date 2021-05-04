import React, {Component} from 'react'
import WebBox from './Boxes/WebBox'
import {View, StyleSheet} from 'react-native'

export default class NewsViewScreen extends Component{
    constructor(props){
        console.log(props.route.params)
        super(props);
        this.state={
            webpageLink: props.route.params
        }
    }

    render(){
        return(
            <View style={{flex:1, backgroundColor:'white'}}>
                <View style={{flex:1}}>
                    <WebBox
                        sourceURL={this.state.webpageLink}
                    />
                </View>
            </View>
        )
    }

}
