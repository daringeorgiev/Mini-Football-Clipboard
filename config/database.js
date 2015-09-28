/**
 * Created by darin on 23/7/2015.
 */
'use strict';
module.exports = {
    'secret': 'blablabla',
    'url': 'mongodb://localhost/da4'
};

var Team = require('../app/models/team');

//Create default team
Team.find({}, function (err, teams) {
    if (err) {
        throw err;
    }
    if (teams.length === 0) {
        Team.create({
            teamName: "Default team",
            playersCount: 6,
            players: [
                {
                    "left": 49,
                    "top": 93,
                    "playerNumber": 1,
                    "playerName": "Player 1"
                },
                {
                    "playerNumber": 2,
                    "playerName": "Player 2",
                    "top": 67,
                    "left": 51
                },
                {
                    "left": 84,
                    "top": 50,
                    "playerNumber": 3,
                    "playerName": "Player 3"
                },
                {
                    "left": 16,
                    "top": 53,
                    "playerNumber": 4,
                    "playerName": "Player 4"
                },
                {
                    "left": 61,
                    "top": 30,
                    "playerNumber": 5,
                    "playerName": "Player 5"
                },
                {
                    "playerNumber": 6,
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