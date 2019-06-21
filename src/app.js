const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const app= express() 

const port=process.env.PORT || 3000
//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsDirectory =path.join(__dirname, '../templates/views')
const partialsDirectory=path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('views',viewsDirectory)
app.set('view engine','hbs')
hbs.registerPartials(partialsDirectory)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//response and request for web page
app.get('',(req,res)=>{
res.render('index',{
    title: 'Weather',
    name: 'Siddhant Shukla'
})

})

app.get('/about',(req,res)=>{ 
    res.render('about',{ 
        title: 'About Me',
        name: 'Siddhant Shukla'
    })
})

app.get('/help',(req,res)=>{ 
    res.render('help',{ 
        help:'Help ! ',
        helpMessage:'This is a help center.',
        title:'Help Centre',
        name:'Siddhant Shukla'
        
        
    })
})

app.get('/weather',(req,res)=>{ 
   if(!req.query.address){ 
       return res.send({ 
           error: 'no address provided'
       })
   }
  geocode(req.query.address,(error,{latitude,longitude,location}=0)=>{ 
   if(error){ 
       return res.send(error)
   } 
   forecast(latitude,longitude,(error,forecastData)=>{
       if(error){
           return res.send(error)
       }
       res.send({ 
           forecast: forecastData,
           location,
           address: req.query.address
       })
   })
  })
 })
    
app.get('/help/*',(req,res)=> { 
    res.render('404',{
        title:'404',
        name:'Siddhant',
        errorMessage:'help article not found'
    })
})


app.get('*',(req,res)=>{ 
res.render('404',{ 
title:'404',
name:'Siddhant Shukla',
errorMessage:'Page not found '

})
})

//listen request for setting up the server 
app.listen(port,()=>{
    console.log('server is up on port '+port)
})