import React, {Component} from 'react'
import {View, ActivityIndicator ,StyleSheet, Text, ScrollView, TouchableOpacity, Modal, Animated} from 'react-native'
import {API_key, news_url, country_code, from, to, q_code, sortBy} from './Data/NewsData'
import FieldBox from './Data/FieldBox'
import Loading from './Load/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage'

const border_radius = 25;
const border_width = 2;
const border_colour = '#e6e6e6';
var link = "http://newsapi.org/v2/everything?q=COVID&from=" + from + "&to=" + to  + "&sortBy=popularity&apiKey=" + API_key
export default class NewsFeed extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            newsData: null,
            popUpVisible: false,
            countryCode: 'Local',
            fadeAnimOverlay: new Animated.Value(0),
            darkMode:{
                isDark: false,
                buttonColor: '#8000ff',
                buttontextColor: 'white',
                backgroundColor: 'white',
                textColor: 'black'
            },
            link: "http://newsapi.org/v2/everything?q=COVID&from=" + from + "&to=" + to  + "&sortBy=popularity&apiKey=" + API_key
        }
    }
    
    changeLink(type=""){
        this.setState({
            isLoading: true
        })
        console.log(type)
        console.log("link BEFORE:" +  this.state.link)
        switch(type.toLowerCase()){
            case 'coronavirus':
                link= "http://newsapi.org/v2/everything?q=COVID&from=" + from + "&to=" + to  + "&sortBy=popularity&apiKey=" + API_key
                break;
            case 'health':
                console.log("enter health")
                link= "http://newsapi.org/v2/everything?q=vaccine, hospital, covid&from=" + from + "&to=" + to  + "&sortBy=popularity&apiKey=" + API_key
                break;
            case 'business':
                link= "http://newsapi.org/v2/everything?q=business&from=" + from + "&to=" + to  + "&sortBy=popularity&apiKey=" + API_key
            break;
            case 'sport':
                link= "http://newsapi.org/v2/everything?q=sport&from=" + from + "&to=" + to  + "&sortBy=popularity&apiKey=" + API_key
                break;
            default: return;
        }
        console.log("link NOW:" +  link)
        this.getNews();

    }

    storeData = async(key, value) =>{
        try{
            await AsyncStorage.setItem(key, value)
        }catch(error){
            console.log(error)
        }
    }

    getData = async(key) =>{
        try{
            let value = await AsyncStorage.getItem(key)
            console.log("hello")
            switch(value){
                case null:
                    return;
                case "DARK":
                    console.log("setting")
                    this.setState({
                            darkMode: {isDark: true, buttonColor: '#8000ff', backgroundColor: 'white', buttontextColor:'white', textColor:'black'}
                    })
                    break;
                default: return;
            }
        }catch(error){
            console.log(error)
        }
    }

    darkMode(){
        let dark_values = undefined
        this.setState({
            darkMode: {isDark: !this.state.darkMode.isDark}
        })
        dark_values = this.state.darkMode
        //If dark mode is true
        if(dark_values.isDark){
            this.setState({
                darkMode: {isDark: false, buttonColor: '#8000ff', backgroundColor: 'white', buttontextColor:'white', textColor:'black'}
            })
            this.storeData("DARK", "LIGHT")
        }else{
            this.setState({
                darkMode: {isDark: true, buttonColor: 'white', backgroundColor: '#414a63', buttontextColor: 'black', textColor: 'white'}
            })
            this.storeData("DARK", "DARK")
        }

    }
    overlay(){
        if(this.state.popUpVisible){
            Animated.timing(this.state.fadeAnimOverlay, {
                toValue: 0.5,
                duration: 200,
                useNativeDriver: true,
            }).start();
            return(
                <Animated.View style={[
                    styles.popUpOverlayBackground,{
                        opacity: this.state.fadeAnimOverlay,
                    }
                
                ]}>
                    <Modal
                        visible={this.state.popUpVisible}
                        transparent={true}
                        animationType={'slide'}
                    >
                        <View style={[styles.overlaySettings, {backgroundColor: this.state.darkMode.backgroundColor}]}>
                            <View style={{flex:1}}>
                                
                            </View>
                            <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                                <TouchableOpacity style={styles.overlayButton} onPress={() => this.changeCountry()}>
                                    <Text style={styles.overlayText}>{"Country Code: " + this.state.countryCode}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.overlayButton, {marginTop: 2}]}/>
                                <TouchableOpacity style={[styles.overlayButton, {backgroundColor:this.state.darkMode.buttonColor, marginTop: 2}]} onPress={() => this.darkMode()}>
                                    <Text style={[styles.overlayText, {color: this.state.darkMode.buttontextColor}]}>Dark Mode</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                <TouchableOpacity style={styles.overlayButton} onPress={() => this.changeVisibility()}>
                                    <Text style={styles.overlayText}>Close</Text>
                                </TouchableOpacity>
                                
                            </View>
                            
                        </View>
                    </Modal>
                </Animated.View>
            )
        }
        Animated.timing(this.state.fadeAnimOverlay, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }



    componentDidMount(){
        this.getNews();
    }

    changeVisibility(){
        this.setState({
            popUpVisible: !this.state.popUpVisible
        })
    }

    changeCountry(){
        this.setState({
            countryCode: (this.state.countryCode == 'Local') ? "WorldWide" : "Local"
        })
    }

    changeMode(){
        this.setState({
            countryCode: (this.state.countryCode == 'Local') ? "WorldWide" : "Local"
        })
    }

    getNews = async() =>{
        console.log(from)
        // const link = news_url + 
        //         "?q=" + "vaccine, hospital, covid" + 
        //         "&from=" + from +
        //         "&to=" + to +
        //         "&sortBy=" + sortBy + 
        //         "&apiKey=" + API_key
        //const link = "https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=f1b1aced0bf8401ca997d47ae4b55f5f"
        console.log(link)
        await fetch(link)
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                newsData: data
            })
        });
        this.setState({
            isLoading:false
        })
    }

    displayNews(){
        if(this.state.newsData == null){
            return(
                <View>
                    <FieldBox
                        title="ERROR"
                        text="ERROR"
                        imageURL="https://m.files.bbci.co.uk/modules/bbc-morph-news-waf-page-meta/5.1.0/bbc_news_logo.png"
                    /> 
                </View> 
            )
        }else{
                return(
                    this.state.newsData.articles.map((news) => 
                    <View>
                        <FieldBox
                            title={news.source.name}
                            text={news.description}
                            imageURL={news.urlToImage}
                            webpageLink={news.url}
                            navigation={this.props.navigation}
                            color={this.state.darkMode.backgroundColor}
                            textColor={this.state.darkMode.textColor}
                        />
                    </View>
                    )
                )
                
        }
    }
    
    getTab( title=""){
        return(
            <TouchableOpacity style={styles.newsTab} onPress={() => this.changeLink(title)}>
                <Text style={styles.newsTabText}>{title}</Text>
            </TouchableOpacity>
        )
    }
    

    render(){
        let view = undefined
        if(this.state.isLoading == true){
            view =  <Loading/>
        }else{
            view = this.displayNews()
        }

        return(
            <View style={styles.mainView}>
                <TouchableOpacity 
                style={{backgroundColor: '#e6e6e6'}}
                onPress={() => this.changeVisibility()}
                >
                <View style={{width: '100%', height: '5%'}}>
                    <Text style={{textAlign:'center', marginTop: 5}}>Press for filter</Text>
                </View>
                </TouchableOpacity>
                <View 
                style={{backgroundColor: '#3a9ba6',width: '100%', height: '5%', flexDirection:'row'}}>
                    {this.getTab("Coronavirus")}
                    {this.getTab("Health")}
                    {this.getTab("Business")}
                    {this.getTab("Sport")}
                </View>
                <ScrollView>
                    {view}
                </ScrollView>
                {this.overlay()}
           </View>
           
        );
    }


}

