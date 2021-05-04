import React, {Component} from 'react'
import {View, Image, Animated, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput, Modal, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const border_radius = 25;
const border_width = 2;
const wildCard_border_width = 1;
const border_colour = '#e6e6e6';
const border_line_colour = '#8c8c8c';
var default_text = "Today I am feeling...";
var default_bio_text = "I like trains";
var profile_color = "#ff9999";
var profile_background_color = "#9f80ff";
var profile_picture_background = "black";
var wildcardColor_one = 'white';
var wildcardColor_two = 'white';
var wildcardColor_three = 'white';
var statusText = "";
const colour_set = ['white', '#ff9999', '#b3d9ff', '#ff0546', '#ff9933' ,'#000000' 
                    ,'#0000aa','#29a5cb','#53c766', '#ddbe8c' , '#00a58e', '#ffb0cb'
                    , '#aa3300', '#ddbeed', '#53f6dd', '#fff6dd', '#ffbe63', '#9f80ff' ]


export default class ProfileScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            isVisible_settings: false,
            isVisible_colour:false,
            isVisible_avatar:false,
            fadeAnimSettingOverlay: new Animated.Value(0),
            colourButton: undefined,
            bioData:{
                text: undefined
            },
            profileImage: "BLANK",
        }
    }

    componentDidMount(){
        this.setState({
            profileImage: this.selectAvatar(this.getData("AVATAR", "BLANK", "PICTURE")),
        })
        this.getData("STATUS", "", "STATUS_TEXT")

    }

    storeData = async(key, value) =>{
        try{
            await AsyncStorage.setItem(key, value)
        }catch(error){
            console.log(error)
        }
    }
    
    getData = async(key ="", default_value = "", type="") =>{
        try{
            const value = await AsyncStorage.getItem(key)
            console.log(key, value)
            if(type=="PICTURE" && value!=null){
                this.setState({
                    profileImage: this.selectAvatar(value)
                })
            }
            else if(type=="STATUS_TEXT" && value!= null){
                console.log(value)
                statusText=value
                console.log(statusText)
                this.getText()
            }
            else if(value != null){
                return value
            }else{
                console.log("No Data for the key")
                return default_value
            }
        }catch(error){
            console.log("error here")
            console.log(error)
        }
    }

    textChange(type, value){
            this.storeData(type, value)
    }

    getText(){
        console.log("enter")
        console.log(statusText)
        return statusText
    }

    selectAvatar(avatar){
        console.log(avatar)
        switch(avatar){
            case "BUTTERFLY": 
                return require("./Images/Logos/Butterfly.png");
            case "DOGGY":
                return require("./Images/Logos/Doggy.png");
            case "SQUIRTLE":
                return require("./Images/Logos/squirtle.png");
            case "BLANK":
                console.log("Pick")
                return require("./Images/Logos/Blank.png")
            default:
                return require("./Images/Logos/Error.png")
        }
    }

    changeColour(type, value){
        switch(type){
            case 'PROFILE':
                profile_color = value;
                this.storeData(type, profile_color)
                break;
            case 'BACKGROUND':
                profile_background_color = value;
                this.storeData(type, profile_background_color)
                break;
            case 'PICTURE':
                profile_picture_background = value;
                this.storeData(type, profile_picture_background)
                break;
            case 'WILDCARD_ONE':
                wildcardColor_one = value;
                this.storeData(type, wildcardColor_one)
                break;
            case 'WILDCARD_TWO':
                wildcardColor_two = value;
                this.storeData(type, wildcardColor_two)
                break;
            case 'WILDCARD_THREE':
                wildcardColor_three = value;
                this.storeData(type, wildcardColor_three)
                break;
            default: break;
        }
        
    }

    changeVisibility_avatar(){
        this.setState({
            isVisible_avatar: !this.state.isVisible_avatar
        })
    }

    changeAvatar(value){
        this.setState({
            profileImage: this.selectAvatar(value)
        })
        this.storeData("AVATAR", value)
    }

    changeVisibility_settings(){
        this.setState({
            isVisible_settings: !this.state.isVisible_settings
        })
    }

    changeVisibility_colour(colour_type = ""){
        this.setState({
            isVisible_colour: !this.state.isVisible_colour,
            colourButton: colour_type
        })
    }

    avatar_overlay(){
        if(this.state.isVisible_avatar){
            return(
                <Modal
                    visible={this.state.isVisible_avatar}
                    transparent={true}
                    animationType={'slide'}
                >
                    <View style={[styles.profileOverlay,
                        {
                            opacity: 0.5
                        }]}>
                        </View>
                        <View style={styles.profileColours}>
                            <View style={[styles.profileSettingsTab,
                                {
                                    flex: 6,
                                }
                            ]}>
                                <View 
                                    style={{flex:1}}
                                >
                                   <Text
                                    style={styles.headerText}
                                >Select Avatar</Text> 
                                </View>
                                <View
                                    style={{flex:3, flexDirection:'row', flexWrap:'wrap'}}
                                >
                                    <TouchableOpacity
                                        style={styles.profileAvatar}
                                        onPress={() => this.changeAvatar("BLANK")}
                                    >
    
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.profileAvatar}
                                        onPress={() => this.changeAvatar("BUTTERFLY")}
                                    >
                                        <Image
                                            source={this.selectAvatar("BUTTERFLY")}
                                            style={{width: '100%', height:'100%'}}
                                        >
                                        </Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.profileAvatar}
                                        onPress={() => this.changeAvatar("DOGGY")}
                                    >
                                        <Image
                                            style={{width:'100%', height: '100%'}}
                                            source={this.selectAvatar("DOGGY")}
                                        >
    
                                        </Image>
    
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.profileAvatar}
                                        onPress={() => this.changeAvatar("SQUIRTLE")}
                                    >
                                        <Image
                                            style={{width:'100%', height:'100%'}}
                                            source={this.selectAvatar("SQUIRTLE")}
                                        >
    
                                        </Image>
    
                                    </TouchableOpacity>
                                </View>
                                
                                
                            </View>
                            <View style={[styles.profileSettingsTab,
                                {
                                    flex: 3,
                                    borderTopWidth: 1.5,
                                }
                            ]}>
                                <TouchableOpacity
                                onPress={() => this.changeVisibility_avatar()}
                                style={[styles.settingsButton,
                                {
                                    height: '50%'
                                }
                                ]}
                                >
                                    <Text style={styles.settingsText}>
                                        Close
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                </Modal>
            )
        }
    }

    colour_overlay(){
        if(this.state.isVisible_colour){
            return(
                <Modal
                    visible={this.state.isVisible_colour}
                    transparent={true}
                    animationType={'slide'}
                >
                    <View style={[styles.profileOverlay,
                    {
                        opacity: 0.5
                    }]}>
                    </View>
                    <View style={styles.profileColours}>
                        <View style={[styles.profileSettingsTab,
                            {
                                flex: 6,
                                flexDirection: 'row',
                                flexWrap: 'wrap'
                            }
                        ]}>
                        
                        {   colour_set.map((colour) => 
                            <TouchableOpacity
                                style={[styles.colourButton,
                                    {
                                        backgroundColor: colour
                                        
                                    }
                                ]}
                                onPress={() => this.changeColour(this.state.colourButton,colour)}
                            >

                            </TouchableOpacity>
                        )}
                            
                        </View>
                        <View style={[styles.profileSettingsTab,
                            {
                                flex: 4,
                                borderTopWidth: 1,
                            }
                        ]}>
                            <TouchableOpacity
                            onPress={() => this.changeVisibility_colour()}
                            style={[styles.settingsButton,
                            {
                                height: '40%'
                            }
                            ]}
                            >
                                <Text style={styles.settingsText}>
                                    Close
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>
            )

        }
    }

    overlay(){
        if(this.state.isVisible_settings){
            Animated.timing(this.state.fadeAnimSettingOverlay, {
                toValue: 0.5,
                duration: 200,
                useNativeDriver: true,
            }).start();
            return(
                <Animated.View style={[
                    styles.profileOverlay,{
                        opacity: this.state.fadeAnimSettingOverlay,
                    }
                
                ]}>
                    <Modal
                        visible={this.state.isVisible_settings}
                        transparent={true}
                        animationType={'slide'}
                    >
                        <View style={styles.profileSettings}>
                            <View style={styles.profileSettingsTab}>
                                <TouchableOpacity 
                                    style={[styles.profileSettingsPicture,
                                        {backgroundColor: profile_picture_background}
                                    ]}
                                    onPress={() => this.changeVisibility_avatar()}
                                >
                                    <Image
                                        style={{width: '100%', height: '100%'}}
                                        source={this.state.profileImage}
                                    >

                                    </Image>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.profileSettingsTab}>
                                <TouchableOpacity
                                    style={styles.settingsButton}
                                    onPress={() => this.changeVisibility_colour("BACKGROUND")}
                                >
                                    <Text
                                        style={styles.settingsText}
                                    > Background Colour</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.settingsButton,
                                        {
                                            marginTop: 2,
                                        }
                                    ]}
                                    onPress={() => this.changeVisibility_colour("PROFILE")}
                                >
                                    <Text
                                        style={styles.settingsText}
                                    > Profile Colour</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.settingsButton,
                                    {
                                        marginTop: 2,
                                    }
                                ]}
                                    onPress={() => this.changeVisibility_colour("PICTURE")}
                                >
                                    <Text
                                        style={styles.settingsText}
                                    >Picture Colour</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.profileSettingsTab}>
                                <TouchableOpacity
                                    onPress={() => this.changeVisibility_settings()}
                                    style={styles.settingsButton}
                                >
                                    <Text
                                        style={styles.settingsText}
                                    > Close</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Modal>
                </Animated.View>
            )
        }
        Animated.timing(this.state.fadeAnimSettingOverlay, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }


    render(){
        return(
            <View style={{backgroundColor: profile_background_color, flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                <View style={[styles.profileTop,{backgroundColor: profile_color}]}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={[styles.profilePictureSection, {backgroundColor: profile_color}]}>
                            <TouchableOpacity 
                                style={[styles.profilePicture,
                                    {
                                        backgroundColor: profile_picture_background
                                    }
                                ]}
                                onPress={() => this.changeVisibility_settings()}
                            >
                                <Image
                                    style={{width:'100%', height:'100%'}}
                                    source={this.state.profileImage}
                                >

                                </Image>

                            </TouchableOpacity>
                        </View>
                        <View style={styles.profileStatusSection}>
                            <TextInput 
                                style={styles.profileStatus}
                                maxLength= {100}
                                numberOfLines={4}
                                placeholder = {default_text}
                                multiline={true}
                                onChangeText={text => this.textChange("STATUS", text)}
                                defaultValue={this.getText()}
                                >
                                
                            </TextInput>
                        </View>
                    </View>
                    <View style={[styles.profileMid,
                    {
                        backgroundColor: profile_color
                    }]}>
                        <TextInput
                            style={styles.profileBio}
                            maxLength = {200}
                            numberOfLines = {5}
                            placeholder = {default_bio_text}
                            multiline = {true}
                            >
                            
                        </TextInput>
                    </View>
                    <View style={styles.profileBottom}>
                        <View style={{flex:1, backgroundColor:profile_color, borderBottomLeftRadius: border_radius, justifyContent: 'flex-end', alignItems:'center'}}>
                            <TouchableOpacity
                                style={[styles.profileWildcard,{
                                    backgroundColor: wildcardColor_one
                                }]}
                                onPress={() => this.changeVisibility_colour("WILDCARD_ONE")}
                            >

                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1, backgroundColor: profile_color, justifyContent:'flex-end', alignItems: 'center'}}>
                            <TouchableOpacity
                                style={[styles.profileWildcard,{
                                    backgroundColor: wildcardColor_two
                                }]}
                                onPress={() => this.changeVisibility_colour("WILDCARD_TWO")}
                            >

                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1, backgroundColor: profile_color, borderBottomRightRadius: border_radius, justifyContent: 'flex-end', alignItems:'center'}}>
                            <TouchableOpacity
                                style={[styles.profileWildcard,{
                                    backgroundColor: wildcardColor_three
                                }]}
                                onPress={() => this.changeVisibility_colour("WILDCARD_THREE")}
                            >

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                    {this.overlay()}
                    {this.colour_overlay()}
                    {this.avatar_overlay()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    profileSettings:{
        height: '70%',
        width: '75%',
        backgroundColor: 'white',
        borderRadius: 15,
        borderColor: border_colour,
        borderWidth: border_width,
        left: '12.5%',
        top: '10%'
    },
    profileColours:{
        height: '40%',
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 15,
        borderColor: border_colour,
        borderWidth: border_width,
        left: '7.6%',
        top: '25%',
        elevation: 2,
    },
    colourButton:{
        height: '20%',
        width: '10%',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: border_radius,
        margin: 10,
    },
    settingsButton:{
        height: '30%',
        width: '75%',
        backgroundColor: '#ff0546',
        borderRadius: 15,
        elevation: 2,
        borderWidth: 1.5,
        borderColor: border_colour,
        justifyContent:'center',
    },
    settingsText:{
        textAlign:'center',
        color: 'white',
        fontSize: 17.5
    },
    profileSettingsTab:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    profileOverlay:{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        position: 'absolute',
        
    },
    profileTop:{
        backgroundColor: profile_color,
        width: '95%',
        height: '90%',
        bottom: '2.5%',
        borderRadius: border_radius,
        borderWidth: border_width,
        borderColor: border_colour,
    },
    profileMid:{
       borderTopWidth: 1.5,
       borderColor: border_line_colour,
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
    },
    profileBottom:{
        borderTopWidth: 1.5,
        borderColor: border_line_colour,
        flex: 2,
        flexDirection: 'row'
    },
    profileAvatar:{
        backgroundColor:'#e6e6e6',
        height: '70%',
        width: '20%',
        bottom: '6%',
        borderRadius: 10,
        borderColor: border_line_colour,
        borderWidth: 0.5,
        elevation: 2,
        marginRight: 10,
    },
    profileBio:{
        height: '70%',
        width: '90%',
        backgroundColor:'white',
        borderWidth: 1,
        borderColor: border_colour,
        borderRadius: 15,
        alignItems:'flex-start',
        textAlign:'center',
        elevation: 2,
    },
    profilePictureSection:{
        backgroundColor: profile_color,
        borderTopLeftRadius: border_radius,
        alignItems:'center',
        justifyContent:'flex-end',
        flex: 1,
    },
    profilePicture:{
        backgroundColor:'black',
        height: '80%',
        width: '80%',
        bottom: '6%',
        borderRadius: 10,
    },
    profileSettingsPicture:{
        backgroundColor:'black',
        height: '80%',
        width: '50%',
        bottom: '6%',
        borderRadius: border_radius,
        elevation: 2,
    },
    profileStatusSection:{
        borderTopRightRadius: border_radius,
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    profileStatus:{
        height: '70%',
        width: '90%',
        bottom: '9%',
        backgroundColor:'white',
        borderWidth: 1,
        borderColor: border_colour,
        borderRadius: 15,
        alignItems:'flex-start',
        textAlign:'center',
        elevation: 2,
    },
    profileWildcard:{
        backgroundColor:'white',
        height: '80%',
        width: '80%',
        bottom: '6%',
        borderWidth: wildCard_border_width,
        borderColor: border_colour,
        borderRadius: 10,
        elevation: 2
    },
    headerText:{
        fontSize: 20,
        textShadowRadius: 5,
    },

});