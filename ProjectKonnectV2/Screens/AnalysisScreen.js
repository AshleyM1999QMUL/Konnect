import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, Modal, Animated} from 'react-native'
import Loading from './Load/Loading'
import {VictoryChart, VictoryGroup, VictoryBar, VictoryLegend} from 'victory-native'

const screen = Dimensions.get("screen")
const top_amount = 5;
const border_colour = '#e6e6e6';
const name_field = 1;
const data_field = 2;

var casesData =[]
var recoveredData=[]
var deathData=[]
var safestData=[]
var testingData=[]
var overlayTestingData=[]

var barData={actual:[{x: 'week1', y:50},
                    {x:'week2', y:60}]}

var continentData={
    northamerica:{
        deaths: 0,
        cases: 0,
        recovered: 0,
        population: 0,
        color: 'red'
    },
    southamerica:{
        deaths: 0,
        cases: 0,
        recovered: 0,
        population: 0,
        color: 'orange'
    },
    europe:{
        deaths: 0,
        cases: 0,
        recovered: 0,
        population: 0,
        color: 'green',
    },
    africa:{
        deaths: 0,
        cases: 0,
        recovered: 0,
        population: 0,
        color: 'purple',
    },
    asia:{
        deaths: 0,
        cases: 0,
        recovered: 0,
        population: 0,
        color:'gold'
    },
    australia_oceania:{
        deaths: 0,
        cases: 0,
        recovered: 0,
        population: 0,
        color:'grey'
    },
    
}


