import { Status } from '../Status';

export abstract class EntityAll {

	constructor(data : any) {

		this._id = data._id ? data._id : undefined;
		this.created_on = data.created_on ? data.created_on : undefined;
		this.updated_on = data.updated_on ? data.updated_on : undefined;
		this.slug = data.slug ? data.slug : undefined;
		this.num = data.num ? data.num : undefined;
		this.user_id = data.user_id ? data.user_id : undefined;
		this.status = data.status ? data.status : "1";
		this.statuses = data.statuses ? data.statuses : [];
	}

	private _id : number;
	private created_on : Date;
	private updated_on : Date;
	private num : number;
	private slug : string;
	private user_id : number;
	private status : string;
	private statuses : Status[];


	public getId() : number {

		return this._id
	}

	public getCreatedOn() : Date {

		return this.created_on;
	}

	public getUpdatedOn() : Date {

		return this.updated_on;
	}

	public getNum() : number {

		return this.num;
	}

	public getSlug() : string {

		return this.slug;
	}

	public getUserId() : number {

		return this.user_id;
	}

	public getStatus() : string {

		return this.status;
	}

	public setUserId(userId : number) : void {

		this.user_id = userId;
	}

	public getStatuses() : Status[] {

		return this.statuses;
	}

	public setStatuses(statuses : Status[]) : void {

		this.statuses = statuses;
	}

}