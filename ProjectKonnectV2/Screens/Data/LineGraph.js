import React from 'react';
import {View, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const minimumDataSize = 7;
var backgroundColor = "#ffc34d";
var dotColour = 'black';

function getData(data, type='CASES'){
        let array = new Array();
        try{
            switch(type){
                case 'CASES':
                    data.map((covidData) => {
                        array.push(covidData.confirmed)
                    })
                    backgroundColor = "#ffb31a";
                    break;
                case 'RECOVERED':
                    data.map((covidData) => {
                        array.push(covidData.recovered)
                    })
                    backgroundColor = "#33cc33"
                    break;
                case 'DEATHS':
                    data.map((covidData) => {
                        array.push(covidData.deaths)
                    })
                    backgroundColor = "#ff4d4d"
                    break;
            }
        }catch(error){
            backgroundColor = "#e6e6e6"
            return [0]
        }
        return array;
}

export default function LineGraph({country, type, information={}, height = 300, width = 300}){
    let covidData = getData(information, type)

    return(
            <LineChart
                data={{
                    labels: ["January", "February"],
                    datasets: [
                    {
                        data: covidData
                    }
                    ]
                }}
                width={width} // from react-native
                height={height}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: backgroundColor,
                    backgroundGradientTo: backgroundColor,
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                    borderRadius: 16
                    },
                    propsForDots: {
                    r: "4",
                    strokeWidth: "2",
                    stroke: dotColour
                    }
                }}
                bezier
                style={{
                    borderRadius: 16
                }}
            />
    );

}
