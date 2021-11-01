import { EntityAll } from './EntityAll';

export abstract class EntityOne extends EntityAll {

	constructor(data : any) {

		super(data);

		this.name = data.name ? data.name : undefined;
		this.abbreviation = data.abbreviation ? data.abbreviation : undefined;
		this.description = data.description ? data.description : "Not Available";
	}

	private name : string;
	private abbreviation : string;
	private description : string;

	public getName() : string {

		return this.name;
	}

	public getAbbreviation() : string {

		return this.abbreviation;
	}

	public getDescription() : string {

		return this.description;
	}

}