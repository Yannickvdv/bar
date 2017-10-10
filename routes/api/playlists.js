"use strict";
var OAuth2Server = require('express-oauth-server');
var oauth = new OAuth2Server({
    model: require('../../models/user')
});
var express = require('express');
var router = express.Router();
var playlist = require('../../models/playlist');
/* POST playlist. */
router.post('/', oauth.authenticate({ scope: "Indexer" }), function (req, res, next) {
    playlist.savePlaylist(req.body.name, req.body.songs, res.locals.oauth.token.user.id, req.body.playlisttype, req.body.startdatetime, req.body.enddatetime, function (error, result) {
        if (error)
            res.send('false');
        else
            res.send(result);
    });
});
module.exports = router;
