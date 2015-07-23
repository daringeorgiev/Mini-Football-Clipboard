/**
 * Created by darin on 23/7/2015.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var teamSchema = Schema({
    teamName: String,
    playersCount: Number,
    players: Array
});

module.exports = mongoose.model('Team', teamSchema);