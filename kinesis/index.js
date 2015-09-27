let kinesiserapy = require('kinesiserapy');

class Kinesis {

	constructor(){
		if ( "AWS_KINESES_STREAM" in process.env    &&
				 "AWS_ACCESS_KEY_ID" in process.env     &&
				 "AWS_SECRET_ACCESS_KEY" in process.env &&
				 "AWS_REGION" in process.env ) {

			this.stream = process.env.AWS_KINESIS_STREAM;
			this.auth = {
				AWS_ACCESS_KEY_ID     : process.env.AWS_ACCESS_KEY_ID,
				AWS_SECRET_ACCESS_KEY : process.env.AWS_SECRET_ACCESS_KEY,
				AWS_REGION            : process.env.AWS_REGION
			};

			this.emitter = new kinesis.KEmitter(this.stream, this.auth);
		}
		else {
			console.error('\n\nAWS config not set in environment variables\n\n');
			process.exit(1);
		}
	}
	emitAction(actionName, data){
		return new Promise( (resolve, reject)=> {
			this.emitter.emit({name: data}, function(err){
				if (err) reject(err);
				else resolve();
			});
		});
	}
}

module.exports = new Kinesis();
