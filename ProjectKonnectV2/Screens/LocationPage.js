import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity} from 'react-native';

const font_size = 25;
const data_font_size = 20;
const font_color = 'grey';

class LocationPage extends Component{
  constructor(){
    super();
    this.state = {
        ready: false,
        where: {lat: null, lng: null},
        error: null,
        locationCity: "London",
        locationCountry: "UK",
        locationActive: true
    }
  }
  componentDidMount(){
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24
    };
    this.setState({ready:false, error: null});
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess, this.geoFailure, this.geoOptions
    );
  }

  geoSuccess = (position) => {
    console.log(position)
    this.setState({ready:true})
  }
  geoFailure = (err) => {
    this.setState({error: err.message});
  }

  locationActivate = () => {
    this.setState({locationActive: !this.state.locationActive})
  }


  

  render(){
    console.log(this.state);
    return (
      <View style={styles.mainView}>
          <StatusBar style="auto" />
          <View style={styles.settingTabTop}>
            <Text style={styles.settingText}>Active:</Text>
            <View style={styles.settingData}>
              <TouchableOpacity style={styles.settingButton}
              onPress={() => this.locationActivate()}>
                <Text style={styles.settingDataText}>{this.state.locationActive.toString()}</Text>
              </TouchableOpacity>
            </View>
        </View>
        <View style={styles.settingTab}>
            <Text style={styles.settingText}>City: </Text>
            <View style={styles.settingData}>
              <Text style={styles.settingDataText}>{this.state.locationCity}</Text>
            </View>
        </View>
        <View style={styles.settingTab}>
            <Text style={styles.settingText}>Country:</Text>
            <View style={styles.settingData}>
              <Text style={styles.settingDataText}>{this.state.locationCountry}</Text>
            </View>
        </View>
      </View>
    );
  }
}

export default LocationPage;

const styles = StyleSheet.create({
  settingText:{
    position: 'absolute',
    color: font_color,
    fontSize: font_size,
    paddingLeft: 10,
    bottom: 10
  },
  settingTabTop:{
    borderColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    width: '100%',
    height: '7.5%'
  },
  settingButton:{
    width: '75%',
    height: '100%',
  },
  settingData:{
    position: 'absolute',
    width: '50%',
    height: '100%',
    right: 0,
    backgroundColor: 'pink'
  },
  settingDataText:{
    position: 'absolute',
    color: font_color,
    fontSize: data_font_size,
    paddingLeft: 10,
    bottom: 10
  },
  mainView:{
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  settingTab:{
    borderColor: 'black',
    borderBottomWidth: 1,
    width: '100%',
    height: '7.5%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barstatus: {
    backgroundColor: 'white',
    height: '10%'
  },
});
