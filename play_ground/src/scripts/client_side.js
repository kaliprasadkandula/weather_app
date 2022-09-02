
console.log('zu zuyyy client side js file is loaded')

const city=document.getElementsByClassName('city')[0]
const form=document.getElementsByClassName('search')[0]
const weather_data=document.getElementsByClassName('weather_data')[0]
form.addEventListener('submit',(event)=> //see here the submit is given in string form
{
   
    event.preventDefault()
    console.log(city.value)
    fetch('/weather?address='+city.value).then((response)=>{ 
        response.json().then((output)=>{ //note this line
            if(output.error)
            {
                weather_data.innerHTML=output.error
            }
            else if(output.data){
                weather_data.innerHTML='at '+city.value+" "+output.data
            }
        })
    })
})