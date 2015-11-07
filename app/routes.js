/**
 * Created by darin on 24/7/2015.
 */
'use strict';
var usersCtrl = require('./controllers/UsersController'),
    teamsCtrl = require('./controllers/TeamsController'),
    auth = require('./auth');

var path = require('path');

module.exports = function (app) {
    //Users =================================================
    app.post('/api/login', usersCtrl.userLogin);
    app.post('/api/register', usersCtrl.userRegister);
    app.get('/api/users', usersCtrl.getAllUsers);

    //Teams =================================================
    app.get('/api/all-teams', teamsCtrl.getAllTeams);
    app.get('/api/my-teams', auth.isLoggedIn, teamsCtrl.getMyTeams);
    app.get('/api/team', teamsCtrl.getTeamById);
    app.post('/api/team', auth.isLoggedIn, teamsCtrl.createTeam);
    app.put('/api/team', auth.isLoggedIn, teamsCtrl.updateTeam);
    app.delete('/api/team:id', teamsCtrl.deleteTeam);

    //Angular notify =========================================
    app.get('/angular-notify.html', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/libs/angular-notify/angular-notify.html'));
    });

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};