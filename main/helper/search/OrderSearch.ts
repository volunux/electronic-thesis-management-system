import { AbstractEntityOneSearch } from './abstract/AbstractEntityOneSearch';

export class OrderSearch extends AbstractEntityOneSearch {

	constructor() {

		super();

		this.statusAlias = 'gs.name';
		this.updatedOnAlias = 'ct.updated_on';
		this.abbreviationAlias = 'ct.abbreviation';
		this.nameAlias = 'ct.name';

	}

	public static getInstance() : OrderSearch {

		return new OrderSearch();
	}

}