const path=require('path') //path library used for path joins etc
const hbs=require('hbs')
const express=require('express') //express is used for setting up web pages live
const weather_app=require('../../weather_app/app.js')
//const { hasSubscribers } = require('diagnostics_channel')
const app=express() 


const directorypath=path.join(__dirname,'../')// the two .. is for moving one step back and then mving to src directory(the directory path has to be at top most)
const viewspath=path.join(__dirname,'../templates/views')
const partialsspath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs') //now view engine is changed from html to hbs
app.set('views',viewspath)// this is important because we have to tell express explicitly the location of views
hbs.registerPartials(partialsspath) 

console.log(directorypath)
app.use(express.static(directorypath))//telling the location of all web pages



app.get('',(req,resp)=>{  
        //main page
     resp.render('index',{
          title:"Weather", //these values can be dynamically used in hbs pages
          age:22,
          author:"TSV Kali prasad kandula"
     })
})
app.get('/weather',(req,resp)=>{  
     //weather page
     if(!req.query.address)
     {
          return resp.send({error:'address required'})
     }
     weather_app.getWeather(req.query.address,({data,err})=>
     {
          if(err)
          {
               return resp.send({error:err})
          }
          else{
               return resp.send({data:data})
          }
     })
})

app.get('/about',(req,resp)=>{     //about page
     resp.render('about',{
          title:"About",
          age:175,
          author:"kali"
     })
})

app.get('/help',(req,resp)=>{     //help page
     resp.render('help',{
          title:"Help",
          age:69,
          author:"kali"
     })
})

app.get('*',(req,resp)=>{     //wildcard /error  page(should be placed at last of the web page)
     resp.send('ERROR 404')
})

const port=3000
app.listen(port,()=>{  //we are making our app listen the requests coming at this port
     console.log('server is up at '+port)
})