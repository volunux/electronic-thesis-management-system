import { AbstractEntityTwoSearch } from './abstract/AbstractEntityTwoSearch';

export class ThesisReplySearch extends AbstractEntityTwoSearch {

	constructor() {

		super();

		this.statusAlias = 'gs.name';
		this.updatedOnAlias = 'rl.updated_on';
		this.wordAlias = 'rl.word';
		this.nameAlias = 'rl.name';

	}

	public static getInstance() : ThesisReplySearch {

		return new ThesisReplySearch();
	}

}