import { AbstractEntityTwoSearch } from './abstract/AbstractEntityTwoSearch';

export class RoleSearch extends AbstractEntityTwoSearch {

	constructor() {

		super();

		this.statusAlias = 'gs.name';
		this.updatedOnAlias = 'rl.updated_on';
		this.wordAlias = 'rl.word';
		this.nameAlias = 'rl.name';

	}

	public static getInstance() : RoleSearch {

		return new RoleSearch();
	}

}