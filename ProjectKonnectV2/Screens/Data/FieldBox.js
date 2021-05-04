import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Container, Header, Content, List, ListItem, Thumbnail,
    Left, Body, Right, Button} from 'native-base'
//import styles from 'Screens/Layouts/MasterLayout'
import NewsViewScreen from '../NewsViewScreen'

const default_news_uri =  'https://cdn.pixabay.com/photo/2017/06/10/07/22/news-2389226_960_720.png'


export default function FieldBox({title, text, imageURL, webpageLink, navigation, color = 'white', textColor='black'}) {
        if(imageURL==null){
          
          imageURL = default_news_uri
        }
        return(
            <View style={[bedeck.fieldStyle, {backgroundColor: color}]}>
                <List>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail 
                        square source={{ uri: imageURL }} 
                        style={bedeck.imageIcon}
                    />
                  </Left>
                  <Body>
                    <Text style={[bedeck.titleText, {color: textColor}]}>{title}</Text>
                    <Text note numberOfLines={3} style={{color: textColor}}>{text}</Text>
                  </Body>
                  <Right>
                    <Button transparent={false}
                        onPress={() => navigation.navigate("News View", webpageLink)}
                    >
                      <Text style={bedeck.viewText}>View</Text>
                    </Button>
                  </Right>
                </ListItem>
              </List>
            </View>    
        );
}

const bedeck = StyleSheet.create({
    imageIcon:{
      borderRadius: 6,
    },
    fieldStyle:{
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
    },
    viewText:{
        color: '#1a8cff',
        fontWeight: 'bold'
    },
    titleText:{
        fontWeight: 'bold',
    }
  });

