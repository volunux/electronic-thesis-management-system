export class EntryPrivilege {

	constructor(nPrivilege : string[] , sPrivilege : string[] , lPrivilege : string[]) {

		this.nPrivilege = nPrivilege;
		this.sPrivilege = sPrivilege;
		this.lPrivilege = lPrivilege;
	}

	private nPrivilege : string[] = new Array();
	private sPrivilege : string[] = new Array();
	private lPrivilege : string[] = new Array();

	public getNPrivilege() : string[] {

		return this.nPrivilege;
	}

	public getSPrivilege() : string[] {

		return this.sPrivilege;
	}

	public getLPrivilege() : string[] {

		return this.lPrivilege;
	}

}