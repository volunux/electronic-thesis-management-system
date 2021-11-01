export class Attachment {
	
	private filename : string = '';
	private mimekey : string = '';
	private location : string = '';
	private key : string = '';
	private size : string = '';
	private encoding : string = '';
	private user_id : number = 0;

	constructor(data : any) {

			this.filename = data.filename ? data.filename : undefined;
			this.mimekey = data.mimekey ? data.mimekey : undefined;
			this.location = data.location ? data.location : undefined;
			this.key = data.key ? data.key : undefined;
			this.size = data.size ? data.size : undefined;
			this.encoding = data.encoding ? data.encoding : undefined;
			this.user_id = data.user_id ? data.user_id : undefined;
	}

	public getFilename() : string {

		return this.filename;
	}

	public getMimekey() : string {

		return this.mimekey;
	}

	public getLocation() : string {

		return this.location;
	}

	public getKey() : string {

		return this.key;
	}

	public getSize() : string {

		return this.size;
	}

	public getEncoding() : string {

		return this.encoding;
	}

	public setFileName(filename : string) : void {

		this.filename = filename;
	}

	public setMimekey(mimekey : string) : void {

		this.mimekey = mimekey;
	}

	public setLocation(location : string) : void {

		this.location = location;
	}

	public setKey(key : string) : void {

		this.key = key;
	}

	public setSize(size : string) : void {

		this.size = size;
	} 

	public setEncoding(encoding : string) : void {

		this.encoding = encoding;
	}

	public getUserId() : number {

		return this.user_id;
	}

	public setUserId(user_id : number) : void {

		this.user_id = user_id;
	}

}