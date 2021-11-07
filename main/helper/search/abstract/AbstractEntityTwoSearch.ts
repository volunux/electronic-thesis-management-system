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

			let word : string = parameter.split(' ').map((token) => { return token[0].toUpperCase() + token.slice(1).toLowerCase(); }).join(' ');

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.wordAlias + " LIKE '%" + word + "%'");

			return this.searchQueryOptions;
	}

}