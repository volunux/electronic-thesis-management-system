import { AbstractEntityOneSearch } from './abstract/AbstractEntityOneSearch';

export class LevelSearch extends AbstractEntityOneSearch {

	constructor() {

		super();

		this.statusAlias = 'gs.name';
		this.updatedOnAlias = 'll.updated_on';
		this.abbreviationAlias = 'll.abbreviation';
		this.nameAlias = 'll.name';

	}

	public static getInstance() : LevelSearch {

		return new LevelSearch();
	}

}