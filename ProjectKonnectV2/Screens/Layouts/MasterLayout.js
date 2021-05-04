import {StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get('screen')

const styles = StyleSheet.create({
    mainView:{
      flex:1,
      backgroundColor: 'white',
      alignItems: 'center'
    },
    imageIcon:{
      borderRadius: 6
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