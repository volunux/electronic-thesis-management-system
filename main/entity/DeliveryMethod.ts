import { EntityOne } from './abstract/EntityOne';

export class DeliveryMethod extends EntityOne {

	private title : string;

	constructor(data : any) {

		super(data);

		this.title = data.title ? data.title : undefined;
	}

	public getTitle() : string {

		return this.title;
	}

	public setTitle(title : string) : void {

		this.title = title;
	}
}