/**
 * Created by darin on 24/7/2015.
 */
'use strict';
var Team = require('./models/team');
var User = require('./models/user');
var path = require('path');
var jwt = require('jsonwebtoken');
var authentication = require('../config/authentication');
var passport = require('passport');

module.exports = function (app) {
    //Users Login
    app.post('/api/login', function(req, res) {
        // find the user
        User.findOne({
            name: req.body.name
        }, function(err, user) {

            if (err) {
                res.json({ success: false, message: err });
                throw err;
            }

            if (!user) {
                res.status(401)
                    .json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                if (!user.validPassword(req.body.password)) {
                    res.status(401)
                        .json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, authentication.secretPhrase, {
                        expiresInMinutes: '1440' // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.status(200)
                        .json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                }
            }
        });
    });

    //User get all
    app.get('/api/users', function (req, res) {
        User.find({}, function (err, users) {
            if (err) {
                throw err;
            }
            res.json(users);
        });
    });

    //User Register
    app.post('/api/register', function (req, res) {
        User.find({name: req.body.name}, function(err, data){
            if (err) {
                res.send(err);
                throw err;
            }
            if (data.length) {
                res.status(409)
                    .send('The user already exist. You must change the user name.')
            } else {
                var user = new User();
                user.name = req.body.name;
                user.password = user.generateHash(req.body.password);
                user.admin = false;


                user.save(function(err) {
                    if (err) throw err;

                    // create a token
                    var token = jwt.sign(user, authentication.secretPhrase, {
                        expiresInMinutes: '1440' // expires in 24 hours
                    });

                    res.status(200)
                        .json({
                            success: true,
                            message: 'User created successfully',
                            token: token
                        });
                });
            }
        })
    });

    //Teams
    app.get('/api/all-teams', function (req, res) {
        Team.find({}, function (err, teams) {
            if (err) {
                throw err;
            }
            res.json(teams);
        });
    });

    app.get('/api/team', function (req, res) {
        Team.findOne({_id: req.query.id}, function (err, team) {
            if (err) {
                res.status(404)
                    .json(err.message);
            }
            res.json(team);
        });
    });

    app.post('/api/team', function (req, res) {
        if (req.body.teamName != "Default team") {
            Team.find({teamName: req.body.teamName}, function(err, data){
                if (err) {
                    res.send(err);
                    throw err;
                }
                if (data.length) {
                    res.status(409)
                        .send('The team already exist. You must change the name.')
                } else {
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
                }
            });
        } else {
            res.status(501)
                .send('You can not save Default team')
        }
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
        if (req.body.teamName != "Default team") {
            Team.findById(req.body._id, function (err, team) {
                if (err) {
                    throw err;
                }

                team.teamName = req.body.teamName;
                team.playersCount = req.body.playersCount;
                team.players = req.body.players;
                team.colors = req.body.colors;

                team.save(function (err, team) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(team);
                });
            });
        } else {
            res.status(501)
                .send('You can not update default team')
        }
    });

    app.get('/angular-notify.html', function (req, res) {
        console.log(path.join(__dirname, '../public/libs/angular-notify/angular-notify.html'));
        res.sendFile(path.join(__dirname, '../public/libs/angular-notify/angular-notify.html'));
    });

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

};