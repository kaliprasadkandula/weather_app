const fs=require('fs')
/* our objective is to over ride existing json file*/

var JSONdata=fs.readFileSync('./temp_data.json')//reading the json file
const parsedData=JSON.parse(JSONdata)//parsing into an object
delete parsedData.auth//deleting a property (if exists)
parsedData.author='kaka' //overriding a property (if exists) or else creates new property
JSONdata=JSON.stringify(parsedData)//creating back into string
fs.writeFileSync('temp_data.json',JSONdata)//pushing that data into json file