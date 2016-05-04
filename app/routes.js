/**
 * Created by darin on 24/7/2015.
 */
var usersCtrl = require('./controllers/UsersController'),
    teamsCtrl = require('./controllers/TeamsController'),
    auth = require('./auth');

var path = require('path');

module.exports = function (app) {
    'use strict';
    //Users =================================================
    app.post('/api/login', usersCtrl.userLogin);
    app.post('/api/register', usersCtrl.userRegister);
    app.get('/api/users', usersCtrl.getAllUsers);

    //Teams =================================================
    app.get('/api/teams', auth.isLoggedIn, teamsCtrl.getAllTeams);
    app.get('/api/teams/:id', teamsCtrl.getTeamById);
    app.post('/api/teams', auth.isLoggedIn, teamsCtrl.createTeam);
    app.put('/api/teams/:id', auth.isLoggedIn, teamsCtrl.updateTeam);
    app.delete('/api/teams/:id', auth.isLoggedIn, teamsCtrl.deleteTeam);

    //Angular notify =========================================
    app.get('/angular-notify.html', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/libs/angular-notify/angular-notify.html'));
    });

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};
