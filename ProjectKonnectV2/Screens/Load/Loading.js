import React, {Component} from 'react'
import {View, ActivityIndicator, Dimensions} from 'react-native'

export default function Loading() {
    return (
        <View style={{flex:1}}>
            <View style={{marginTop: "50%"}}>
                <ActivityIndicator animating={true} color='#b366ff' size={'large'}/>
            </View>
        </View>
    )
}