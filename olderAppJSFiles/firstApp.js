//The require() method is used to load and cache JavaScript modules
var express = require('express');
//calling the express function with the variable app creates an application instance with express.
var app = express();
//requiring our custom middleware logger, called with a ./ since it is local middleware, not an NPM module
var logger = require('./logger');
var prettyError = require('pretty-error').start();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
//The above line forces the use of the native Node query parser module 'queryString'
//This line creates a route instance to help avoid duplicate route names.
var snacksRoute = app.route('/snacks')
//add logger to the stack by passing it as an arguement in app.use
app.use(logger);

//The express static function serves from the public folder as our root
app.use(express.static('public'));

//Javascript Object
var snacks = {
  'Chips': 'Sliced and fried potatoes',
  'Nachos': 'Tortilla chips covered in cheese and stuff',
  'Pretzels': 'Goes great with mustard'
};
// //app.get is setting up a route that will get our /snacks page.
app.get('/snacks', function(req, res) {
  if (req.query.limit >= 0) {
    res.json(snacks.slice(0, req.query.limit));
  } else {
     res.json(Object.keys(snacks));
  }
});

app.param('name', function(req, res, next){
  var name = req.params.name;
  //converts first char to upper and remaining to lower. Normalizing params to match our object
  var snack = name[0].toUpperCase() + name.slice(1).toLowerCase();
  req.snackName = snack;
  //can be accessed from other routes in the application
  next();
});
//Dynamic routes!! These can now be refactored as "snacksRoute.get(function(req, res){...})" etc
//This can also be shortened even more with chaining. With no semi colon at the end of app.route(/snacks) **with no var!** we can call the functions on the return value of previous functions by then removing 'app' from before the get and post methods
app.get('/snacks/:name', function(req, res) {
  var description = snacks[req.snackName];
  if (!description) {
    res.status(404).json('No description found for ' + snackName);
  } else {
    res.json(description);
    //Defaults to 200 success status code
  }
});

//Routes can take multiple handlers are arguements, they are executed sequentially.
//Using multiple route handlers is useful for re-using middleware that loads resources, performs validations, authentication etc...
app.post('/snacks', parseUrlencoded, function(req, res){
  var newSnack = req.body;
  snacks[newSnack.name] = newSnack.description;
  res.status(201).json(newSnack.name);
  //responds with snack name and 201 created status code.

});

app.delete('/snacks/:name', function(req, res){
  delete snacks[req.snackName];
  res.sendStatus(200);
});
//Port 3000 is serving our app. Visit localhost:3000 to see it!
app.listen(3000);
