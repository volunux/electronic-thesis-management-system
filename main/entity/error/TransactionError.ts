export class TransactionError extends Error {

	public status_code : number;
	public message : string;

	constructor(status_code : number) {

		super();

		this.status_code = status_code;
		this.message = 'The transaction you are trying to perform has been aborted due to an error.';

	}

	public getStatusCode() : number {

		return this.status_code;
	}

	public getMessage() : string {

		return this.message;
	}

}