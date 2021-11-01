import { FileConfigurerImpl } from './FileConfigurerImpl';

export class PhotoConfigurer extends FileConfigurerImpl {

	constructor() {

		super();

	}

	public static getInstance() : PhotoConfigurer {

		return new PhotoConfigurer();
	}

}