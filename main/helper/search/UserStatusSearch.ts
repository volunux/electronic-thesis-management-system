import { AbstractEntityTwoSearch } from './abstract/AbstractEntityTwoSearch';

export class UserStatusSearch extends AbstractEntityTwoSearch {

	constructor() {

		super();

		this.statusAlias = 'gs.name';
		this.updatedOnAlias = 'us.updated_on';
		this.wordAlias = 'us.word';
		this.nameAlias = 'us.name';

	}

	public static getInstance() : UserStatusSearch {

		return new UserStatusSearch();
	}

}