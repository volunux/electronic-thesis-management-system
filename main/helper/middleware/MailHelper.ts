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
}