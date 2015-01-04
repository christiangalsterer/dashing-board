var config = require('config');
var express = require('express');
var glob = require("glob");
var path = require('path');
var url = require('url')

var router = express.Router();

function dashboards() {
    var boards = [];
    var erbFiles = glob.sync(path.join(config.get('dashing.folder'), 'dashboards/*.erb'));
    
    for (i = 0; i < erbFiles.length; i++) {
        var boardName = path.basename(erbFiles[i], '.erb');
        boards[i] = {'name': boardName, 'url': url.resolve(config.get('dashing.url'), boardName)};
    }
    return boards;
}

router.get('/', function(req, res) {
  res.render('dashboard', { title: 'Dashboards', dashboards: dashboards()});
});

module.exports = router;
