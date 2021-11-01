export class ShippingDetail {

	private state : string;
	private city : string;
	private country : string;
	private contact_address : string;
	private zip : string;
	private phone_number : string;
	private user_id : number; 

	constructor(data : any) {

		this.state = data.state ? data.state : undefined;
		this.city = data.city ? data.city : undefined;
		this.country = data.country ? data.country : undefined;
		this.contact_address = data.contact_address ? data.contact_address : undefined;
		this.zip = data.zip ? data.zip : undefined;
		this.phone_number = data.phone_number ? data.phone_number : undefined;
		this.user_id = data.user_id ? data.user_id : undefined;
	}

	public getState() : string {

		return this.state;
	}

	public getCity() : string {

		return this.city;
	}

	public getCountry() : string {

		return this.country;
	}

	public getContactAddress() : string {

		return this.contact_address;
	}

	public getPhoneNumber() : string {

		return this.phone_number;
	}

	public getZip() : string {

		return this.zip;
	}

	public getUserId() : number {

		return this.user_id;
	}
	
	public setState(state : string) : void {

		this.state = state;
	}

	public setCity(city : string) : void {

		this.city = city;
	}

	public setCountry(country : string) : void {

		this.country = country;
	}

	public setContactAddress(contact_address : string) : void {

		this.contact_address = contact_address;
	}

	public setPhoneNumber(phone_number : string) : void {

		this.phone_number = phone_number;
	}

	public setZip(zip : string) : void {

		this.zip = zip;
	}

	public setUserId(user_id : number) : void {

		this.user_id = user_id;
	}
	
}