//module.exports makes this file a Node module that is accessible from other files
module.exports = function(req, res, next) {
//the plus sign converts the date object to milliseconds from Jan 1 1970, the unix community standard
  var start = +new Date();
  //standard out is a writable stream which we will write the log to
  var stream = process.stdout;
  //Here we are accessing the url and method attributes of the request object
  var url = req.url;
  var method = req.method;

  //event handler function that runs asynchronously. The response object emits the finish event when the response is handed off to the Operating system
  res.on('finish', function(){
    var duration = +new Date() - start;
    var message = method + ' to ' + url + '\ntook ' + duration + ' ms \n\n';
    //prints the log message
    stream.write(message);
  });

  next();
}

//What exactly are streams?
// Streams are collections of data — just like arrays or strings. The difference is that streams might not be available all at once, and they don’t have to fit in memory. This makes streams really powerful when working with large amounts of data, or data that’s coming from an external source one chunk at a time. Streams can be readable, writable, or both.
//Read more about streams: https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93
