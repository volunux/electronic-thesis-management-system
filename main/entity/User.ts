import { EntityAll } from './abstract/EntityAll';
import { Faculty } from './Faculty';
import { Department } from './Department';
import { Level } from './Level';
import { Country } from './Country';
import { Role } from './Role';
import { UserStatus } from './UserStatus';

export class User extends EntityAll {

	constructor(data : any) {

		super(data);

		this.first_name = data.first_name ? data.first_name : undefined;
		this.last_name = data.last_name ? data.last_name : undefined;
		this.email_address = data.email_address ? data.email_address : undefined;
		this.username = data.username ? data.username : undefined;
		this.password = data.password ? data.password : "";
		this.confirm_password = data.confirm_password ? data.confirm_password : "";
		this.about = data.about ? data.about : "Not Available";
		this.matriculation_number = data.matriculation_number ? data.matriculation_number : undefined;
		this.hash = data.hash ? data.hash : "";
		this.salt = data.salt ? data.salt : "";
		this.role = data.role ? (typeof data.role == "string" ? new Array(data.role) : data.role) : [];
		this.user_role_id = data.user_role_id ? data.user_role_id : 1;
		this.department = data.department ? data.department : undefined;
		this.faculty = data.faculty ? data.faculty : undefined;
		this.level = data.level ? data.level : undefined;
		this.country = data.country ? data.country : undefined;
		this.last_logged_in_date = data.last_logged_in_date ? data.last_logged_in_date : undefined;
		this.user_status = data.user_status ? data.user_status : undefined;
		this.user_profile_photo = data.user_profile_photo ? data.user_profile_photo : undefined;
		this.user_signature = data.user_signature ? data.user_signature : undefined;
		this.faculties = data.faculties ? data.faculties : [];
		this.departments = data.departments ? data.departments : [];
		this.levels = data.levels ? data.levels : [];
		this.countries = data.coutnries ? data.countries : [];
		this.roles = data.roles ? data.roles : [];
		this.user_statuses = data.user_statuses ? data.user_statuses : [];
	}

	private first_name : string;
	private last_name : string;

	private email_address : string;
	private username : string;
	private password : string;
	private confirm_password : string;
	private about : string;

	private matriculation_number : string;

	private hash : string;
	private salt : string;
	private role : number[];

	private department : string;
	private faculty : string;
	private level : string;
	private country : string;

	private last_logged_in_date : Date;

	private user_status : string;
	private user_profile_photo : string;
	private user_signature : string;
	private user_role_id : number;

	private faculties : Faculty[];
	private departments : Department[];
	private levels : Level[];
	private countries : Country[];
	private roles : Role[];
	private user_statuses : UserStatus[];

	public getFirstName() : string {

		return this.first_name;
	}

	public setFirstName(first_name : string) : void {

		this.first_name = first_name;
	}

	public getLastName() : string {

		return this.last_name;
	}

	public setLastName(last_name : string) : void {

		this.last_name = last_name;
	}

	public getEmailAddress() : string {

		return this.email_address;
	}

	public setEmailAddress(email_address : string) : void {

		this.email_address = email_address;
	}

	public getUsername() : string {

		return this.username;
	}

	public getPassword() : string {

		return this.password;
	}

	public getConfirmPassword() : string {

		return this.confirm_password;
	}

	public getAbout() : string {

		return this.about;
	}

	public getMatriculationNumber() : string {

		return this.matriculation_number;
	}

	public getHash() : string {

		return this.hash;
	}

	public getSalt() : string {

		return this.salt;
	}

	public getRole() : number[] {

		return this.role;
	}

	public getDepartment() : string {

		return this.department;
	}

	public getFaculty() : string {

		return this.faculty;
	}

	public getLevel() : string {

		return this.level;
	}

	public getCountry() : string {

		return this.country;
	}

	public getLastLoggedInDate() : Date {

		return this.last_logged_in_date;
	}

	public getUserStatus() : string {

		return this.user_status;
	}

	public getUserProfilePhoto() : string {

		return this.user_profile_photo;
	}

	public getUserSignature() : string {

		return this.user_signature;
	}

	public getUserRoleId() : number {

		return this.user_role_id;
	}

	public setRole(role : number[]) : void {

		this.role = role;
	}

	public setSalt(salt : string) : void {

		this.salt = salt;
	}

	public setHash(hash : string) : void {

		this.hash = hash;
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

	public getLevels() : Level[] {

		return this.levels;
	}

	public setLevels(levels : Level[]) : void {

		this.levels = levels;
	} 

	public getCountries() : Country[] {

		return this.countries;
	}

	public setCountries(countries : Country[]) : void {

		this.countries = countries;
	}

	public getRoles() : Role[] {

		return this.roles;
	}

	public setRoles(roles : Role[]) : void {

		this.roles = roles;
	}

	public getUserStatuses() : UserStatus[] {

		return this.user_statuses;
	}

	public setUserStatuses(userStatuses : UserStatus[]) : void {

		this.user_statuses = userStatuses;
	}

	public setPassword(password : string) : void {

		this.password = password;
	}

}