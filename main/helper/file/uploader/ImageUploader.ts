import { AbstractFileUploader } from './AbstractFileUploader';
import aws from 'aws-sdk';

export class ImageUploader extends AbstractFileUploader {

	constructor(s3Instance : aws.S3 ,  s3Configuration : aws.ConfigurationOptions) {

		super(s3Instance , s3Configuration);
	}

	public static getInstance(s3Instance : aws.S3 ,  s3Configuration : aws.ConfigurationOptions) : ImageUploader {

		return new ImageUploader(s3Instance , s3Configuration);
	}

}