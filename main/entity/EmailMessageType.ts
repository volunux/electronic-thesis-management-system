import { EntityAll } from './abstract/EntityAll';

export class EmailMessageType extends EntityAll {

	private title : string;
	private description : string;

	constructor(data : any) {

			super(data);

			this.title = data.title ? data.title : undefined;
			this.description = data.description ? data.description : undefined;
	}

	public getTitle() : string {

		return this.title;
	}

	public setTitle(title : string) : void {

		this.title = title;
	}

	public getDescription() : string {

		return this.description;
	}

	public setDescription(description : string) {

		this.description = description;
	}

}