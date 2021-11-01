import { AbstractEntityTwoSearch } from './abstract/AbstractEntityTwoSearch';

export class ThesisGradeSearch extends AbstractEntityTwoSearch {

	constructor() {

		super();

		this.statusAlias = 'gs.name';
		this.updatedOnAlias = 'thgrd.updated_on';
		this.wordAlias = 'thgrd.word';
		this.nameAlias = 'thgrd.name';

	}

	public static getInstance() : ThesisGradeSearch {

		return new ThesisGradeSearch();
	}

}