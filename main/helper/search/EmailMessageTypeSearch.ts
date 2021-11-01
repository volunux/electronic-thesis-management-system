import { SearchQueryOptions } from './common/SearchQueryOptions';
import { AbstractEntitySearch } from './abstract/AbstractEntitySearch';

export class EmailMessageTypeSearch extends AbstractEntitySearch {

	protected titleAlias : string = 'emt.title';

	constructor() {

		super();

		this.statusAlias = 'us.name';
		this.updatedOnAlias = 'usr.updated_on';

	}

	public static getInstance() : EmailMessageTypeSearch {

		return new EmailMessageTypeSearch();
	}

	public title(parameter : string) : SearchQueryOptions {

			let title : string = parameter;

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.titleAlias + " LIKE '%" + title + "%'");

			return this.searchQueryOptions;
	
		}

}