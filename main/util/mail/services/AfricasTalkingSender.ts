// import AfricasTalking from 'africastalking';

export class AfricasTalkingSender {

	constructor() {

		
	}

	private static key : string = (<NodeJS.ProcessEnv>process.env)['AFRICASTALKING_APIKEY'] as string;

	private static username : string = (<NodeJS.ProcessEnv>process.env)['AFRICASTALKING_USERNAME'] as string;

	private static africasTalking : any = {

		'apiKey' : AfricasTalkingSender.key ,

		'username' : AfricasTalkingSender.username ,

		'other' : {

			'debug' : true
		}

	};

	public send(sender : string , recipient : string , subject : string , body : string) : void {


			const sms : any = AfricasTalkingSender.africasTalking.SMS;

			try {

			let response = sms.send({'to' : recipient });

			console.log(response); }

			catch(err : any) {

				console.log(err);
			}
	}


}