import { AbstractFileMagic } from './AbstractFileMagic';

export class PhotoMagic implements AbstractFileMagic {

	public static getInstance() : PhotoMagic {

		return new PhotoMagic();
	}

	private signatureList : Map<string , string> = new Map<string , string>();

	private mimeTypeList : string[] = ['image/jpg' , 'image/jpg1' , 'image/jpeg' , 'image/png' , 'image/png1' , 'image/bmp' , 'image/gif' , 'image/tiff' , 'image/webp' , 'image/x-icon'];

	private addSignaturesToList() : void {

		if (this.signatureList.size < 1) {

		this.signatureList.set('jpg' , 'ffd8ffe0');
		this.signatureList.set('jpg1' , 'ffd8ffe1');
		this.signatureList.set('png' , '89504e47');
		this.signatureList.set('gif' , '47494638');
		this.signatureList.set('ico' , '00000100');	}

	}

	public getSignature(key : string) : string | undefined {

		if (this.signatureList.size < 1) this.addSignaturesToList();

		return this.signatureList.get(key);
	}

	public verifySignature(magic : string) : boolean {

		if (magic == this.getSignature('jpg') || magic == this.getSignature('jpg1') || magic == this.getSignature('png')  

			|| magic == this.getSignature('gif') || magic == this.getSignature('png1') || magic == this.getSignature('ico')) { return true; } 

		else { return false; }

	}

	public getMimetypeList() : string[] {

		return this.mimeTypeList;
	}

}