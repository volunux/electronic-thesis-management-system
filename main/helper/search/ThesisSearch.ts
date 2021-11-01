import { AbstractEntityThesisSearch } from './abstract/AbstractEntityThesisSearch';

export class ThesisSearch extends AbstractEntityThesisSearch {

	constructor() {

		super();

	}

	public static getInstance() : ThesisSearch {

		return new ThesisSearch();
	}

}