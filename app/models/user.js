/**
 * Created by darin on 28/9/2015.
 */
'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = Schema({
    name: {
        type: 'String',
        unique: true,
        index: true
    },
    password: String,
    admin: Boolean
});

module.exports = mongoose.model('User', userSchema);