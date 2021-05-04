import React,{Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Modal, Animated, Image} from 'react-native'
import Map from './Map'

const border_colour = '#e6e6e6';
var total ={
    population: 0,
    cases: 0,
    deaths: 0,
    recovered: 0
}
var continent_names = ['northamerica', 'southamerica', 'europe', 'asia', 'africa', 'australia_oceania']
var continent_data = {}
var decimal_place = 2;

export default class ContinentScreen extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    clearData(){
        total ={
            population: 0,
            cases: 0,
            deaths: 0,
            recovered: 0
        }
        continent_data={}
    }
    setPopulation(continents){
        continent_names.map((continentName) => {
            total.population += continents[continentName].population
            total.cases += continents[continentName].cases
            total.deaths += continents[continentName].deaths
            total.recovered += continents[continentName].recovered
        })
    }

    getPercentage(number, type ){
        return ((number*100)/total[type]).toFixed(decimal_place);
    }

    continentDataTemplate(marginTopValue = 0.0, type='cases'){
        continent_data = this.props.route.params
        return(
            <View style={[styles.mapArea, {backgroundColor:'white', borderWidth:1.5, borderColor: border_colour, marginTop: marginTopValue}]}>
                <View style={[styles.mapArea, {height: '95%', width:'99%', elevation: 5, flexDirection: 'row'}]}>
                    <View style={styles.continentTab}>
                        <Text style={[styles.continentText, {color: continent_data['northamerica'].color}]}>North America</Text>
                        <Text style={{marginTop: '50%', color: continent_data['northamerica'].color,  fontWeight:'bold'}}>
                            {this.getPercentage(continent_data['northamerica'][type], type) + "%"}</Text>
                    </View>
                    <View style={styles.continentTab}>
                        <Text style={[styles.continentText, {color: continent_data['southamerica'].color}]}>South America</Text>
                        <Text style={{marginTop: '50%', color: continent_data['southamerica'].color,  fontWeight:'bold'}}>
                            {this.getPercentage(continent_data['southamerica'][type], type) + "%"}</Text>
                    </View>
                    <View style={styles.continentTab}>
                    <Text style={[styles.continentText, {color: continent_data['europe'].color}]}>Europe</Text>
                        <Text style={{marginTop: '50%', color: continent_data['europe'].color, fontWeight:'bold'}}>
                            {this.getPercentage(continent_data['europe'][type], type) + "%"}</Text>
                    </View>
                    <View style={styles.continentTab}>
                    <Text style={[styles.continentText, {color: continent_data['africa'].color}]}>Africa</Text>
                        <Text style={{marginTop: '50%', color: continent_data['africa'].color,  fontWeight:'bold'}}>
                            {this.getPercentage(continent_data['africa'][type], type) + "%"}</Text>
                    </View>
                    <View style={styles.continentTab}>
                    <Text style={[styles.continentText, {color: continent_data['asia'].color}]}>Asia</Text>
                        <Text style={{marginTop: '50%', color: continent_data['asia'].color,  fontWeight:'bold'}}>
                            {this.getPercentage(continent_data['asia'][type], type) + "%"}</Text>
                    </View>
                    <View style={styles.continentTab}>
                    <Text style={[styles.continentText, {color: continent_data['australia_oceania'].color}]}>Oceania</Text>
                        <Text style={{marginTop: '50%', color: continent_data['australia_oceania'].color, fontWeight:'bold'}}>
                            {this.getPercentage(continent_data['australia_oceania'][type], type) + "%"}</Text>
                    </View>
                </View>
            </View>
        )
    }
    
    getHeader(text){
        return(
            <View style={styles.typeHeader}>
                <Text style={styles.headerText}>{text}</Text>
            </View>
        )
    }

    clearData(){
        total ={
            population: 0,
            cases: 0,
            deaths: 0,
            recovered: 0
        }
        continent_data={}
    }

    render(){
        this.clearData();
        this.setPopulation(this.props.route.params)
        return(
            <View style={styles.mainLayout}>
                <View style={styles.banner}><Text style={styles.bannerText}>Continental Percentages</Text></View>
                {this.getHeader("Cases")}
                {this.continentDataTemplate(10, )}
                {this.getHeader("Deaths")}
                {this.continentDataTemplate(10, "deaths")}
                {this.getHeader("Recovered")}
                {this.continentDataTemplate(10, "recovered")}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainLayout:{
        flex:1,
        width: '100%',
        backgroundColor: '#0384fc',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapArea:{
        height: '20%',
        width: '95%',
        elevation: 10,
        borderRadius: 15,
        backgroundColor: '#151b2b',
        alignItems:'center',
        justifyContent:'center'
    },
    continentText:{
        fontSize: 14,
        fontWeight: 'bold',
        textAlign:'center',
        color: 'white'
    },
    continentTab:{
        borderRightWidth:1.5,
        borderRightColor: 'white',
        flex: 1,
        height: '100%',
        alignItems: 'center',
    },
    typeHeader:{
        borderRadius: 15,
        height: '5%',
        width: '30%',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: '2.5%'
    },
    headerText:{
        fontSize:17,
        fontWeight: 'bold'
    },
    banner:{
        position: 'absolute',
        height: '8%',
        width: '100%',
        backgroundColor:'#4c1e8f',
        top: 0,
        justifyContent:'center',
        alignItems:'center',
    },
    bannerText:{
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
    
})