import { SearchQueryOptions } from './common/SearchQueryOptions';
import { AbstractEntityThreeSearch } from './abstract/AbstractEntityThreeSearch';

export class PaymentMethodSearch extends AbstractEntityThreeSearch {

	constructor() {

		super();

		this.statusAlias = 'gs.name';
		this.updatedOnAlias = 'pm.updated_on';
		this.titleAlias = 'pm.title';

	}

	public static getInstance() : PaymentMethodSearch {

		return new PaymentMethodSearch();
	}

}