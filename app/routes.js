/**
 * Created by darin on 24/7/2015.
 */
'use strict';
var path = require('path');
var jwt = require('jsonwebtoken');
var authentication = require('../config/authentication');

var usersCtrl = require('./controllers/UsersController');
var teamsCtrl = require('./controllers/TeamsController');

module.exports = function (app) {
    //Users =================================================
    app.post('/api/login', usersCtrl.userLogin);
    app.post('/api/register', usersCtrl.userRegister);
    app.get('/api/users', usersCtrl.getAllUsers);

    //Teams =================================================
    app.get('/api/all-teams', teamsCtrl.getAllTeams);
    app.get('/api/my-teams', isLoggedIn, teamsCtrl.getMyTeams);
    app.get('/api/team', teamsCtrl.getTeamById);
    app.post('/api/team', isLoggedIn, teamsCtrl.createTeam);
    app.put('/api/team', isLoggedIn, teamsCtrl.updateTeam);
    app.delete('/api/team:id', teamsCtrl.deleteTeam);

    //Angular notify =========================================
    app.get('/angular-notify.html', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/libs/angular-notify/angular-notify.html'));
    });

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};

//
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, authentication.secretPhrase, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        next();
    }
}