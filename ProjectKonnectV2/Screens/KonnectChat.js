import React, {Component} from 'react'
import {View, ActivityIndicator ,StyleSheet, Text, ScrollView, TouchableOpacity, Modal, Touchable} from 'react-native'
import {API_key, news_url, country_code, from, to, q_code, sortBy} from './Data/chatList'
import FieldBox from './Data/FieldBox'
import Loading from './Load/Loading'

export default class KonnectChat extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            chatList: null,
        }
    }
    componentDidMount(){
        this.getNews();
    }

    getNews = async() =>{
        console.log(from)
        const link = news_url + 
                "?q=" + q_code + 
                "&from=" + from +
                "&to=" + to +
                "&sortBy=" + sortBy + 
                "&apiKey=" + API_key
        await fetch(link)
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                chatList: data
            })
        });
        this.setState({
            isLoading:false
        })
    }

    displayNews(){
        if(this.state.chatList == null){
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
                    this.state.chatList.articles.map((chat) => 
                    <View>
                        <TouchableOpacity>
                            <FieldBox
                                title={chat.source.name}
                                text={chat.description}
                                imageURL={chat.urlToImage}
                                webpageLink={chat.url}
                                navigation={this.props.navigation}
                            />
                        </TouchableOpacity>
                    </View>
                    )
                )
                
        }
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
                <ScrollView>
                    {view}
                </ScrollView>
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
        fontSize: 18.5,
        marginLeft: '22.5%',
        margin: 10
    },
    popUpContainer:{
        marginTop: '100%',
        marginLeft: '2%',
        marginRight: '2%',
        height: '50%',
        backgroundColor: "#FFF",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 2,
        height: 5
        },
        shadowOpacity: 1.0,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 2,
        borderColor: '#e6e6e6',
    
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
    },
  });

