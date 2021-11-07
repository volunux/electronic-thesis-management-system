import { Response } from 'express';
import { MailMessage } from '../../util/mail/MailMessage';
import { MailMessageLocal } from '../../util/mail/MailMessageLocal';
import { MailMessagePayload } from '../../util/mail/MailMessagePayload';
import { MailMessageImpl } from '../../util/mail/MailMessageImpl';
import { MailSender } from '../../util/mail/MailSender';
import { MailSenderServicesContainer } from '../../util/mail/MailSenderServicesContainer';
import { User } from '../../entity/User';

export class MailHelper {

	public static sendEmail(service : MailSender | null , user : User , mailMessage : MailMessage) : void {

		let mailMessagePayload : MailMessagePayload = new MailMessagePayload((<NodeJS.ProcessEnv>process.env)['EMAIL_ADDRESS'] as string , user.getEmailAddress() , mailMessage.getSubject() , mailMessage.getBody());

		if (service !== null) { service.send(mailMessagePayload.getSender() , mailMessagePayload.getRecipient() , mailMessagePayload.getSubject() , mailMessagePayload.getBody()); }

	}

	public static renderTemplateAndSend(res : Response , fileName : string , service : MailSender | null , mailMessage : MailMessage , user : User , data : { [key : string] : any }) : void {

		data['layout'] = "";

		res.render(fileName , data , 

				function(err : Error , html : string) : void {

					if (err) { console.log(err); }

					mailMessage.setBody(html);

					MailHelper.sendEmail(service , <any>user , mailMessage); });
		}
}