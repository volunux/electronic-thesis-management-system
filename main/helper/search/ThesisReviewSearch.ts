import { AbstractEntityTwoSearch } from './abstract/AbstractEntityTwoSearch';

export class ThesisReviewSearch extends AbstractEntityTwoSearch {

	constructor() {

		super();

		this.statusAlias = 'gs.name';
		this.updatedOnAlias = 'ths.updated_on';
		this.wordAlias = 'ths.word';
		this.nameAlias = 'ths.name';

	}

	public static getInstance() : ThesisReviewSearch {

		return new ThesisReviewSearch();
	}

}