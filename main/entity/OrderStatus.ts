import { EntityAll } from './abstract/EntityAll';

export class OrderStatus extends EntityAll {

	private order_status_id : number;
	private title : string;
	private description : string;

	constructor(data : any) {

		super(data);

		this.order_status_id = 0;
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

	public setDescription(description : string) : void {

		this.description = description;
	}
}