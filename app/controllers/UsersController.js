/**
 * Created by darin on 7/11/2015.
 */
var User = require('../models/user'),
    jwt = require('jsonwebtoken'),
    authentication = require('../../config/authentication');

module.exports = {
    userLogin: function (req, res) {
        // find the user
        User.findOne({
            name: req.body.name
        }, function (err, user) {

            if (err) {
                res.json({success: false, message: err});
                throw err;
            }

            if (!user) {
                res.status(401)
                    .json({success: false, message: 'Authentication failed. User not found.'});
            } else if (user) {

                // check if password matches
                if (!user.validPassword(req.body.password)) {
                    res.status(401)
                        .json({success: false, message: 'Authentication failed. Wrong password.'});
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, authentication.secretPhrase, {
                        expiresInMinutes: '1440' // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.status(200)
                        .json({
                            userName: user.name,
                            _id: user._id,
                            token: token
                        });
                }
            }
        });
    },

    userRegister: function (req, res) {
        User.find({name: req.body.name}, function (err, data) {
            if (err) {
                res.send(err);
                throw err;
            }
            if (data.length) {
                return res.status(409)
                    .send('The user already exist. You must change the user name.');
            } else {
                var user = new User();
                user.name = req.body.name;
                user.password = user.generateHash(req.body.password);
                user.admin = false;


                user.save(function (err) {
                    if (err) throw err;

                    // create a token
                    var token = jwt.sign(user, authentication.secretPhrase, {
                        expiresInMinutes: '1440' // expires in 24 hours
                    });

                    res.status(200)
                        .json({
                            userName: user.name,
                            _id: user._id,
                            token: token
                        });
                });
            }
        });
    },

    getAllUsers: function (req, res) {
        User.find({}, function (err, users) {
            if (err) {
                throw err;
            }
            res.json(users);
        });
    }
};
