
const app=require('./app.js')
const yargs=require('yargs') //this is type of import is working
const chalk=require('chalk')//use chalk version 4.1.2 otherwise it causes errors
const log=console.log

yargs.command( //findTemp
    {
        command:'findTemp', //findTemp --city:masulipatnam
        describe:'command for finding temparature',
        builder:{
            city:{
                describe:'Name of the city',
                demandOption:true,
                type:'string'
            }
        },
        handler(argv){
           
           app.getWeather(argv.city,(data,err)=>{
            if(err) 
            {
            console.log(chalk.red(err))
            }
            else
            {
            console.log(chalk.green(data))
            }
           })
        }
    }
)
/*
app.getWeather('Machilipatnam',(data,err)=>{
            if(err) 
            {
            console.log(chalk.red(err))
            }
            else
            {
            console.log(chalk.green(data))
            }
})*/
yargs.parse()