export default class AnalysisScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            isVisible: false,
            fadeAnimOverlay: new Animated.Value(0)

        }
    }

    getOverlayData(rankOrder=""){
        let table = []
        if(rankOrder=="reversed"){
            console.log(rankOrder)
            for(let index=top_amount-1; index>=0; index--){
                let currentRank = top_amount-index
                table.push(
                    <Text>{currentRank + ". " + overlayTestingData[index]["x"] + " : " + overlayTestingData[index]["y"]}</Text>
                )
            }
        }else{
            for(let index=0; index<top_amount; index++){
            table.push(
                <Text>{(index+1) + ". " + overlayTestingData[index]["x"] + " : " + overlayTestingData[index]["y"]}</Text>
                )
            }
        }
        
        table.push(
            <Text>{"Numerical data is in millions" }</Text>
        )
        return table
    }

    overlay(orderType=""){
        if(this.state.isVisible){
            Animated.timing(this.state.fadeAnimOverlay, {
                toValue: 0.5,
                duration: 200,
                useNativeDriver: true,
            }).start();
            return(
                <Animated.View style={[
                    styles.detailsOverlay,{
                        opacity: this.state.fadeAnimOverlay,
                    }
                
                ]}>
                    <Modal
                        visible={this.state.isVisible}
                        transparent={true}
                        animationType={'slide'}
                    >
                        <View style={styles.dataDetails}>
                            <View style={styles.dataDetailsHeader}>
                                <Text style={styles.dataDetailsHeaderText}>Testing Details</Text>
                            </View>
                            <View style={styles.dataDetailsBody}>
                                <View style={{top:'5%'}}>{this.getOverlayData(orderType)}</View>
                            </View>
                            <View style={styles.dataDetailsHeader}>
                               <TouchableOpacity style={[styles.overlayButton, {height:'100%', width:"40%", bottom: '10%'}]} onPress={() => this.changeVisibility()}>
                                   <Text style={styles.overlayButtonText}>Close</Text> 
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

    changeVisibility(){
        this.setState({
            isVisible: !this.state.isVisible,
        })
    }

    feedContinentData(continent = "", country){
        if(continent == "" || continent == undefined){
            return 
        }
        continentData[continent].deaths += country.deaths
        continentData[continent].cases += country.cases
        continentData[continent].recovered += country.recovered
        continentData[continent].population += country.population
    }

    componentDidMount(){
        this.sortData()
        this.setState({
            isLoading: false
        })
    }
    sortData(){
        let data = this.props.route.params
        console.log(data)
        let index = 0
        console.log("Start")
        this.refreshData()
        data.map((country) => {
            casesData.push([index, country.name, country.cases])
            deathData.push([index, country.name, country.deaths])
            recoveredData.push([index, country.name, country.recovered])
            testingData.push([index, country.name, country.testing])
            switch(country.continent.toLowerCase()){
                case 'north america':
                    this.feedContinentData("northamerica", country);
                    break;
                case 'south america':
                    this.feedContinentData("southamerica", country);
                    break;
                case 'europe':
                    this.feedContinentData("europe", country);
                    break;
                case 'asia':
                    this.feedContinentData("asia", country);
                    break;
                case 'africa':
                    this.feedContinentData("africa", country);
                    break;
                case 'australia/oceania':
                    this.feedContinentData("australia_oceania", country);
                    break;
                default:
                    break;
                
            }
            index += 1
        })
        casesData = casesData.sort(function(a, b) { return a[data_field] - b[data_field]; });
        deathData = deathData.sort(function(a, b) { return a[data_field] - b[data_field]});
        recoveredData = recoveredData.sort(function(a, b) {return a[data_field] - b[data_field]});
        testingData = testingData.sort(function(a, b) {return a[data_field] - b[data_field]})
        console.log(testingData)
        console.log("Done")
    }

    getHeader(text = "NONE"){
        return(
            <View style={styles.rankHeader}>
                <Text style={styles.rankHeaderText}>{text}</Text>
            </View>
        )
    }

    refreshData(){
        casesData = []
        deathData = []
        recoveredData = []
        testingData = []
        safestData = []
        overlayTestingData = []
    }

    printSingleTable(title="", type="cases", rankOrder="", headerColor="white"){
        let background_color = headerColor
        let data = undefined
        type = type.toLowerCase()
        console.log(type)
        switch(type){
            case 'cases':
                data = casesData;
                break;
            case 'deaths':
                data = deathData;
                break;
            case 'recovered':
                data = recoveredData;
                break;
            case 'testing':
                data = testingData;
                break;
            default: 
                return;
        }
        if(rankOrder == "highest"){
            data = data.reverse()
        }
        
        var table = []
        table.push(
            <View style={[styles.rankHeader,{bottom:0}]}>
                <Text style={styles.rankTableLabelText}>{title}</Text>
            </View>)
        for(let rank = 0; rank<top_amount; rank++){
            table.push(
            <View style={styles.singleTab}>
                <Text>{data[rank][name_field] + " : " + data[rank][data_field]}</Text>
            </View>)
        }
        return(
            <View>
                {table}
            </View>
            
        )
    }

    barChartData(rankOrder="highest", type="cases"){
        let table=[]
        let newData = undefined
        let offset = 0
        switch(type){
            case 'cases':
                newData = casesData;
                break;
            case 'deaths':
                newData = deathData;
                break;
            case 'recovered':
                newData = recoveredData;
                break;
            case 'testing':
                newData = testingData;
                break;
            default: 
                return;
        }
        if(rankOrder == "highest"){
            offset = testingData.length - top_amount
        }

        for(let rank=0; rank<top_amount; rank++){
            table.push(
               {x: newData[rank+offset][name_field], y: (newData[rank+offset][data_field]/10000000).toFixed(2)}
            )
        }
        overlayTestingData = table
        return <VictoryBar data={table} alignment='start' style={{data:{fill:'red'}}}/>
    }

    getData(side = "left", title="None", type = ""){
        let chosen_style = undefined
        let background_color = undefined
        let data = undefined
        type = type.toLowerCase()
        console.log(type)
        switch(type){
            case 'cases':
                data = casesData;
                break;
            case 'deaths':
                data = deathData;
                break;
            case 'recovered':
                data = recoveredData;
                break;
            case 'testing':
                console.log("testing")
                data = testingData;
                break;
            default: 
                return;
        }
        if(side == "left"){
            chosen_style = styles.rankTabLeft
            background_color = 'green'
        }else{
            chosen_style = styles.rankTabRight
            background_color = 'red'
            data = data.reverse()
        }
        
        var table = []
        table.push(
            <View style={[chosen_style, {marginTop: '4%',marginBottom: '2.0%', height: '10%', backgroundColor: background_color, borderWidth: 2.0}]}>
                <Text style={styles.rankTableLabelText}>{title}</Text>
            </View>)
        for(let rank = 0; rank<top_amount; rank++){
            table.push(
            <View style={[chosen_style, {marginTop: '5%'}]}>
                <Text>{data[rank][name_field] + " : " + data[rank][data_field]}</Text>
            </View>)
        }
        return(
            <View>
                {table}
            </View>
            
        )
    }

    render(){
        if(this.state.isLoading){
            return(
                <Loading/>
            )
        }else{
            return(
                <View style={styles.mainLayout}>
                    <ScrollView horizontal
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={true}
                    >
                        <View style={[styles.rankScreen, {backgroundColor:'#edc84c'}]}>
                            <View style={styles.rankHeaderArea}>
                                {this.getHeader("Top Cases")}
                            </View>
                            <View style={styles.rankBodyArea}>
                                <View style={[styles.rankTable, {alignItems:'flex-end'}]}>
                                    {this.getData("left", "Best", "CASES")}
                                </View>
                                <View style={[styles.rankTable, {alignItems:'flex-start'}]}>
                                    {this.getData("right", "Worst", "CASES")}
                                </View>
                            </View>
                        </View>
                        <View style={[styles.rankScreen, {backgroundColor:'#ed4c4c'}]}>
                            <View style={styles.rankHeaderArea}>
                                {this.getHeader("Top Deaths")}
                            </View>
                            <View style={styles.rankBodyArea}>
                            <View style={[styles.rankTable, {alignItems:'flex-end'}]}>
                                    {this.getData("left", "Best", "DEATHS")}
                                </View>
                                <View style={[styles.rankTable, {alignItems:'flex-start'}]}>
                                    {this.getData("right", "Worst", "DEATHS")}
                                </View>
                            </View>
                        </View>
                        <View style={[styles.rankScreen, {backgroundColor:'#70d654'}]}>
                            <View style={styles.rankHeaderArea}>
                                {this.getHeader("Top Recovered")}
                            </View>
                            <View style={styles.rankBodyArea}>
                            <View style={[styles.rankTable, {alignItems:'flex-end'}]}>
                                    {this.getData("left", "Best", "RECOVERED")}
                                </View>
                                <View style={[styles.rankTable, {alignItems:'flex-start'}]}>
                                    {this.getData("right", "Worst", "RECOVERED")}
                                </View>
        
                            </View>
                        </View>
                        <View style={[styles.rankScreen, {backgroundColor:'#0384fc'}]}>
                            <View style={styles.rankHeaderArea}>
                                {this.getHeader("Continent Data")}
                            </View>
                            <View style={styles.rankBodyArea}>
                                <View style={styles.globeArea}>
                                    <TouchableOpacity style={{backgroundColor:'lightblue', height: '95%', width: '92.5%', borderRadius:10}}
                                        onPress={() => this.props.navigation.navigate("Continents", continentData)}
                                    >
                                        <Image source={require("./Images/Logos/continents.jpg")}
                                            style={{height:'100%', width:'100%', borderRadius: 20, borderWidth: 1.5}}
                                            resizeMode={'stretch'}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.rankScreen, {backgroundColor:'#5e52ba'}]}>
                            <View style={styles.rankHeaderArea}>
                                {this.getHeader("Most Tested Countries")}
                            </View>
                            <View style={[styles.rankBodyArea, {flexDirection:'column'}]}>
                                <View>
                                    <View style={[styles.globeArea, {width:screen.width/1.1, borderColor:'red', borderWidth:1.5}]}>
                                        <VictoryChart width={screen.width/1.1}>
                                            <VictoryGroup>
                                                {this.barChartData("highest", "testing")}
                                            </VictoryGroup>
                                        </VictoryChart>
                                    </View>
                                </View>
                                <TouchableOpacity style={{position:'absolute', bottom:'10%', height:'10%', width:'40%', backgroundColor:'white', borderRadius:15, elevation: 10, borderWidth:1.5, borderColor: border_colour, alignItems:'center', justifyContent:'center'}}
                                    onPress={() => this.changeVisibility()}
                                >
                                    <Text>Press here for details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                    {this.overlay("reversed")}
                </View>
                )
        }
        
    }
}

