import { AbstractEntityOneSearch } from './abstract/AbstractEntityOneSearch';

export class DepartmentSearch extends AbstractEntityOneSearch {

	constructor() {

		super();

		this.statusAlias = 'gs.name';
		this.updatedOnAlias = 'dt.updated_on';
		this.abbreviationAlias = 'dt.abbreviation';
		this.nameAlias = 'dt.name';

	}

	public static getInstance() : DepartmentSearch {

		return new DepartmentSearch();
	}

}