const styles = StyleSheet.create({
    mainView:{
      flex: 1,
      backgroundColor: 'white'
    },
    BoxText:{
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18.5,
    },
    popUpOverlayBackground:{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        position: 'absolute',
    
    },
    filterView: {
        top: '25%',
        backgroundColor: '#e0e6e6', 
        width: '80%', 
        height: '15%', 
        margin: 15, 
        borderRadius: 12
    },
    filterBox: {
        backgroundColor: '#8000ff',
        height: '100%',
        width: '100%',
        position: 'absolute',
        elevation: 5,
        shadowOffset: {width: 2, height: 3},
        shadowRadius: 4,
        borderRadius: 6,
        borderColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlaySettings:{
        height: '70%',
        width: '75%',
        backgroundColor: 'white',
        borderRadius: 15,
        borderColor: border_colour,
        borderWidth: border_width,
        left: '13%',
        top: '10%'
    },
    overlayButton:{
        height: '30%',
        width: '75%',
        backgroundColor: '#8000ff',
        borderRadius: 15,
        elevation: 2,
        borderWidth: 1.5,
        borderColor: border_colour,
        justifyContent:'center',
    },
    overlayText:{
        textAlign:'center',
        color: 'white',
        fontSize: 17.5
    },
    newsTab:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        borderRightWidth:1.5,
        borderRightColor: border_colour,
    }, 
    newsTabText:{
        color:'white',
        fontSize: 15
    },  
  });

