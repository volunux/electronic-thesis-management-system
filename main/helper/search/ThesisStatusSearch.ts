import { AbstractEntityTwoSearch } from './abstract/AbstractEntityTwoSearch';

export class ThesisStatusSearch extends AbstractEntityTwoSearch {

	constructor() {

		super();

		this.statusAlias = 'gs.name';
		this.updatedOnAlias = 'ths.updated_on';
		this.wordAlias = 'ths.word';
		this.nameAlias = 'ths.name';

	}

	public static getInstance() : ThesisStatusSearch {

		return new ThesisStatusSearch();
	}

}