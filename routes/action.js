'use strict';
const kinesis = require('../kinesis');

let Action = {
	post(req, res, next){
		let data = JSON.parse(req.body);
		let name = req.params.action_name;

		kinesis.emitAction(name, data)
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
