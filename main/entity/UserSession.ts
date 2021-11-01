export class UserSession {

	constructor(data : any) {

		this._id = data._id ? data._id : 1;
		this.email_address = data.email_address ? data.email_address : undefined;
		this.username = data.username ? data.username : undefined;
		this.hash = data.hash ? data.hash : "";
		this.salt = data.salt ? data.salt : "";
		this.role = data.role ? data.role : "";
		this.department = data.department ? data.department : undefined;
		this.faculty = data.faculty ? data.faculty : undefined;
		this.level = data.level ? data.level : undefined;
		this.user_status = data.user_status ? data.user_status : undefined;

	}

	private _id : number;

	private email_address : string;
	private username : string;

	private hash : string;
	private salt : string;
	private role : string;

	private department : string;
	private faculty : string;
	private level : string;

	private user_status : string;

	public getId() : number {

		return this._id;
	}

	public getEmailAddress() : string {

		return this.email_address;
	}

	public getUsername() : string {

		return this.username;
	}

	public getHash() : string {

		return this.hash;
	}

	public getSalt() : string {

		return this.salt;
	}

	public getRole() : string {

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

	public getUserStatus() : string {

		return this.user_status;
	}

	public setRole(role : string) : void {

		this.role = role;
	}

	public setSalt(salt : string) : void {

		this.salt = salt;
	}

	public setHash(hash : string) : void {

		this.hash = hash;
	}

	public setUserStatus(userStatus : string) : void {

		this.user_status = userStatus;
	}	

	public getUserRole() : string {

		return this.role;
	}

}