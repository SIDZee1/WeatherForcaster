const request = require('request')

const forecast = ( latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=27ec775486ae958a06927f70c12a3cdc&query='+latitude + ',' +longitude+'&unit=m'

    request({url, json:true },(error, response)=>{
        if(error){
            callback('unable to connect to weather service' , undefined)
        } else if(response.body.error){
            callback('location not found', undefined)
        } else{
            callback(undefined, 'It is currently '+ response.body.current.temperature + ' degree out . It feels like '+ response.body.current.feelslike +' degree out' + ' with visiblity '+response.body.current.visibility )
        }

    })
}


module.exports = forecast