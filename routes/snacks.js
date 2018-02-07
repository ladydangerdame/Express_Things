var express = require('express');
var router = express.Router(); //Returns router instance which can be mounted as a middleware
var prettyError = require('pretty-error').start();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({
  extended: false
});

var snacks = {
  'Chips': 'Sliced and fried potatoes',
  'Nachos': 'Tortilla chips covered in cheese and stuff',
  'Pretzels': 'Goes great with mustard'
};

router.route('/') // the root path relative to the path where it's mounted (app.use('/snacks'))

  .get(function(req, res) {
    if (req.query.limit >= 0) {
      res.json(snacks.slice(0, req.query.limit));
    } else {
      res.json(Object.keys(snacks));
    }
  })
  .post(parseUrlencoded, function(req, res) {
    var newSnack = req.body;
    snacks[newSnack.name] = newSnack.description;
    res.status(201).json(newSnack.name);
  });

router.route('/:name')
  // the all function does the same thing as app.param and either is fine to use. The all route is called for all requests for a given URL path
  .all(function(req, res, next) {
    var name = req.params.name;
    var snack = name[0].toUpperCase() + name.slice(1).toLowerCase();
    req.snackName = snack;
  })
  .get(function(req, res) {
    var description = snacks[req.snackName];
    if (!description) {
      res.status(404).json('No description found for ' + snackName);
    } else {
      res.json(description);
    }
  })
  .delete(function(req, res) {
    delete snacks[req.snackName];
    res.sendStatus(200);
    console.log("Deleting");
  });


module.exports = router; // exports the router as a Node module
