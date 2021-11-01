import { SearchQueryOptions } from '../common/SearchQueryOptions';
import { AbstractEntitySearch } from './AbstractEntitySearch';

export class AbstractEntityOneSearch extends AbstractEntitySearch {

	protected nameAlias : string = 'name';
	protected abbreviationAlias : string = 'abbreviation';

	constructor() {

		super();

	}

	public label(parameter : string) : SearchQueryOptions {

			let name : string = parameter;

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.nameAlias + " LIKE '%" + name + "%'");

			return this.searchQueryOptions;
	}

	public abbreviation(parameter : string) : SearchQueryOptions {

			let abbreviation : string = parameter.toUpperCase().split(' ').join('');

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.abbreviationAlias + " LIKE '%" + abbreviation + "%'");

			return this.searchQueryOptions;
	}

}