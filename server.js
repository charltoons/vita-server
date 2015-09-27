'use strict';

const restify = require('restify');

// Routes
const action = require('./routes/action');

let server = restify.createServer();
server.use(restify.bodyParser());
server.post('/action/:action_name', action.post);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

const kinesis = require('kinesiserapy');

let KAUTH = {
	AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
	AWS_REGION: process.env.AWS_REGION
};

let shardid;
let info = new kinesis.KInfo('Vita', KAUTH);
let consumer;
let onMessage = function(message){
	console.log('I am consumers', message);
}
info.listShards(function(err, res){
	shardid = res[0];

	let consumer = new kinesis.KConsumer(
		'Vita',
		shardid,
		onMessage,
		function(err){ console.error('error', error);},
		KAUTH);
});
