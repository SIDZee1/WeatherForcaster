const request = require('request')

const forecast = ( latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=27ec775486ae958a06927f70c12a3cdc&query='+latitude + ',' +longitude+'&unit=m'

    request({url, json:true },(error, response)=>{
        if(error){
            callback('unable to connect to weather service' , undefined)
        } else if(response.body.error){
            callback('location not found', undefined)
        } else{
            callback(undefined, {
                temperature:response.body.current.temperature+ ' °C' ,
                windspeed:'Wind Speed: '+response.body.current.wind_speed+ ' km/hr',
                humidity:'Humidity: '+response.body.current.humidity,
                description:response.body.current.weather_descriptions[0]

            })
            
        }

    })
}
module.exports = forecast