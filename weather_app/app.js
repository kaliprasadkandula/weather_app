
const request=require('request')

const getCoordinatesURL=(city,callback)=>{
   
    const url2=`http://api.positionstack.com/v1/forward?access_key=33725ef1cf5b852de81187f5d7477f84&limit=1&query=`+encodeURIComponent(city)+`&limit=1` //521001%20machilipatnam%20india
    callback(url2)
}


const getCoordinates=(url2,callback)=>{
 var dum1,dum2
    request({url:url2,json:true},(error,response)=>{ //fetching cordinates(forward geocoding)
      
        if(error)
      {
        
        callback(dum1,dum2,`unable to fetch coordinates right now due to network error :(    please try again later!!!`)
      }
      else if(response.body.error||response.body.data.length==0)
      {
       callback(dum1,dum2,`unable to fetch weather right now due to invalid query :(    please check again!!!`)
      }
      else{
        const rb=response.body
        const latitude=rb.data[0].latitude//data is an array of json objects
        const longitude=rb.data[0].longitude
        const cordinates=`Your coordinates are : latitude=`+latitude+` and longitude `+longitude
       // console.log(cordinates)
        callback(latitude,longitude,undefined)
      }
    })
}


const getWeatherURL=(latitude,longitude,err,callback)=>{
    if(err)
    {
      
      callback('',err)
      
    }
    else{
    const url1=`http://api.weatherstack.com/current?access_key=9d2fa074a44405f05c2cfe0384ff7b13&query=`+encodeURIComponent(latitude)+`,`+encodeURIComponent(longitude)  //Machilipatnam
    //encodeURIComponent() //this function really helps youn to form an URL and avoid errrors
    
    
    callback(url1,undefined)
    }
}
   
//note see my current subscription doesnt allow ssl request that is https so we are using http
const getWeatherRecord=(url1,err,callback)=>{
  if(err)
  {
    callback('',err)
  }
  else{
  request({url:url1,json:true},(error,response)=>{/*by making json true we are telling that we get a response that is already parsed as json object*/
   //const data=JSON.parse(response.body) //other than making json true you can get also raw response
  // console.log(response.body.current)
  if(error)//this handles low level errors only
  {
    callback(`unable to fetch weather right now due to network error:(    please try again later!!!`,err)
  }
  else if(response.body.error)
  {
    callback(`unable to fetch weather right now due to invalid query :(    please check again!!!`,err)
  }
  else{
    const rb=response.body
    const location=rb.location.name
    const time=rb.current.observation_time
    const temperature=rb.current.temperature
    const feelslike=rb.current.feelslike
    const description=rb.current.weather_descriptions[0]    
    const weather=description+`.In `+location+` at `+time+` the temparature is `+temperature+` degrees but feels like `+feelslike+` degrees`
    //console.log(weather)
    callback(weather,err)
  }
})}}



const getWeather=(city,callback)=>{
       
       getCoordinatesURL(city,(cURL)=>{
                    getCoordinates(cURL,(latitude,longitude,err)=>{
                         getWeatherURL(latitude,longitude,err,(wURL,err)=>{
                            getWeatherRecord(wURL,err,(data,err)=>callback({data,err}))
                            
                           
                         })
                         
                    })
                    
       })
       
}     
        

module.exports={
    getWeather:getWeather
}




/*


const rb=response.body
const location=rb.location.name
const time=rb.current.observation_time
const temparature=rb.current.temperature
const feelslike=rb.current.feelslike
`In `+location+`at `+time+`the temparature is `+temperature+` but feels like `+feelslike
*/

//latitude= 16.177748
//longitude=81.12854