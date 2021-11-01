import { MailMessage } from './MailMessage';
import { MailMessageImpl } from './MailMessageImpl';

export class MailMessageLocal {

	public static forgotPassword(emailAddress : string , token : string , host : string) : MailMessage {

		let body : string = `

		<h1> <strong>Account Recovery</strong> </h1>
		
		<p> Hello , </p>
		
		<p> You are receiving this because you (or someone else) have requested the reset of the password for your account.
				Please click on the following link, or paste this into your browser to complete the process: </p>		
		<br/>
		<p> 
		<a style ='display:block;width:100%;padding=0% 2.9340879234504911474798498165083%;color:#a0a7a0;background-color:#290140' 
			href ='http://${host}/reset/${token}'> Recover Account Password </a> </p>

		<p> If you did not request this, please ignore this email and your password will remain unchanged.</p> `;

		let subject : string = `Password Reset Notification`;

		return new MailMessageImpl(body , subject);

	}

		public static resetPasswordSuccess(host : string) : MailMessage {

		let body : string = `

		You are receiving this because you have updated your account and profile password. Please kindly click on the following link , or paste this into your browser to continue using the system:
		http://${host}/sign-in `;

		let subject : string = `Account Password Successfully Updated`;

		return new MailMessageImpl(body , subject);

		}

		public static createUser(username : string , email_address : string , password : string) : MailMessage {

		let body : string = `

		An account has been created with the following username ${username}. <br/>

		The login credentials are : <br/>
			
		Email Address : ${email_address}

		Password : ${password}

		`;

		let subject : string = `Account created Successfully`;

		return new MailMessageImpl(subject , body);

		}

		public static transactionSuccess(reference : string) : MailMessage {

		let body : string = `

		Your order with a reference code ${reference} is successful. Thank you for working with us.`;

		let subject : string = `Transaction Status`;

		return new MailMessageImpl(body , subject);

		}

		public static transactionFailure(reference : string) : MailMessage {

		let body : string = `

		Your order with a reference code ${reference} is not successful. Thank you for working with us.`;

		let subject : string = `Transaction Status`;

		return new MailMessageImpl(body , subject);

		}

		public static transactionInitialization(reference : string) : MailMessage {

		let body : string = `

		You have initiated a transaction and order with a reference code ${reference}.`;

		let subject : string = `Transaction Status`;

		return new MailMessageImpl(body , subject);

		}

}