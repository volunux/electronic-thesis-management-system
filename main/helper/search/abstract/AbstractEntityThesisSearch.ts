import { SearchQueryOptions } from '../common/SearchQueryOptions';
import { AbstractEntitySearch } from './AbstractEntitySearch';

export abstract class AbstractEntityThesisSearch extends AbstractEntitySearch {

	protected titleAlias : string = 'th.title';
	protected publicationYearAlias : string = 'th.publication_year';

	constructor() {

		super();

		this.statusAlias = 'ths.name'
		this.updatedOnAlias = 'th.updated_on';

	}

	public title(parameter : string) : SearchQueryOptions {

			let title : string = parameter;

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.titleAlias + " LIKE '%" + title + "%'");

			return this.searchQueryOptions;
	}

	public publicationYear(parameter : string) : SearchQueryOptions {

			let publicationYear : string = parameter;

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.publicationYearAlias + " = '" + publicationYear + '\'');

			return this.searchQueryOptions;
	
	}

}