const styles = StyleSheet.create({
    mainLayout:{
        flex: 1,
        backgroundColor: "#e6e6ff"
    },
    rankScreen:{
        width: screen.width,
        height: '100%'
    },
    rankHeaderArea:{
       flex: 1,
       width: screen.width,
       alignItems:'center',
       justifyContent:'flex-end',
       backgroundColor: '#472d57',
       borderBottomWidth: 5,
       borderColor: 'white'
    },
    rankBodyArea:{
        flex: 4,
        width: screen.width,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

    },
    rankTable:{
        flex: 1,
        height: '100%',
    },
    rankEndArea:{
        flex: 1,
        width: screen.width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rankHeader:{
        height: '30%',
        width: '40%',
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#e0e6e6',
        borderWidth: 1,
        shadowOffset: {width: 4, height: 5},
        shadowRadius: 4,
        elevation: 3,
        marginRight: 10,
        alignItems: 'center',
        justifyContent:'center',
        bottom: '30%'
      },
      rankHeaderText:{
          fontSize: 15
      },
      rankTableLabelText:{
          fontSize: 20,
          color:'white',
          fontWeight: 'bold'
      },
      rankTabRight:{
          height: '15%',
          width: screen.width/2.5,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: 10,
          borderWidth: 1.5,
          borderColor: border_colour,
          left: '5%',
          elevation: 5,
      },
      rankTabLeft:{
        height: '15%',
        width: screen.width/2.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: border_colour,
        right: '5%',
        elevation: 5,
    },
    globeArea:{
        height: '80%',
        width: screen.width/1.2,
        backgroundColor: 'white',
        borderRadius: 15,
        elevation: 5,
        borderColor: border_colour,
        alignItems: 'center',
        justifyContent: 'center'
    },
    singleTab:{
        width: screen.width/3.0,
        height: '10%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        elevation: 5,
        borderWidth:1.5,
        borderColor:border_colour,
        marginTop: '5%',
        backgroundColor:'white'
    },
    detailsOverlay:{
        position: 'absolute',
        backgroundColor:'black',
        width: '100%',
        height:'100%',
    },
    dataDetails:{
        height: '30%',
        width:'80%',
        backgroundColor:'white',
        left:'10%',
        top:'45%',
        borderRadius: 20,
        borderColor: border_colour,
        borderWidth: 3,
        elevation: 10,
    },
    dataDetailsHeader:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dataDetailsHeaderText:{
        fontSize: 20,
        fontWeight: 'bold'
    },  
    dataDetailsBody:{
        flex:4,
        borderTopWidth: 1,
        alignItems:'center'
    },
    dataDetailsBodyTab:{
        flex: 1,
    },
    overlayButton:{
        height: '30%',
        width: '75%',
        backgroundColor: '#ff0546',
        borderRadius: 15,
        elevation: 2,
        borderWidth: 1.5,
        borderColor: border_colour,
        justifyContent:'center',
    },
    overlayButtonText:{
        textAlign:'center',
        color: 'white',
        fontSize: 17.5
    },


})