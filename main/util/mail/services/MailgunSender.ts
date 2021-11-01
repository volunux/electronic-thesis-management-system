import NodeJS from 'node:process';
import path from 'path';
import Mailgun from 'mailgun-js';
import dotenv from 'dotenv';
import { ConfigFilePaths } from '../../../config/ConfigFilePaths';

dotenv.config({'path' : ConfigFilePaths.envDir});

export class MailgunSender {

	constructor() {

	}

	private static domain : string = (<NodeJS.ProcessEnv>process.env)['MAILGUN_DOMAIN'] as string;

	private static key : string = (<NodeJS.ProcessEnv>process.env)['MAILGUN_API_PRIVATE'] as string;

	private static emailAddress : string = (<NodeJS.ProcessEnv>process.env)['EMAIL_ADDRESS'] as string;

	private static mailgun : Mailgun.Mailgun = new Mailgun({'apiKey' : "assa" , 'domain' : MailgunSender.domain} as any);

	public send(sender : string , recipient : string , subject : string , body : string) : void {

		const message : Mailgun.messages.SendData = {

			'from' : sender , 

			'to' : recipient ,

			'subject' : subject ,

			'text' : body ,

		};

		try {

		let response : Mailgun.messages.SendResponse = MailgunSender.mailgun.messages().send(message) as any; 

		console.log(response); } 

		catch (err : any) {

			console.log(err);
		} 

	}

	public static async sendHtml(from : string , to : string , subject : string , html : string) : Promise<void> {

		const message : Mailgun.messages.SendData = {

			'from' : from , 

			'to' : to ,

			'subject' : subject ,

			'html' : html
		};

		try {

		let response : Mailgun.messages.SendResponse = await MailgunSender.mailgun.messages().send(message); 

		console.log(response); } 

		catch (err : any) {

			console.log(err);
		} 

	}

	public static async sendwithAttachment(from : string , to : string , subject : string , text : string , html : string , filePath : string) : Promise<void> {

		let file : string = path.join(__dirname , filePath);

		const message : Mailgun.messages.SendData = {

			'from' : from , 

			'to' : to ,

			'subject' : subject ,

			'html' : html ,

			'attachment' : file
		};

		try {

		let response : Mailgun.messages.SendResponse = await MailgunSender.mailgun.messages().send(message); 

		console.log(response); } 

		catch (err : any) {

			console.log(err);
		} 

	}

}