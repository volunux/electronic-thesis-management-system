import { AbstractEntityTwoSearch } from './abstract/AbstractEntityTwoSearch';

export class SendMailSearch extends AbstractEntityTwoSearch {

	constructor() {

		super();

		this.statusAlias = 'gs.name';
		this.updatedOnAlias = 'thgrd.updated_on';
		this.wordAlias = 'thgrd.word';
		this.nameAlias = 'thgrd.name';

	}

	public static getInstance() : SendMailSearch {

		return new SendMailSearch();
	}

}