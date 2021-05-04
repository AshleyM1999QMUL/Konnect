import React, {Component, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Picker, Dimensions, ScrollView, Touchable } from 'react-native';
import LineGraph from './Data/LineGraph';
import InfoBox from './Data/InfoBox.js';
import Map from './Map.js';

const screen = Dimensions.get('screen');
const default_color="red";
const button_color="#f2f2f2";
const colorBackground="#ffbb33";

const cases_colour = '#ffbb33';
const recovered_colour = '#2eb82e';
const deaths_colour = '#ff3333';

let url = '';


export default class CovidCharts extends Component{

    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            chartData:{
                confirmed: 0,
                recovered: 0,
                deaths: 0,

            },
            chartHeight: 0,
            chartWidth: 0,
        }
    }
    componentDidMount(){
        this.getChartData();
    }

    getChartData = async() =>{
        this.setURL();
        await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const information = data.map((covidInfo) =>({
                confirmed: covidInfo.Confirmed,
                recovered: covidInfo.Recovered,
                deaths: covidInfo.Deaths
            }))
            console.log(url)
            this.setState({
                chartData: information
            })
        });
        this.setState({
            isLoading:false
        })
    }

    setLayout = ({nativeEvent}) =>{
        this.setState({
            width: nativeEvent.layout.width,
            height: nativeEvent.layout.height
        })
    };

    setURL = () =>{
        url = 'https://api.covid19api.com/country/' + this.props.route.params.country + '?from=2021-02-01T00:00:00Z&to=2021-02-05T00:00:00Z';
        
    }
  
    
  render() {
    const input = this.props.route.params;
    return (
      <View style={styles.mainView}>
          <ScrollView 
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}
          >
          <View style={{backgroundColor: cases_colour}}>
            <View style={styles.startView}>
              <View style={styles.appButton}>
                  <Text style={styles.textStyle}>{input.country}</Text>
              </View>
              <View style={styles.appButton}>
                  <Text style={styles.textStyle}>Cases</Text>
              </View>
            </View>       
            <View style={styles.midView}>
                  <View style={styles.chartArea}>
                      <View style={styles.chartData} onLayout={this.setLayout}>
                          <LineGraph
                              height={this.state.height}
                              width={this.state.width}
                              information={this.state.chartData}
                              type='CASES'
                          />
                      </View>
                  </View>
            </View>
            <View style={styles.endView}>
              <TouchableOpacity style={styles.appButton}
              onPress={() => this.props.navigation.navigate("Chart", 
              {
                information: this.state.chartData,
                type: 'CASES'
              }
              )}
              >
                  <Text style={styles.textStyle}> Expand </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{backgroundColor: deaths_colour}}>
            <View style={styles.startView}>
              <View style={styles.appButton}>
                  <Text style={styles.textStyle}>{input.country}</Text>
              </View>
              <View style={styles.appButton}>
                  <Text style={styles.textStyle}>Deaths</Text>
              </View>
            </View>       
            <View style={styles.midView}>
                  <View style={styles.chartArea}>
                      <View style={styles.chartData} onLayout={this.setLayout}>
                          <LineGraph
                              height={this.state.height}
                              width={this.state.width}
                              information={this.state.chartData}
                              type='DEATHS'
                          />
                      </View>
                  </View>
            </View>
            <View style={styles.endView}>
              <TouchableOpacity style={styles.appButton}
              onPress={() => this.props.navigation.navigate("Chart",
              {
                information: this.state.chartData,
                type: 'DEATHS'
              }
              )}
              >
                  <Text style={styles.textStyle}> Expand </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{backgroundColor: recovered_colour}}>
            <View style={styles.startView}>
              <View style={styles.appButton}>
                  <Text style={styles.textStyle}>{input.country}</Text>
              </View>
              <View style={styles.appButton}>
                  <Text style={styles.textStyle}>Recovered</Text>
              </View>
            </View>       
            <View style={styles.midView}>
                  <View style={styles.chartArea}>
                      <View style={styles.chartData} onLayout={this.setLayout}>
                          <LineGraph
                              height={this.state.height}
                              width={this.state.width}
                              information={this.state.chartData}
                              type='RECOVERED'
                          />
                      </View>
                  </View>
            </View>
            <View style={styles.endView}>
              <TouchableOpacity style={styles.appButton}
              onPress={() => this.props.navigation.navigate("Chart",
              {
                information: this.state.chartData,
                type: 'RECOVERED'
              }
              )}>
                  <Text style={styles.textStyle}> Expand </Text>
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView:{
    flex:1,
    width: '100%',
  },
  startView:{
      flex:1,
      width: screen.width,
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'center',
  },
  midView:{
      flex: 2,
      width: screen.width,
      justifyContent: 'center',
      alignItems:'center',
  },
  endView:{
    flex: 1,
    width: screen.width,
    alignItems:'center',
  },
  appButton:{
    height: '25%',
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
  },
  textStyle:{
    top: '25%'
  },   
  chartArea:{
    height: '80%',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e6e6',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 4,
    elevation: 3,
  },
  chartData:{
    flex:1,
    backgroundColor: colorBackground,
    borderRadius: 15,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 4,
    elevation: 0,
    margin: '2.5%',
  },
});
