import { StatusBar } from 'expo-status-bar';
import React, {Component, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Picker, Dimensions, ScrollView } from 'react-native';
import InfoBox from './Data/InfoBox.js';
import Map from './Map.js';

const screen = Dimensions.get('screen');
const default_color="red";
const button_color="#f2f2f2";
const colorBackground="#e6e6ff";
var criticalAverage = 0;
var testAverage = 0;
var safetyColor = '#367371'

function getRatio(total, portion){
  return ((portion/total)*100).toFixed(2);
}

function getStatusColour(value){
  let criticalIndicator = value * 2.30;
  return 'rgba(' + (230-criticalIndicator) + ',' + (criticalIndicator) + ',0.0,1.0)'
}

function getSafetyDescription(advantages, disadvantages){
  let text = "";
  if(advantages != ""){
    text += "ADVANTAGES: \n" + advantages + "\n\n";
  }
  if(disadvantages != ""){
    text += "DISADVANTAGES: \n" + disadvantages;
    return text;
  }
  if(text == ""){
    return "neutral country."
  }
  return text
}


export default class CovidMapScreen extends Component{

  constructor(props){
    super(props);
    this.state={
      locationLabel: 'WorldWide',
      countries: [],
      locationData: this.initialise(),
      selectedCountryName: null,
      location: {
        lat: 51.562825,
        long: -0.255501
      },
      locationStats:{
        todayCases: 0,
        totalCases: 0,
        todayRecovered: 0,
        totalRecovered: 0,
        todayDeaths: 0,
        totalDeaths: 0,
        totalPopulation: 0,
      },
      countryList: [],
    };
  }

  initialise = async() =>{
    let link = "https://disease.sh/v3/covid-19/all";
    await fetch(link)
    .then((response) => response.json())
    .then((data) => {
      this.setState({locationData: data});
      
    });
  }

  getSafety(country){
    if(this.state.locationLabel == "WorldWide"){
      return(
        <TouchableOpacity onPress={() => alert("Select a country first")}>
              <InfoBox title="Safety" description="Press for data analysis" color='white' background_colour={safetyColor}/>
        </TouchableOpacity>
      )
    }

    let safety = 0;
    console.log(country);
    console.log(criticalAverage);
    let safetyAdvantages = "";
    let safetyDisadvantages = "";
    if((country.cases/country.population) < 0.1){
      safety += 1;
      safetyAdvantages += "+ Low amount of cases against population\n"
    }else{
      safetyDisadvantages += "- High amount of cases against population\n"
    }
    if((country.critical/country.deaths)<0.2){
      safety += 1;
      safetyAdvantages += "+ Insignificant amount of critical cases\n"
    }else{
      safetyDisadvantages += "Critical cases rising against deaths\n"
    }
    if((country.deaths/country.recovered) < 0.05){
      safety+=1 
    }else{
      safetyDisadvantages += "- High deaths and low recovered\n"
    }
    if((country.tests/country.population) > 0.5){
      safety+=1
    }else{
      safetyDisadvantages = "- Lack of tests for the population\n"
    }
    if((country.tests/country.population) > 0.75){
      safety+=1
      safetyAdvantages += "+ Most of the population are being tested\n"
    }
    if(country.criticalPerOneMillion < criticalAverage){
      safety += 1
    }
    if(country.testsPerOneMillion < testAverage){
      safety -= 1
      safetyDisadvantages += "- Testing amount is below average\n"
    }
    if(getRatio(country.cases, country.recovered) < 60){
      safety-=1
    }else{
      safety+=1
    }
    safety = (safety < 1) ? 1 : safety

    if(safety < 2){
      safetyColor = 'red'
    }else if(safety >= 2 && safety <= 3){
      safetyColor = 'orange'
    }else if(safety >= 4 && safety <= 5){
      safetyColor = 'gold'
    }else if(safety == 6){
      safetyColor = '#55b56d'
    }else{
      safetyColor = 'green'
    }


    return(
      <TouchableOpacity onPress={() => alert("1-2 Unsafe\n3-5 okay\n6-7 safe\n\n" + getSafetyDescription(safetyAdvantages, safetyDisadvantages))}>
            <InfoBox title={"Safety Level: " + safety} description="Press for data analysis" color='white' background_colour={safetyColor}/>
      </TouchableOpacity>
    )

  }

  charts(){
    if(this.state.locationLabel == "WorldWide"){
      alert("Select a country first")
    }else{
      this.props.navigation.navigate("Covid Charts",
                  {
                    country: this.state.locationLabel
                  }
                )
    }
  }

