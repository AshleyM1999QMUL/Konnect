import React from 'react'
import {WebView} from 'react-native-webview'

export default function WebBox({sourceURL, webStyle}){
    return(
        <WebView
            source={{uri: sourceURL}}
        />
    )
}
