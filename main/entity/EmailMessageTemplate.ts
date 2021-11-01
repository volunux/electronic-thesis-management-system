import { EntityAll } from './abstract/EntityAll';
import { EmailMessageType } from './EmailMessageType';

export class EmailMessageTemplate extends EntityAll {

	private title : string;
	private message : string;
	private message_type : string;
	private email_message_types : EmailMessageType[];

	constructor(data : any) {

			super(data);

			this.title = data.title ? data.title : undefined;
			this.message = data.message ? data.message : undefined;
			this.message_type = data.message_type ? data.message_type : undefined;
			this.email_message_types = [];
	}

	public getTitle() : string {

		return this.title;
	}

	public setTitle(title : string) : void {

		this.title = title;
	}

	public getMessage() : string {

		return this.message;
	}

	public setMessage(message : string) {

		this.message = message;
	}

	public getMessageType() : string {

		return this.message_type;
	}

	public setMessageType(message_type : string) : void {

		this.message_type = message_type;
	}

	public getEmailMessageTypes() : EmailMessageType[] {

		return this.email_message_types;
	}

	public setEmailMessageTypes(email_message_types : EmailMessageType[]) : void {

		this.email_message_types = email_message_types;
	}

}