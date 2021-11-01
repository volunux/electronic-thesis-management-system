import { EntityAll } from './EntityAll';

export abstract class EntityThree extends EntityAll {

	constructor(data : any) {

		super(data);

		this.location = data.location ? data.location : "Not Available";
		this.mimetype = data.mimetype ? data.mimetype : "Not Available";
		this.size = data.size ? data.size : 100;
		this.key = data.key ? data.key : "Not Available";
	}

	private location : string;
	private mimetype : string;
	private size : string;
	private key : string;

	public getLocation() : string {

		return this.location;
	}

	public getMimetype() : string {

		return this.mimetype;
	}

	public getSize() : string {

		return this.size;
	}

	public getKey() : string {

		return this.key;
	}

}