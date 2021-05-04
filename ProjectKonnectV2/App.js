import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './Screens/HomeScreen';
import CovidMapScreen from './Screens/CovidMapScreen';
import CovidStatisticsScreen from './Screens/CovidStatisticsScreen';
import SettingsScreen from './Screens/Settings';
import LocationScreen from './Screens/LocationPage';
import MapScreen from './Screens/CovidMap';
import NewsFeedScreen from './Screens/NewsFeed'
import NewsViewScreen from './Screens/NewsViewScreen';
import CovidChart from './Screens/CovidCharts';
import CovidChartEnlarge from './Screens/CovidChartEnlarge';
import AnalysisScreen from './Screens/AnalysisScreen';
import ContinentScreen from './Screens/ContinentScreen';

import TestScreen from './Screens/AnalysisScreen';
import profileScreen from './Screens/ProfileScreen';

import preChatScreen from './Screens/PreChatScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from './Screens/ChatScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const headerColor = '#8000ff';

const createSettingStack = () =>
  <Stack.Navigator>
    <Stack.Screen name="Settings" component={SettingsScreen}/>
    <Stack.Screen name="Location" component={LocationScreen}/>
    <Stack.Screen name="Map" component={MapScreen}/>
  </Stack.Navigator>

const createMapStack = () =>
<Stack.Navigator>
  <Stack.Screen name="Covid Statistics" component={CovidMapScreen} 
  options={{headerStyle:{
      backgroundColor:headerColor,
    },
    headerTitleStyle:{
      color: 'white',
    }
    }}/>
  <Stack.Screen name="Covid Map" component={MapScreen}/>
  <Stack.Screen name="Covid Charts" component={CovidChart}
    options={{
      headerStyle:{
        backgroundColor: headerColor,
      },
      headerTitleStyle:{
        color: 'white',
      }
    }}
  />
  <Stack.Screen name="Chart" component={CovidChartEnlarge}
    options={{
      headerStyle:{
        backgroundColor: headerColor,
      },
      headerTitleStyle:{
        color: 'white',
      }
    }}
  />
  <Stack.Screen name="Analysis" component={AnalysisScreen}
    options={{
      headerStyle:{
        backgroundColor: headerColor,
      },
      headerTitleStyle:{
        color: 'white',
      }
    }}
  />
  <Stack.Screen name="Continents" component={ContinentScreen}
    options={{
      headerStyle:{
        backgroundColor: headerColor,
      },
      headerTitleStyle:{
        color: 'white',
      }
    }}
  />
</Stack.Navigator>

const createHomeStack = () =>
<Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
  <Stack.Screen 
    name="News Feed" 
    component={NewsFeedScreen}
    options={{
      headerStyle: {
        backgroundColor: headerColor,
      },
      headerTitleStyle: {
        color: 'white',
      }
    }}/>
  <Stack.Screen
    name="News View"
    component={NewsViewScreen}
    options={{
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: headerColor
      }
    }}
  />
  <Stack.Screen
    name = "WHO Advice"
    component={CovidStatisticsScreen}
    options={{
      headerStyle:{
        backgroundColor: headerColor,
      },
      headerTitleStyle:{
        color: 'white',
      }
    }}
  />
  <Stack.Screen
    name = "Profile"
    component={profileScreen}
    options={{
      headerShown: false
    }}
  />
  <Stack.Screen
    name = "preChat"
    component={preChatScreen}
    options={{
      headerStyle:{
        backgroundColor: '#494999'
      },
      headerTitleStyle:{
        color: 'white'
      },
      headerTitle:"Chat"
    }}
  />
  <Stack.Screen
    name="Chat"
    component={ChatScreen}
    options={{
      headerStyle:{
        backgroundColor:"#494999"
      },
      headerTitleStyle:{
        color: 'white'
      },
    }}
  >

  </Stack.Screen>
</Stack.Navigator>

export default function App() {
  
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="HOME" children={createHomeStack}/>
        <Drawer.Screen name="COVID-MAP" children={createMapStack}/>
        <Drawer.Screen name="SETTINGS" children={createSettingStack}/>
        <Drawer.Screen name="TEST" component={TestScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

