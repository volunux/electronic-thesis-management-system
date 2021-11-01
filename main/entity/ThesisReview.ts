import { EntityAll } from './abstract/EntityAll';

export class ThesisReview extends EntityAll {

	constructor(data : any) {

		super(data);

		this.text = data.text ? data.text : undefined;
	}

	private text : string;

	public getText() : string {

		return this.text;
	}

}