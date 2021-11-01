import { AbstractFileValidator } from './AbstractFileValidator';
import aws from 'aws-sdk';

export class ImageValidator extends AbstractFileValidator {

	constructor(s3Instance : aws.S3 ,  s3Configuration : aws.ConfigurationOptions) {

		super(s3Instance , s3Configuration);

	}

	public static getInstance(s3Instance : aws.S3 ,  s3Configuration : aws.ConfigurationOptions) : ImageValidator {

		return new ImageValidator(s3Instance , s3Configuration);
	}

}