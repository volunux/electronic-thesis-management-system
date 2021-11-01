import { AbstractEntityOneSearch } from './abstract/AbstractEntityOneSearch';

export class FacultySearch extends AbstractEntityOneSearch {

	constructor() {

		super();

		this.statusAlias = 'gs.name';
		this.updatedOnAlias = 'ft.updated_on';
		this.abbreviationAlias = 'ft.abbreviation';
		this.nameAlias = 'ft.name';

	}

	public static getInstance() : FacultySearch {

		return new FacultySearch();
	}

}