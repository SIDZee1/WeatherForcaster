const path = require('path') 
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { defaultCipherList } = require('constants')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 

//setup handlebars engine and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))
  
app.get('', (req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Zeeshan Siddiqui'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',    
        name:'Zeeshan Siddiqui'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        name:'Zeeshan Siddiqui'
    })
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 page',
        name:'Zeeshan Siddiqui',
        errorMessage:'help article not found'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error:'No Address Provided'
        })
    } 
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
           if(error) {
               res.send({error})
            }
            res.send({
                forecast:forecastData,
                location
            })
        })
    })
   
})     

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 page',
        name:'Zeeshan Sidiqui',
        errorMessage:'Page not found'
    })

})

// 


// app.com
// app.com/help
// app.com/about

app.listen(port, ()=>{
    console.log('setting up server on port'+ port)
})