import { AbstractEntityTwoSearch } from './abstract/AbstractEntityTwoSearch';

export class StatusSearch extends AbstractEntityTwoSearch {

	constructor() {

		super();

		this.statusAlias = 'gs.name';
		this.updatedOnAlias = 'gs.updated_on';
		this.wordAlias = 'gs.word';
		this.nameAlias = 'gs.name';

	}

	public static getInstance() : StatusSearch {

		return new StatusSearch();
	}

}