import { SearchQueryOptions } from './common/SearchQueryOptions';
import { AbstractEntityThreeSearch } from './abstract/AbstractEntityThreeSearch';

export class DeliveryMethodSearch extends AbstractEntityThreeSearch {

	constructor() {

		super();

		this.statusAlias = 'gs.name';
		this.updatedOnAlias = 'dm.updated_on';
		this.titleAlias = 'dm.title';

	}

	public static getInstance() : DeliveryMethodSearch {

		return new DeliveryMethodSearch();
	}

}