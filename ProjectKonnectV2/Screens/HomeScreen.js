import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import IconField from './Data/IconField';

const screen = Dimensions.get('screen');

export default class HomeScreen extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={styles.mainView}>
        <View style={styles.headerArea}>
          <Text>Home Screen</Text>
          <StatusBar style="auto" />
        </View>
        <View style={styles.homePage}>
          <TouchableOpacity 
          style={styles.newsFeedButton}
          onPress={() => this.props.navigation.navigate("News Feed")}
          >
            <Image style={{width: '100%', height:'100%'}} source={require("./Images/Logos/world.jpg")}/>
          </TouchableOpacity>
          <Text style={styles.labelText}>News Feed</Text>
        </View>
        <View style={styles.homeMenuPlane}>
          <IconField
            title="Chats"
            To={this.props.navigation}
            screenName="preChat"
            imageName="CHATS"
            border_width={1.5}
            border_colour="#7d8496"
          />
          <IconField
            title="Profile"
            To={this.props.navigation}
            screenName="Profile"
            imageName="PROFILE"
            border_width={1.5}
            border_colour="#7d8496"
          />
          <IconField
            title="WHO Advice"
            To={this.props.navigation}
            imageName="WHO"
            screenName="WHO Advice"
            border_width={1.5}
            border_colour="#7d8496"
          />
          
        </View>

        <View style={styles.footerArea}>
          
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
  homePage:{
    width: '100%',
    flex: 3,
    borderColor: 'black',
    borderWidth: 2

  },
  newsFeedButton: {
    backgroundColor: '#3366ff',
    height: '100%',
    width: '100%',
  },
  homeMenuPlane: {
    backgroundColor: '#414a63',
    width: '100%',
    flex: 6,
    borderWidth:2,
    borderColor: 'black',
    borderTopWidth:0,
    borderBottomWidth:0,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
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
    borderWidth: 2,
    borderBottomWidth:0,
    borderColor: 'black'
  },
  footerArea: {
    position:'absolute',
    width: '100%',
    height: screen.height * 0.05,
    backgroundColor: '#cc00cc',
    bottom: 0,
    borderWidth: 2,
    borderBottomWidth:0,
    borderColor: 'black'
  },

  labelText: {
    position:'absolute',
    color: 'white',
    fontSize: 20,
    bottom: 0,
    right: 0,
    paddingRight: 10,
    paddingBottom: 3
  }
});
