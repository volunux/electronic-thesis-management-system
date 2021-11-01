import { FileConfigurerImpl } from './FileConfigurerImpl';

export class DocumentConfigurer extends FileConfigurerImpl {

	constructor() {

		super();

	}

	public static getInstance() : DocumentConfigurer {

		return new DocumentConfigurer();
	}

}