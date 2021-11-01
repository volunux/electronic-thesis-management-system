export class EntityNotFound extends Error {

	public statusCode : string;
	public message : string;

	constructor(statusCode : string , message : string) {

		super();

		this.statusCode = statusCode;
		this.message = message;

	}

}