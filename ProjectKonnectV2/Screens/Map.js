import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import CircleData from './Data/CircleData'

var dataColour = undefined
var dataFillColour = undefined
var dataMultilplier = 1.0
var dataMaxClamp = undefined

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
        
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 10,
    },
    dataButton:{
      height: '100%',
      width: '100%'
    },
   });

function infoCircles(locationStats, showData){
  if(showData == true){
    return <CircleData dataLabel="Deaths" data={locationStats} />
  }
}

function getData(dataType, location, today){
  switch(dataType.toUpperCase()){
    case 'DEATHS':
      dataColour = "red"
      dataFillColour = 'rgba(250, 50, 0, 0.5)'
      dataMultilplier = 4.0
      dataMaxClamp = 1698532
      if(today == true){
        return location.todayDeaths;
      }
      return location.deaths
    case 'RECOVERED':
      dataColour = "green"
      dataFillColour = 'rgba(0, 250, 50, 0.5)'
      dataMaxClamp = 221000
      dataMultilplier = 4.0
      if(today == true){
        return location.todayRecovered;
      }
      return location.recovered
    case 'CASES':
      dataColour = "yellow"
      dataFillColour = 'rgba(155, 125, 50, 0.5)'
      dataMaxClamp = 101000
      dataMultilplier = 0.1
      if(today == true){
        return location.todayCases;
      }
      return location.cases
    default: return 0.0
      
  }
}

const clampNumber = (number, min, max) => 
  Math.min(Math.max(number, min), max)

function Map({locationInfo, countries = [], locationStats, today, dataType, latdelta=50.0, longdelta=0.0}) {
    return (
      <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: locationInfo.lat,
          longitude: locationInfo.long,
          //latitudeDelta: 0.115,
          latitudeDelta: latdelta,
          //longitudeDelta: 0.0121,
          longitudeDelta: longdelta,
        }}
      >
      
      {countries.map((location) => (
        <MapView.Circle
        center = {{latitude:location.countryInfo.lat, longitude: location.countryInfo.long}}
        radius = {
          clampNumber(getData(dataType, location, today) * dataMultilplier, 0, dataMaxClamp)}
        strokeWidth = {3}
        strokeColor = {dataColour}
        fillColor ={dataFillColour}
        
        >
    
        </MapView.Circle>
      ))}
     </MapView>
   </View>
    )
}

export default Map