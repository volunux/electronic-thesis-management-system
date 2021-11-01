import Twilio from 'twilio';
import dotenv from 'dotenv';
import { ConfigFilePaths } from '../../../config/ConfigFilePaths';

dotenv.config({'path' : ConfigFilePaths.envDir});

export class TwilioSender {

	constructor() {

		
	}

	private static accountSid : string = (<NodeJS.ProcessEnv>process.env)['TWILIO_ACCOUNT_SID'] as string;

	private static authToken : string = (<NodeJS.ProcessEnv>process.env)['TWILIO_AUTH_TOKEN'] as string;

	private static phoneNumber : string = (<NodeJS.ProcessEnv>process.env)['TWILIO_PHONE_NUMBER'] as string;

	private static phoneNumberTrial : string = (<NodeJS.ProcessEnv>process.env)['TWILIO_PHONE_NUMBER_TRIAL'] as string;

	private static client : Twilio.Twilio = Twilio(TwilioSender.accountSid , TwilioSender.authToken);

	public send(sender : string , recipient : string , subject : string , body : string) : void {

		try {

		let response : any = TwilioSender.client.messages.create({

			'from' : TwilioSender.phoneNumber ,

			'to' : TwilioSender.phoneNumberTrial ,

			'body' : body });

		console.log(response); }

		catch(err : any) {

			console.log(err);
		}
	}

}