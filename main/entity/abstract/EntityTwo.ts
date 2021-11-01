import { EntityAll } from './EntityAll';

export abstract class EntityTwo extends EntityAll {

	constructor(data : any) {

		super(data);

		this.name = data.name ? data.name : undefined;
		this.word = data.word ? data.word : undefined;
		this.description = data.description ? data.description : "Not Available";
	}

	private name : string;
	private word : string;
	private description : string;


	public getName() : string {

		return this.name;
	}

	public getWord() : string {

		return this.word;
	}

	public getDescription() : string {

		return this.description;
	}

}