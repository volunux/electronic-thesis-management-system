export class CartItemsInvalidError extends Error {

	public status_code : number;
	public message : string;

	constructor(status_code : number) {

		super();

		this.status_code = status_code;
		this.message = 'The items contained in the cart , one or more of the items is invalid.';

	}

	public getStatusCode() : number {

		return this.status_code;
	}

	public getMessage() : string {

		return this.message;
	}

}