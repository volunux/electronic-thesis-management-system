import Sendgrid , { MailDataRequired } from '@sendgrid/mail';
import NodeJS from 'node:process';

export class SendgridSender {

	constructor() {
	
	}

	public send(sender : string , recipient : string , subject : string , body : string) : void {

		Sendgrid.setApiKey((<NodeJS.ProcessEnv>process.env).SENDGRID_API_KEY as string);

		try {

		let response : MailDataRequired = {

			'from' : sender ,

			'to' : recipient ,

			'subject' : subject ,

			'html' : body };

     Sendgrid.send(response , false , function(err : Error , result : any) {

			if (err) { console.log(err); }

			else { console.log(result); }
		
		}); }

		catch(err : any) { console.log(`Network failure has occured. Please check connection and try again.`); }
	}

}