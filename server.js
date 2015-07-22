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
mongoose.connect('mongodb://localhost/da2234');

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

//Create default team
Team.find({}, function (err, teams) {
    if (err) {
        throw err;
    }
    if(teams.length === 0){
        Team.create({
            teamName: "Default team",
            playersCount: 6,
            players: [
                {
                    "left": 49,
                    "top": 93,
                    "playerNumber": 49,
                    "playerName": "Player 1"
                },
                {
                    "playerNumber": 51,
                    "playerName": "Player 2",
                    "top": 67,
                    "left": 51
                },
                {
                    "left": 84,
                    "top": 50,
                    "playerNumber": 84,
                    "playerName": "Player 3"
                },
                {
                    "left": 16,
                    "top": 53,
                    "playerNumber": 16,
                    "playerName": "Player 4"
                },
                {
                    "left": 61,
                    "top": 30,
                    "playerNumber": 61,
                    "playerName": "Player 5"
                },
                {
                    "playerNumber": 35,
                    "playerName": "Player 6",
                    "top": 23,
                    "left": 35
                },
                {
                    "playerNumber": 7,
                    "playerName": "Player 7"
                },
                {
                    "playerNumber": 8,
                    "playerName": "Player 8"
                },
                {
                    "playerNumber": 9,
                    "playerName": "Player 9"
                }
            ]
        }, function (err, team) {
            if (err) {
                throw err;
            }
            console.log("Default team created")
        })
    }
});

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

