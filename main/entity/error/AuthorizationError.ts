export class AuthorizationError extends Error {

	public status_code : number;
	public message : string;

	constructor(status_code : number , message : string) {

		super();

		this.status_code = status_code;
		this.message = message;

	}

	public getStatusCode() : number {

		return this.status_code;
	}

	public getMessage() : string {

		return this.message;
	}

}