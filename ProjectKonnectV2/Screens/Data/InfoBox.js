import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

var text_color = 'black';

function getColor(color){
    if(color == null){
        return 'black';
    }
    else{
        return color;
    }
}


export default function InfoBox({title, cases, total="", color, description, textColor='black', background_colour = 'white'}){
    text_color = textColor;
    return (
        <View style={[styles.card, {backgroundColor: background_colour}]}>
            <View style={styles.cardContent}>
                <Text style={{color: getColor(color), fontSize:18.5, fontWeight:'bold'}}>{title}</Text>
                <Text style={{fontSize: 25, fontWeight: "bold", color: text_color}}>{cases}</Text>
                <Text style={{color: 'grey'}}>{total + " " + description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 4,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardContent:{
        marginHorizontal: 18,
        marginVertical: 20
        
    },
    cardFigure: {
        fontSize: 25,
        fontWeight: "bold",
        color: text_color,
    }
});

