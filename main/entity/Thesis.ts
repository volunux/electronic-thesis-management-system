import { EntityAll } from './abstract/EntityAll';
import { Faculty } from './Faculty';
import { Department } from './Department';
import { ThesisGrade } from './ThesisGrade';
import { Publisher } from './Publisher';
import { ThesisStatus } from './ThesisStatus';

export class Thesis extends EntityAll {

	constructor(data : any) {

		super(data);

		this.title = data.title ? data.title : undefined;
		this.price = data.price ? data.price : undefined;
		this.content = data.content ? data.content : undefined;
		this.number_of_page = data.number_of_page ? data.number_of_page : undefined;
		this.grade = data.grade ? data.grade : undefined;
		this.department = data.department ? data.department : undefined;
		this.faculty = data.faculty ? data.faculty : undefined;
		this.supervisor = data.supervisor ? data.supervisor : "Not Available";
		this.publication_year = data.publication_year ? data.publication_year : 1400;
		this.publisher = data.publisher ? data.publisher : undefined;
		this.author_id = data.author_id ? data.author_id : 1;
		this.author_name = data.author_name ? data.author_name : undefined;
		this.cover_image = data.cover_image ? data.cover_image : "Not Available";
		this.faculties = data.faculties ? data.faculties : [];
		this.departments = data.departments ? data.departments : [];
		this.thesisGrades = data.thesisGrades ? data.thesisGrades : [];
		this.publishers = data.publishers ? data.publishers : [];
		this.thesisStatuses = data.thesisStatuses ? data.thesisStatuses : []; 
	}

	private title : string;
	private price : string;
	private content : string;
	private number_of_page : number;
	private grade : string;

	private department : string;
	private faculty : string;

	private publisher : string;
	private supervisor : string;
	private publication_year : string;

	private author_id : number;
	private author_name : string;

	private cover_image : string;

	private faculties : Faculty[];
	private departments : Department[];
	private thesisGrades : ThesisGrade[];
	private publishers : Publisher[];
	private thesisStatuses : ThesisStatus[];

	public getTitle() : string {

		return this.title;
	}

	public getPrice() : string {

		return this.price;
	}

	public getPublisher() : string {

		return this.publisher;
	}

	public getContent() : string {

		return this.content;
	}

	public getNumberOfPage() : number {

		return this.number_of_page;
	}

	public getGrade() : string {

		return this.grade;
	}

	public getDepartment() : string {

		return this.department;
	}

	public getFaculty() : string {

		return this.faculty;
	}

	public getSupervisor() : string {

		return this.supervisor;
	}

	public getPublicationYear() : string {

		return this.publication_year;
	}

	public getAuthorId() : number {

		return this.author_id;
	}

	public getAuthorName() : string {

		return this.author_name;
	}

	public getCoverImage() : string {

		return this.cover_image;
	}

	public setAuthorId(author_id : number) {

		this.author_id = author_id;
	}

	public getFaculties() : Faculty[] {

		return this.faculties;
	}

	public setFaculties(faculties : Faculty[]) : void {

		this.faculties = faculties;
	}

	public getDepartments() : Department[] {

		return this.departments;
	}

	public setDepartments(departments : Department[]) : void {

		this.departments = departments;
	}

	public getThesisGrades() : ThesisGrade[] {

		return this.thesisGrades;
	}

	public setThesisGrades(thesisGrades : ThesisGrade[]) : void {

		this.thesisGrades = thesisGrades;
	}

	public getPublishers() : Publisher[] {

		return this.publishers;
	}	

	public setPublishers(publishers : Publisher[]) : void {

		this.publishers = publishers;
	}

	public getThesisStatuses() : ThesisStatus[] {

		return this.thesisStatuses;
	}

	public setThesisStatuses(thesisStatuses : ThesisStatus[]) : void {

		this.thesisStatuses = thesisStatuses;
	}

}