import { SearchQueryOptions } from '../common/SearchQueryOptions';
import { AbstractEntitySearch } from './AbstractEntitySearch';

export class AbstractEntityThreeSearch extends AbstractEntitySearch {

	protected titleAlias : string = 'title';
	protected abbreviationAlias : string = 'abbreviation';

	constructor() {

		super();

	}

	public title(parameter : string) : SearchQueryOptions {

			let title : string = parameter;

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.titleAlias + " LIKE '%" + title + "%'");

			return this.searchQueryOptions;
	}

}