  Show= async (value)=>
  {
    this.setState({locationLabel:value});
    if(value==='Local'){
      this.setState({
        location: {
          lat: 51.562825,
          long: -0.255501,
        }
      });
      return
    }
    let link  
    if(this.state.locationLabel==='Worldwide'){
      link = "https://disease.sh/v3/covid-19/all";
    }else{
      link = "https://disease.sh/v3/covid-19/countries/" + value;
    }
    await fetch(link)
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        locationData: data,
        location:{
          lat: data.countryInfo.lat,
          long: data.countryInfo.long
        },
        locationStats:{
          todayCases: data.todayCases,
          cases: data.cases,
          todayRecovered: data.todayRecovered,
          recovered: data.recovered,
          todayDeaths: data.todayDeaths,
          deaths: data.deaths,
          totalPopulation: data.population,
        }
      });
      console.log(data)
    });
  }

  componentDidMount(){
    this.apiCall();
  }

  async apiCall(){
    let resp = await fetch("https://disease.sh/v3/covid-19/countries")
    .then((response) => response.json())
    .then((data) => {
      const countriesInfo = data.map((country) => (
        criticalAverage += country.criticalPerOneMillion,
        testAverage += country.testsPerOneMillion,
        {
        name: country.country,
        value: country.countryInfo.iso2,
        //
        deathsToday: country.todayDeaths,
        casesToday: country.todayCases,
        recoveredToday: country.todayRecovered,
        deaths: country.deaths,
        recovered: country.recovered,
        cases: country.cases,
        population: country.population,
        continent: country.continent,
        testing: country.tests,
        
      }));
      this.setState({countries: countriesInfo});
      this.state.countryList = data;
    }
    );
    criticalAverage = criticalAverage/193
    testAverage = testAverage/193
  }
  
  
  
  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.dropdownArea}>
            <Picker
              selectedValue={this.state.locationLabel}
              onValueChange={this.Show.bind()}
            >
              <Picker.Item label="Select a Category" value={null} color={default_color}></Picker.Item>
              <Picker.Item label="Worldwide" value="Worldwide"></Picker.Item>
              <Picker.Item label="Local" value="Local"></Picker.Item>
              {this.state.countries.map((country) =>
              <Picker.Item label={country.name} value={country.name}></Picker.Item>)}
            </Picker>
          </View>
          <ScrollView>
            <View>
              <InfoBox title="Coronavirus Cases" cases={this.state.locationData.todayCases} total={this.state.locationData.cases} color='orange' description={'total'}/>

              <InfoBox title="Recovered" cases={this.state.locationData.todayRecovered} total={this.state.locationData.recovered} color='green' description={'total'}/>
              
              <InfoBox title="Deaths" cases={this.state.locationData.todayDeaths} total={this.state.locationData.deaths} color='red' description={'total'} />
            </View>
            <View>
              <InfoBox title="Recovered / Cases" 
                cases={getRatio(this.state.locationData.cases, this.state.locationData.recovered)} 
                color={getStatusColour(getRatio(this.state.locationData.cases, this.state.locationData.recovered))}
                description="Higher is better"
                textColor={getStatusColour(getRatio(this.state.locationData.cases, this.state.locationData.recovered))}/>
            </View>
            {this.getSafety(this.state.locationData)}
            <View>
              <TouchableOpacity
                onPress={() => this.charts()}
              >
                <InfoBox title="Charts" description="Open for the charts"
                  />
                </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Analysis", this.state.countries)}>
                <InfoBox title="Analysis" description="Press for data analysis" color='white' background_colour='black'/>
              </TouchableOpacity>
            </View>
          </ScrollView>  
            <View style={styles.mapArea}>
              <TouchableOpacity style={styles.mapButton}
              onPress={() => this.props.navigation.navigate("Covid Map", 
              {
                locationInfo: this.state.location,
                locationStats: this.state.locationStats,
                countries: this.state.countryList
                })}>
                <Map 
                locationInfo={this.state.location}
                locationStats={this.state.locationStats}
                countries={this.state.countryList}
                dataType="Deaths"/>
              </TouchableOpacity> 
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
    backgroundColor: colorBackground,
    alignItems: 'center'
  },
  mapButton:{
    height: '100%',
    width: '99%',
    backgroundColor: 'red',
    borderRadius: 10,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 4,
  },
  mapArea:{
    marginVertical: 10,
    height: '20%',
    width: '80%',
    backgroundColor: 'red',
    borderRadius: 10,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 4,
    elevation: 3,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownArea: {
    width: '100%',
    height: '7.5%',
    backgroundColor: button_color,
    borderColor: '#e6e6e6',
    borderBottomWidth: 2,
    left: 0,
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
