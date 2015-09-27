'use strict';
const VitaK = require('../../vita-kinesis');

let stream = process.env.AWS_KINESIS_STREAM;
let auth = {
	AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
	AWS_REGION: process.env.AWS_REGION
};
let vita = new VitaK(stream, auth);


let Action = {
	post(req, res, next){
		let data = JSON.parse(req.body);
		let name = req.params.action_name;

		vita.emitAction(name, data)
			.then( function(result){
				res.send({
					name: name,
					status: 'RECEIVED'
				});
			})
			.catch( function(err){
				console.log(err);
				res.send({
					name: name,
					status: 'ERROR'
				});
			});
		next();
	}
};

module.exports = Action;
