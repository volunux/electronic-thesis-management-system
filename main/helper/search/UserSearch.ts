import { SearchQueryOptions } from './common/SearchQueryOptions';
import { EntryPrivilege } from '../entry/EntryPrivilege';
import { AbstractEntitySearch } from './abstract/AbstractEntitySearch';

export class UserSearch extends AbstractEntitySearch {

	protected emailAddressAlias : string = 'usr.email_address';

	protected matriculationNumberAlias : string = 'usr.matriculation_number';

	constructor() {

		super();

		this.statusAlias = 'us.name';
		this.updatedOnAlias = 'usr.updated_on';

	}

	public static getInstance() : UserSearch {

		return new UserSearch();
	}

	public emailAddress(parameter : string) : SearchQueryOptions {

			let emailAddress : string = parameter;

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.emailAddressAlias + " LIKE '%" + emailAddress + "%'"); 

			return this.searchQueryOptions;
	
		}

	public matriculationNumber(parameter : string) : SearchQueryOptions {

			let matriculationNumber : string = parameter;

			this.searchQueryOptions.getSearchQueryConditionOptions().add("one" , "WHERE " + this.matriculationNumberAlias + " LIKE '%" + matriculationNumber + "%'");

			return this.searchQueryOptions;
	
		}
}