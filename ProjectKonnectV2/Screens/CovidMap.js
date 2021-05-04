import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import Map from './Map';
import {Picker} from '@react-native-picker/picker'

const screen = Dimensions.get('screen');

export default class CovidMap extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedData: 'Deaths',
            selectedTime: 'All time',
            selectToday: false,
        }
    }

    switchMode = async(value)=>
    {
        this.setState({selectedData: value})
    }

    switchTime = async(value)=>
    {
        this.setState({
            selectedTime: value,
            selectToday: !this.selectToday,
        })
    }

    

    render() {
        const data = this.props.route.params;
        return (
            <View style={styles.mainView}>
                <View style={styles.mapArea}>
                    <Map 
                    locationInfo={data.locationInfo} 
                    locationStats={data.locationStats} 
                    countries={data.countries} 
                    dataType={this.state.selectedData}
                    today={this.state.selectToday}
                    >
                        
                    </Map>
                    <View style={styles.filterBox}>
                        <View style={styles.dataTypeBox}>
                            <Picker
                                selectedValue={this.state.selectedData}
                                onValueChange={this.switchMode.bind()}
                            >
                                <Picker.Item label="Deaths" value="Deaths"/>
                                <Picker.Item label="Recovered" value="Recovered"/>
                                <Picker.Item label="Cases" value="Cases"/>
                            </Picker>
                        </View>
                        <View style={styles.timeBox}>
                            <Picker 
                                onValueChange={this.switchTime.bind()}
                                selectedValue={this.state.selectedTime}
                            >
                                <Picker.Item label="All time" value="All time"/>
                                <Picker.Item label="Today" value="Today"/>
                            </Picker>
                        </View>
                    </View>
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
    mapArea: {
        height: '100%',
        width: '100%',
        backgroundColor: 'red'
    },
    dataTypeBox:{
        flex: 1,
        backgroundColor: 'white',
        borderRightWidth: 1.5,
        borderColor: 'black',
    },
    timeBox:{
        flex: 1,
        backgroundColor: 'white',
    },
    filterBox: {
        backgroundColor: 'white',
        height: '7.5%',
        width: '70%',
        position: 'absolute',
        elevation: 3,
        marginLeft: 10,
        marginTop: 10,
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 4,
        borderRadius: 6,
        borderColor: 'black',
        flexDirection: 'row',

    },
    headerArea: {
      width: '100%',
      alignItems:'center',
      height: screen.height * 0.05,
      backgroundColor: '#cc00cc',
      top: 0,
    },
    footerArea: {
      width: '100%',
      height: screen.height * 0.05,
      backgroundColor: '#cc00cc',
      top: screen.height*0.85,
    }
  });
