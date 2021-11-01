import { AbstractFileUploader } from './AbstractFileUploader';
import aws from 'aws-sdk';

export class DocumentUploader extends AbstractFileUploader {

	constructor(s3Instance : aws.S3 ,  s3Configuration : aws.ConfigurationOptions) {

		super(s3Instance , s3Configuration);
	}

	public static getInstance(s3Instance : aws.S3 ,  s3Configuration : aws.ConfigurationOptions) : DocumentUploader {

		return new DocumentUploader(s3Instance , s3Configuration);
	}

}