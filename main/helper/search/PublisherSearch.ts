import { AbstractEntityOneSearch } from './abstract/AbstractEntityOneSearch';

export class PublisherSearch extends AbstractEntityOneSearch {

	constructor() {

		super();

		this.statusAlias = 'gs.name';
		this.updatedOnAlias = 'pub.updated_on';
		this.abbreviationAlias = 'pub.abbreviation';
		this.nameAlias = 'pub.name';

	}

	public static getInstance() : PublisherSearch {

		return new PublisherSearch();
	}

}