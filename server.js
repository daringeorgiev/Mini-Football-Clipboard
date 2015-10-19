'use strict';
// set up ========================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var database = require('./config/database');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var configPort = 8080;

// configuration =================
mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

// routes ======================================================================
require('./app/routes')(app);

// listen (start app with node server.js) ======================================
app.listen(configPort);
console.log("Server start on " + configPort + " port!");

