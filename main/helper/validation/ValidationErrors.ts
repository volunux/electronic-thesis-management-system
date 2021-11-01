import { ValidationErrorMessage } from './ValidationErrorMessage';

export class ValidationErrors {

	constructor(messageList : string[]) {

		this.messageList = messageList;
		this.validationErrorMessages = {};
	}

	private messageList : string[];
	private validationErrorMessages : { [key : string] : ValidationErrorMessage };

	public isEmpty() : boolean {

		return this.messageList.length < 1;
	}


	public getErrors() : string[] {

		return this.messageList;
	}

	public getValidationErrorMessages() : { [key : string] : ValidationErrorMessage } {

		return this.validationErrorMessages;
	}

	public addError(error : string) : void {

		this.messageList.push(error);
	}

	public addManyError(errors : string[]) : void {

		this.messageList.push(...errors);
	}

	public addManyValidationMessage(errors : ValidationErrorMessage[]) : void {

		errors.forEach((error : ValidationErrorMessage) => {

				this.validationErrorMessages[error.getPath()] = error;
		});
	}
}