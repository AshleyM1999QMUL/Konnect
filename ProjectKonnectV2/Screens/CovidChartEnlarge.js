import React, {Component} from 'react'
import LineGraph from './Data/LineGraph'
import {View, Dimensions} from 'react-native'

export default class CovidChartEnlarge extends Component{

    render(){
        const styleData = this.props.route.params
        const window = Dimensions.get('window')
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <LineGraph
                    type={styleData.type}
                    width={window.width * 0.9}
                    height={window.height * 0.8}
                    information={styleData.information}
                />
            </View>

        )
    }
}