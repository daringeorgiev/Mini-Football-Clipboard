/**
 * Created by darin on 23/7/2015.
 */
'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var teamSchema = Schema({
    teamName: {
        type: 'String',
        unique: true,
        index: true
    },
    ownerId: String,
    playersCount: Number,
    players: Array,
    colors: {
        mainColor: String,
        secondColor: String,
        gkMainColor: String,
        gkSecondColor: String
    }
});

module.exports = mongoose.model('Team', teamSchema);