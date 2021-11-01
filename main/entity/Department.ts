import { EntityOne } from './abstract/EntityOne';
import { Faculty } from './Faculty';

export class Department extends EntityOne {

	constructor(data : any) {

		super(data);

		this.faculty = data.faculty ? data.faculty : undefined;
		this.faculties = data.faculties ? data.faculties : [];
	}

	private faculty : string;
	private faculties : Faculty[];

	public getFaculty() : string {

		return this.faculty;
	}

	public getFaculties() : Faculty[] {

		return this.faculties;
	}

	public setFaculties(faculties : Faculty[]) : void {

		this.faculties = faculties;
	}

}