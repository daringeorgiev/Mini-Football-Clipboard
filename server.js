'use strict';
// set up ========================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var database = require('./config/database');
var methodOverride = require('method-override');
var configPort = process.env.PORT || 8080;

// configuration =================
mongoose.set('useCreateIndex', true);
mongoose.connect(database.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(function (error) {
        console.error("Mongoose connection error", error);
    });

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({'extended': 'true'}));
app.use(express.json());
app.use(express.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

// routes ======================================================================
require('./app/routes')(app);

// listen (start app with node server.js) ======================================
app.listen(configPort);
console.log("Server start on " + configPort + " port!");
