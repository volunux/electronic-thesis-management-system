export class AuthenticationError extends Error {

	public statusCode : string;
	public message : string;

	constructor(statusCode : string , message : string) {

		super();

		Error.captureStackTrace(this, this.constructor)

		this.statusCode = statusCode;
		this.message = message;

	}

}