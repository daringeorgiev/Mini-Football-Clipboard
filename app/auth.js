/**
 * Created by darin on 7/11/2015.
 */
var jwt = require('jsonwebtoken'),
    authentication = require('../config/authentication');

// route middleware to make sure a user is logged in
module.exports = {
    isLoggedIn: function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

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
};
