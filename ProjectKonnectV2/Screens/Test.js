import React, {Component} from 'react'
import {ScrollView, View, StyleSheet, Dimensions, Text} from 'react-native'

const screen = Dimensions.get('screen');

export default class Test extends Component{
    render(){
        return(
            <View style={{flex: 1, backgroundColor: 'red'}}>
                <ScrollView 
                    horizontal
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={true}
                    >
                    <View style={[styles.page, {backgroundColor: 'yellow'}]}>
                        <Text>Hello</Text>
                    </View>
                    <View style={[styles.page, {backgroundColor:'red'}] }>
                        <Text>Bye</Text>
                    </View>
                    <View style={[styles.page, {backgroundColor:'green'}]}>
                        <Text>Something</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    page:{
        flex: 1,
        width: screen.width,
        justifyContent: 'center',
        alignItems: 'center',
    }
});