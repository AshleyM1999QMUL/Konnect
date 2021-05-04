import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import WebBox from './Boxes/WebBox'
import PieData from './Data/PieData'

const screen = Dimensions.get('screen');

export default class CovidStatisticsScreen extends Component {
  render(){
    return (
      <View style={styles.mainView}>
          <View style={{backgroundColor: 'red', height: '100%', width:'100%'}}>
            <WebBox
              sourceURL="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
            /> 
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView:{
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
});
