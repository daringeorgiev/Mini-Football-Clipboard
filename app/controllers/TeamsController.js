/**
 * Created by darin on 7/11/2015.
 */
var Team = require('../models/team');

module.exports = {
    getAllTeams: function(req, res) {
        if (req.query.ownerId) {
            if (req.decoded) {
                if ((req.query.ownerId === req.decoded._id || req.decoded.admin)) {
                    Team.find({
                        ownerId: req.query.ownerId
                    }, function(err, teams) {
                        if (err) {
                            throw err;
                        }
                        res.json(teams);
                    });
                } else {
                    return res.status(403)
                        .send('You are not authorized to get this teams');
                }
            } else {
                return res.status(401)
                    .send('You are not authenticated');
            }
        } else {
            Team.find({}, function(err, teams) {
                if (err) {
                    throw err;
                }
                res.json(teams);
            });
        }
    },

    getTeamById: function (req, res) {
        Team.findOne({_id: req.params.id}, function (err, team) {
            if (err) {
                res.status(404)
                    .json(err.message);
            }
            res.json(team);
        });
    },

    createTeam: function (req, res) {
        if (req.body.teamName != "Default team") {
            Team.find({teamName: req.body.teamName}, function (err, data) {
                if (err) {
                    res.send(err);
                    throw err;
                }
                if (data.length) {
                    return res.status(409)
                        .send('The team already exist. You must change the name.');
                } else {
                    Team.create({
                        teamName: req.body.teamName,
                        ownerId: res.req.decoded ? res.req.decoded._id : '',
                        isPrivate: req.body.isPrivate ? req.body.isPrivate : false,
                        playersCount: req.body.playersCount,
                        players: req.body.players,
                        colors: req.body.colors
                    }, function (err, team) {
                        if (err) {
                            res.send(err);
                            throw err;
                        }
                        res.send(team);
                    });
                }
            });
        } else {
            res.status(501)
                .send('You can not save Default team');
        }
    },

    updateTeam: function (req, res) {
        if (req.body.teamName != "Default team") {
            Team.findById(req.body._id, function (err, team) {
                if (err) {
                    throw err;
                }

                if (team.ownerId && (res.req.decoded && team.ownerId !== res.req.decoded._id || !res.req.decoded)) {
                    return res.status(403)
                        .send('You are not authorized to update this team');
                }

                team.teamName = req.body.teamName;
                team.isPrivate = req.body.isPrivate ? req.body.isPrivate : false;
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
                .send('You can not update default team');
        }
    },

    deleteTeam: function(req, res) {
        if (req.decoded) {
            Team.findOne({
                _id: req.params.id
            }, function(err, team) {
                if (err) {
                    res.status(404)
                        .json(err.message);
                }

                if (req.decoded._id === team.ownerId || req.decoded.admin) {
                    Team.remove({
                        _id: req.params.id
                    }, function(err, team) {
                        if (err) {
                            res.send(err);
                            throw err;
                        }
                        Team.find({}, function(err, teams) {
                            if (err) {
                                throw err;
                            }
                            res.json(teams);
                        });
                    });
                } else {
                    return res.status(403)
                        .send('You are not authorized to delete this team');
                }
            });
        } else {
            return res.status(401)
                .send('You are not authenticated');
        }
    }
};
