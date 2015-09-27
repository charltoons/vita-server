'use strict';

const restify = require('restify');

// Routes
const action = require('./routes/action');

let server = restify.createServer();
server.use(restify.bodyParser());
server.post('/action/:action_name', action.post);

server.listen((process.env.PORT || 8080), function() {
  console.log('%s listening at %s', server.name, server.url);
});
