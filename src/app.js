const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// remember express always needs absoloute path for the static folder not a relative path

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000
// Define path for express config
const publicDirectorypath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handle bars and views location 
app.set('view engine', 'hbs')
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectorypath))

app.get('', (req, res)=>{
    res.render('index', {
        title:'Weather',
        name: 'Dynamic html'
    });
})
app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About Weather App',
        name: 'About Page'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helptext: 'This is some helpful text',
        title:'Help',
        name: 'Dave501'
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:'404',
        name:'david',
        errormessage:'Help artice not found'
    })
})
app.get('/products', (req, res)=>{
    if(!req.query.search){
       return  res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})
// Using express on geocode and forecast
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                location,
                forecast:forecastData,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecastedWeater: 50,
    //     location : 'New York',
    //     address: req.query.address
    // });
})
app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'david',
        errormessage: 'Page Not found'
    })
})



app.listen(port, ()=>{
    console.log('Server is up on port', port);
})


















// app.get('/weather', (req, res)=>{
//     res.send({
//         forecastedWeater: 50,
//         location : 'New York'
//     });
// })
// app.get('', (req, res)=>{
//     res.send('Hello Express!')
// })
// app.get('/help', (req, res)=>{
//     res.send([{
//         name:'Aditya', age: 23
//     },{
//         name: 'Sarah',
//         age:27
//     }]);
// })
// app.get('/about', (req, res)=>{
//     res.send('<h2>About Page!</h2>');
// })


