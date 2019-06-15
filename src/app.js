const path = require('path');
const express = require('express');
var geocode = require('./../utils/geocode');
var forecast = require('./../utils/forecast');
const hbs = require('hbs');
const app = express();

//dynamic related
app.set('view engine', 'hbs');
const viewDirectoryPath = path.join(__dirname, '../templates/views');
app.set('views', viewDirectoryPath);
const partialDirectoryPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialDirectoryPath);


//static related 
const staticDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(staticDirectoryPath));

//route related
app.get('', (req, res) => {
    res.render('index', {
        title: "index page",
        name: "sanjay",
        class: "noIdea"
    });

})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "about page",
        name: "abhi",
        class: "Idea"
    });

})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            "error": "address is mandatory"
        })
    }
    geocode.getLocation(req.query.address, (error, {
        lat,
        lang,
        location
    }={}) => {
        if (error) {
            console.log("error is ", error);
            return res.send({
                error
        });
    }
        forecast.weather(lat, lang, (error, {
            temperature,
            precipProbability
        }) => {
            if (error) {
                
                return res.send({
                    error
            });
            }
            res.send({
                'forecast': "it is " + temperature + " with " + precipProbability + "% of raining.",
                location,
                'address': req.query.address
            })

        })
    })


})


app.get('/about/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "about article not found",
        class: "Idea"
    });

})
app.get('*', (req, res) => {
    res.render('about', {
        title: "404",
        name: "page not found",
        class: "Idea"
    });

})
app.listen("3001", () => {
    console.log("sever is up at 3001")
})