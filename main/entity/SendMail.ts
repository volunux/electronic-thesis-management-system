import { EntityOne } from './abstract/EntityOne';

export class SendMail extends EntityOne {

	private email_address : string;
	private title : string;
	private message : string;
	private is_delivered : boolean;

	constructor(data : any) {

		super(data);

		this.email_address = data.email_address ? data.email_address : undefined;
		this.title = data.title ? data.title : undefined;
		this.message = data.message ? data.message : undefined;
		this.is_delivered = data.is_delivered ? data.is_delivered : undefined;
	}

	public getTitle() : string {

		return this.title;
	}

	public setTitle(title : string) : void {

		this.title = title;
	}

	public getEmailAddress() : string {

		return this.email_address;
	}

	public setEmailAddress(email_address : string) : void {

		this.email_address = email_address;
	}

	public getMessage() : string {

		return this.message;
	}

	public setMessage(message : string) : void {

		this.message = message;
	}

	public isDelivered() : boolean {

		return this.is_delivered;
	}

	public setDelivered(is_delivered : boolean) : void {

		this.is_delivered = is_delivered;
	}

}