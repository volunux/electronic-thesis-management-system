export class ThesisDocument {

	constructor(data : any) {


		this.thesis_document_id = data.id ? data.id : undefined;
		this.location = data.location ? data.location : "Not Available";
		this.mimetype = data.mimetype ? data.mimetype : "Not Available";
		this.size = data.size ? data.size : 100;
		this.key = data.key ? data.key : "Not Available";
		this.created_on = data.created_on ? data.created_on : undefined;
		this.updated_on = data.updated_on ? data.updated_on : undefined;
		this.slug = data.slug ? data.slug : undefined;
		this.thesis_document_no = data.thesis_document_no ? data.thesis_document_no : undefined;
		this.user_id = data.user_id ? data.user_id : 0;
		this.thesis_id =  data.thesis_id ? data.thesis_id : undefined;
		this.status = data.status ? data.status : "1";
	}

	private thesis_document_id : number;
	private location : string;
	private mimetype : string;
	private size : string;
	private key : string;
	private created_on : Date;
	private updated_on : Date;
	private thesis_document_no : number;
	private slug : string;
	private user_id : number;
	private thesis_id : string;
	private status : string;


	public getId() : number {

		return this.thesis_document_id
	}

	public getLocation() : string {

		return this.location;
	}

	public getMimetype() : string {

		return this.mimetype;
	}

	public getSize() : string {

		return this.size;
	}

	public getKey() : string {

		return this.key;
	}

	public getCreatedOn() : Date {

		return this.created_on;
	}

	public getUpdatedOn() : Date {

		return this.updated_on;
	}

	public getThesisDocumentNo() : number {

		return this.thesis_document_no;
	}

	public getSlug() : string {

		return this.slug;
	}

	public getUserId() : number {

		return this.user_id;
	}

	public getThesisId() : string {

		return this.thesis_id;
	}

	public getStatus() : string {

		return this.status;
	}

	public setThesisId(thesisId : string) : void {

		this.thesis_id = thesisId;
	}

	public setUserId(userId : number) : void {

		this.user_id = userId;
	}

}