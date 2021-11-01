import { AbstractEntityTwoSearch } from './abstract/AbstractEntityTwoSearch';
import { SearchQueryOptions } from './common/SearchQueryOptions';

export class OrderStatusSearch extends AbstractEntityTwoSearch {

	protected titleAlias : string = 'title';

	constructor() {

		super();

		this.statusAlias = 'gs.name';
		this.updatedOnAlias = 'ths.updated_on';
		this.wordAlias = 'ths.word';
		this.nameAlias = 'ths.name';

	}

	public static getInstance() : OrderStatusSearch {

		return new OrderStatusSearch();
	}

	public title(parameter : string) : SearchQueryOptions {

			let title : string = parameter;

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.titleAlias + " LIKE '%" + title + "%'");

			return this.searchQueryOptions;
	}

}