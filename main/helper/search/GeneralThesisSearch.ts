import { AbstractEntityThesisSearch } from './abstract/AbstractEntityThesisSearch';

export class GeneralThesisSearch extends AbstractEntityThesisSearch {

	constructor() {

		super();

	}

	public static getInstance() : GeneralThesisSearch {

		return new GeneralThesisSearch();
	}

}