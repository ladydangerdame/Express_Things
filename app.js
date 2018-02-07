var express = require('express');
var app = express();
var logger = require('./logger');
var prettyError = require('pretty-error').start();
app.use(logger);
app.use(express.static('public'));
//now we can support multiple routes and have a clean look
var snacks = require('./routes/snacks');

app.use('/snacks', snacks);

app.listen(3000, function(){
  console.log("Listening on 3000");
});
