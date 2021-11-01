import Nexmo , { MessageError , MessageRequestResponse } from 'nexmo';

export class NexmoSender {

	private static key : string = (<NodeJS.ProcessEnv>process.env)['NEXMO_APIKEY'] as string;

	private static secret : string = (<NodeJS.ProcessEnv>process.env)['NEXMO_APISECRET'] as string;

	private static nexmo = new Nexmo({'apiKey' : NexmoSender.key , 'apiSecret' : NexmoSender.secret} , {'debug' : true});

	public static async sendSMS(from : string , to : string , text : string) : Promise<void> {

		NexmoSender.nexmo.message.sendSms(from , to , text , {'type' : 'unicode'} , (err : MessageError , response : MessageRequestResponse) => {

			if (err) console.log(err);

			console.log(response);

		});

	}


}