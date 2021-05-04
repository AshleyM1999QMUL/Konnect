import React, {Component} from 'react'
export const news_url = 'http://newsapi.org/v2/everything'
export const q_code = 'COVID'
let date = (new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + (new Date().getDate()))
export var from = date
export var to = date
export var sortBy='popularity'
export var country_code = 'UK'
export var category = 'coronavirus'
export var API_key = 'f1b1aced0bf8401ca997d47ae4b55f5f'

export default class NewsData extends Component{
    setCategory(categoryValue){
        if(categoryValue == null){
            category = "coronavirus"
        }else{
            category = categoryValue
        }
    }

}