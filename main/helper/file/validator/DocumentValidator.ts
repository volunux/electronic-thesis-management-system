import { AbstractFileValidator } from './AbstractFileValidator';
import aws from 'aws-sdk';

export class DocumentValidator extends AbstractFileValidator {

	constructor(s3Instance : aws.S3 ,  s3Configuration : aws.ConfigurationOptions) {

		super(s3Instance , s3Configuration);

	}

	public static getInstance(s3Instance : aws.S3 ,  s3Configuration : aws.ConfigurationOptions) : DocumentValidator {

		return new DocumentValidator(s3Instance , s3Configuration);
	}

}