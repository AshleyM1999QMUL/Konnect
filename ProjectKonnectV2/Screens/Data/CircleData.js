import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const setMode = {
        Deaths:{
            infoCircle_title: 'Deaths',
            infoCircle_colour:'red',
            infoCircle_dataAmount: getAmount([100, 200], checkToday),
        },
        Recovered:{
            infoCircle_title: 'Recovered',
            infoCircle_colour:'green',
            //infoCircle_dataAmount: getAmount([locationData.todayRecovered, locationData.recovered], checkToday),
        },  
        Cases:{
            infoCircle_title: 'Cases',
            infoCircle_colour: 'yellow',
            //infoCircle_dataAmount: getAmount([locationData.todayCases, locationData.cases], checkToday),
        }  
    
}

function getAmount(data, today){
    if(today == true){
        return data[0]
    }else{
        return data[1]
    }
}

var dataLabel = 'Deaths'
var locationData =  10
var checkToday = false

export default function CircleData({dataLabel, data}){
    locationData = data
    const getData = {
        Deaths:{
            infoCircle_title: 'Deaths',
            infoCircle_colour:'red',
            infoCircle_dataAmount: getAmount([locationData.todayDeaths, locationData.deaths], checkToday),
        },
        Recovered:{
            infoCircle_title: 'Recovered',
            infoCircle_colour:'green',
            infoCircle_dataAmount: getAmount([locationData.todayRecovered, locationData.recovered], checkToday),
        },  
        Cases:{
            infoCircle_title: 'Cases',
            infoCircle_colour: 'yellow',
            infoCircle_dataAmount: getAmount([locationData.todayCases, locationData.cases], checkToday),
        }  
       }
   
    return(
        <View style={styles.circle}>
            <Text style={styles.circleText}>{setMode[dataLabel].infoCircle_title + "\n" + getData[dataLabel].infoCircle_dataAmount} </Text>
        </View>
    )
    
}

const styles = StyleSheet.create({
    circle: {
        backgroundColor: setMode[dataLabel].infoCircle_colour,
        borderRadius: 100/2,
        height: 100,
        width: 100,
        opacity: 0.35,
        position: 'absolute',
    },
    circleText: {
        textAlign: 'center',
        marginTop: 60/2,
        marginLeft: 5.5,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
