const request=require('request')

const forecast=(latitude,longitude,callback)=> { 

    const url = 'https://api.darksky.net/forecast/b3850b23affd8622a1753d4757320e12/'+ latitude+','+longitude+'?units=si'

    request({url,json:true},(error,{body})=>{ 
if(error){
    callback('Unable to connect to weather app',undefined)
}
else if(body.error){ 
callback('unable to find location',undefined)
}
else { 
    callback(undefined,body.daily.data[0].summary +' High today is '+body.daily.data[0].temperatureHigh+' with the low of '+ body.daily.data[0].temperatureLow+'. It is currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+'% chance of rain.')
}
})
}
module.exports=forecast

