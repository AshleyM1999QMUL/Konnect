import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity} from 'react-native';

const screen = Dimensions.get('screen');
const font_size = 25;
const font_color = 'grey';


class Settings extends Component{
  render(){

    return (
      <View style={styles.mainView}>
          <StatusBar style="auto" />
        <View style={styles.settingTabTop}>
          <TouchableOpacity style={styles.settingButton}
          onPress={() => this.props.navigation.navigate('Location')}
          >
            <Text style={styles.settingText}>Location</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingTab}>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingText}>Information</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingTab}>
        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingText}>Testing</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.footerArea}>
          
        </View>

      </View>
    );
  }
}

export default Settings;

const styles = StyleSheet.create({
  settingText:{
    color: font_color,
    fontSize: font_size,
    paddingLeft: 10,
  },
  settingTabTop:{
    borderColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    width: '100%',
    height: '7.5%'
  },
  settingButton:{
    backgroundColor: 'red',
    width: '50%',
    height: '100%',
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
