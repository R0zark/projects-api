'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var mongourl = 'urlmongohere';
var url = 'urlhere';
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect(mongourl)
    .then(() => {
        console.log("Database connection is successfully!");

        app.listen(port,() =>{
            console.log(`Server on url: ${url}:${port}`);
        })
    })
    .catch(err => {
        console.log(err);
    });


