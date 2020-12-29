const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsDirectoryPath = path.join(__dirname,'../templates/views')
const partialsDirectoryPath = path.join(__dirname,'../templates/partials')

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Utkarsh Lath'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Utkarsh Lath'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'Send Help!',
        title: 'Help',
        name: 'Utkarsh Lath'
    })
})

app.get('/weather',(req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'Please enter an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res)=>{
    
    if(!req.query.search){
        return res.send({
            error: 'Please enter a search term!'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        message: 'Help article not found.',
        name: 'Utkarsh Lath'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        message: 'Page not found.',
        name: 'Utkarsh Lath',
        title: '404'
    })
})

app.listen(port,()=>{
    console.log('Server is running on port '+port)
})