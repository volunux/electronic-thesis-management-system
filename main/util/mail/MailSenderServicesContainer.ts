import { MailSender } from './MailSender';
import { MailgunSender } from './services/MailgunSender';
import { TwilioSender } from './services/TwilioSender';
import { AfricasTalkingSender } from './services/AfricasTalkingSender';
import { SendgridSender } from './services/SendgridSender';

export class MailSenderServicesContainer {

	private static serviceList : Map<string , MailSender> = new Map<string , MailSender>();

	public static getService(name : string) : MailSender | null {

		let listAdded : boolean = false;		

		if (!listAdded) {

		MailSenderServicesContainer.serviceList.set('sendgrid' , new SendgridSender());
		MailSenderServicesContainer.serviceList.set('twilio' , new TwilioSender());
		MailSenderServicesContainer.serviceList.set('mailgun' , new MailgunSender());
		MailSenderServicesContainer.serviceList.set('africastalking' , new AfricasTalkingSender());

		listAdded = true; }

		let mailSender : MailSender | undefined = MailSenderServicesContainer.serviceList.get(name);

		if (mailSender === undefined || mailSender === null) { return null; }

		else { return mailSender; }
	}

	public static addService(name : string , mailSender : MailSender) : void {

		MailSenderServicesContainer.serviceList.set(name , mailSender);
	}
}