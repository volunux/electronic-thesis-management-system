import { SearchQueryOptions } from './common/SearchQueryOptions';
import { AbstractEntitySearch } from './abstract/AbstractEntitySearch';

export class EmailMessageTemplateSearch extends AbstractEntitySearch {

	protected titleAlias : string = 'emt.title';
	protected typeAlias : string = 'emt.message_type';

	constructor() {

		super();

		this.statusAlias = 'us.name';
		this.updatedOnAlias = 'usr.updated_on';

	}

	public static getInstance() : EmailMessageTemplateSearch {

		return new EmailMessageTemplateSearch();
	}

	public title(parameter : string) : SearchQueryOptions {

			let title : string = parameter;

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.titleAlias + " LIKE '%" + title + "%'");

			return this.searchQueryOptions;
	
		}

	public messageType(parameter : string) : SearchQueryOptions {

			let messageType : string = parameter;

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.typeAlias + " LIKE '%" + messageType + "%'");

			return this.searchQueryOptions;
	
		}

}