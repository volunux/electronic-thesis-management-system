import { SearchQueryOptions } from './common/SearchQueryOptions';
import { EntryPrivilege } from '../entry/EntryPrivilege';
import { AbstractEntitySearch } from './abstract/AbstractEntitySearch';

export class AttachmentSearch extends AbstractEntitySearch {

	protected emailAddressAlias : string = 'usr.emailAddress';

	protected usernameAlias : string = 'usr.username';

	protected matriculationNumberAlias : string = 'usr.matriculation_number';

	constructor() {

		super();

		this.statusAlias = 'us.name';
		this.updatedOnAlias = 'usr.updated_on';

	}

	public static getInstance() : AttachmentSearch {

		return new AttachmentSearch();
	}

	public emailAddress(parameter : string) : SearchQueryOptions {

			let emailAddress : string = parameter;

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.emailAddressAlias + " LIKE '%" + emailAddress + "%'");

			return this.searchQueryOptions;
	
		}

	public username(parameter : string) : SearchQueryOptions {

			let username : string = parameter;

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.usernameAlias + " LIKE '%" + username + "%'");

			return this.searchQueryOptions;
	
		}

}