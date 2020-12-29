const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=c40c94ea05e5f6f99b737653ccf78600&query='+latitude+','+longitude
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to Weather Service!',undefined)
        }
        else if(body.error){
            callback('Unable to find location!',undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out. The current humidity is '+body.current.humidity+'%.')
        }
    })
}

module.exports = forecast