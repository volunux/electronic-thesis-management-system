import { AbstractFileMagic } from './AbstractFileMagic';

export class DocumentMagic implements AbstractFileMagic {

	public static getInstance() : DocumentMagic {

		return new DocumentMagic();
	}

	private signatureList : Map<string , string> = new Map<string , string>(); 

	private mimeTypeList : string[] = ['application/pdf' , 'application/docx' , 'application/doc' , 'application/octet-stream'];

	private addSignaturesToList() : void {

		this.signatureList.set('pdf' , '25504446');
		this.signatureList.set('docx', '504B0304');
		this.signatureList.set('doc' , '0D444F43');
		this.signatureList.set('docx2' , 'DBA52D00');
		this.signatureList.set('docx3' , 'D0CF11E0');

	}

	public getSignature(key : string) : string | undefined {

		if (this.signatureList.size < 1) this.addSignaturesToList();

		return this.signatureList.get(key);
	}

	public verifySignature(magic : string) : boolean {

		if (magic == this.getSignature('pdf') || magic == this.getSignature('docx') || magic == this.getSignature('doc') 

			|| magic == this.getSignature('docx2') || magic == this.getSignature('docx3')) { return true; } 

		else { return false; }
	}

	public getMimetypeList() : string[] {

		return this.mimeTypeList;
	}

}