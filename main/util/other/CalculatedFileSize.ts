export class CalculatedFileSize {

	private totalFileSize : number;
	private calculatedSize : string;
	private fileSizeUnit : string[];

	constructor(data : any) {

		this.totalFileSize = data.totalFileSize ? data.totalFileSize : 1024;
		this.calculatedSize = data.totalFileSize ? data.totalFileSize : this.totalFileSize.toString();
		this.fileSizeUnit = data.fileSizeUnit ? data.fileSizeUnit : ["kilobytes" , "kb"];
	}

	public getTotalFileSize() : number {

		return this.totalFileSize;
	}

	public getCalculatedSize() : string {

		return this.calculatedSize;
	}

	public getFileSizeUnit() : string[] {

		return this.fileSizeUnit;
	}

}