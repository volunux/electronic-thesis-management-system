import { SearchQueryOptions } from '../common/SearchQueryOptions';

export abstract class AbstractEntitySearch {

	protected searchQueryOptions : SearchQueryOptions = SearchQueryOptions.getInstance();
	protected statusAlias : string = 'gs.name';
	protected updatedOnAlias : string = 'updated_on';

	constructor() {

	}

	public status(parameter : string) : SearchQueryOptions {

			let status : string = parameter.toLowerCase();

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.statusAlias + " = " + "'" + status + "'");

			return this.searchQueryOptions;
	}

	public minDate(parameter : string) : SearchQueryOptions {

			let updatedMin : string = parameter;

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.updatedOnAlias + " <= " + "'" + updatedMin + "'");

			return this.searchQueryOptions;	
	}

	public maxDate(parameter : string) : SearchQueryOptions {

			let updatedMax : string = parameter;

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.updatedOnAlias + " >= " + "'" + updatedMax + "'");

			return this.searchQueryOptions;
	}

}