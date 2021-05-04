import React from 'react';
import {View, Text} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';

export default function PieData({
    percentage = 75,
    radius = 40,
    strokeWidth = 10,
    duration = 500,
    color = 'white',
    delay = 0,
    textColor,
    max=100,

}){
    const halfCircle= radius * strokeWidth;
    return(
        <View style={{backgroundColor: 'blue', alignItems:'center'}}>
            <Svg width={radius*5} height={radius * 5}>
                <G>
                    <Circle
                        cx='50%'
                        cy='50%'
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        strokeOpacity={0.5}
                        fill="transparent"
                    />
                    <Circle
                        cx='50%'
                        cy='50%'
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                    />
                </G>
            </Svg>
        </View>
    );
}