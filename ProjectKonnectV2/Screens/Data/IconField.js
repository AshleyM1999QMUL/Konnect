import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import { to } from './NewsData';

function getIcon(imageName){
    console.log(imageName)
    switch(imageName){
        case "WHO": 
            return require("../Images/Logos/WHO.jpeg");
        case "CHATS":
            return require("../Images/Logos/Message.jpg");
        case "PROFILE":
            return require("../Images/Logos/User.png");
        default:
            return require("../Images/Logos/Error.png")
    }
}

function checkName(To, screenName){
    if(screenName == undefined){
        return () => Alert.alert("Invalid Path");
    }else{
        return () => To.navigate(screenName);
    }
}

export default function IconField({title, imageName, To, screenName, border_width=0, border_colour='black'}){
    return (
        <View style={{width: '25%', height: '20%', margin: 10}}>
            <View style={[styles.card, {borderWidth: border_width, borderColor: border_colour}]}>
                <TouchableOpacity
                onPress={checkName(To,screenName)}
            >
                <View style={styles.cardContent}>
                    <Image source={getIcon(imageName)} style={styles.cardImage}>

                    </Image>
                </View>
                </TouchableOpacity>
            </View>
            <Text style={{textAlign:'center', color: 'white', fontSize: 20}}>{title}</Text>
        </View>
        
    )
}

const styles = StyleSheet.create({
    card:{
        borderRadius: 16,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 4,
        width: '100%',
        height: '100%',
    },
    cardImage:{
        height: '100%',
        width: '100%'
    }, 
    cardContent:{
        marginHorizontal: 18,
        marginVertical: 20
        
    },
    cardFigure: {
        fontSize: 25,
        fontWeight: "bold",
    },
});

