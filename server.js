// set up ========================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var configPort = 22222;

var Schema = mongoose.Schema;
var teamSchema = Schema({
    teamName: String,
    playersCount: Number,
    players: Array
});

var Team = mongoose.model('Team', teamSchema);
module.exports = Team;

// configuration =================
app.use(express.static(__dirname + '/public'));
mongoose.connect('mongodb://localhost/da22');

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());


app.get('/api/teams', function (req, res) {
    Team.find({}, function (err, teams) {
        if (err) {
            throw err;
        }
        res.json(teams);
        //console.log(teams);
    });
});

app.post('/api/team', function (req, res) {
    Team.create({
        teamName: req.body.teamName,
        playersCount: req.body.playersCount,
        players: req.body.players
    }, function (err, team) {
        if (err) {
            res.send(err);
            throw err;
        }
        res.send(team);
    })
});

app.delete('/api/teams:id', function (req, res) {
    Team.remove({
        _id: req.params.id
    }, function (err, team) {
        if (err) {
            res.send(err);
            throw err;
        }
        Team.find({}, function (err, teams) {
            if (err) {
                throw err;
            }
            res.json(teams);
        });
    });
});

app.put('/api/team', function (req, res) {
    Team.findById(req.body._id, function (err, team) {
        if (err) {
            throw err;
        }

        team.teamName = req.body.teamName;
        team.playersCount = req.body.playersCount;
        team.players = req.body.players;

        team.save(function (err, team) {
            if (err) {
                res.send(err);
            }
            res.json(team);
        });
    });
});

app.get('/angular-notify.html', function (req, res) {
    res.sendFile(__dirname + '/public/libs/angular-notify/angular-notify.html');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


// listen (start app with node server.js) ======================================
app.listen(configPort);
console.log("Server start on " + configPort + " port!");

