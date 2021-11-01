import { SearchQueryOptions } from '../common/SearchQueryOptions';
import { AbstractEntitySearch } from './AbstractEntitySearch';

export class AbstractEntityTwoSearch extends AbstractEntitySearch {

	protected nameAlias : string = 'name';
	protected wordAlias : string = 'word';

	constructor() {

		super();

	}

	public label(parameter : string) : SearchQueryOptions {

			let name : string = parameter;

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.nameAlias + " LIKE '%" + name + "%'");

			return this.searchQueryOptions;
	}

	public word(parameter : string) : SearchQueryOptions {

			let word : string = parameter.toUpperCase().split(' ').join('');

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.wordAlias + " LIKE '%" + word + "%'");

			return this.searchQueryOptions;
	}

}