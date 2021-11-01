import { Request , Response , RequestHandler , NextFunction } from 'express';
import fs from 'fs';
import aws from 'aws-sdk';
import { FileOptions } from '../others/FileOptions';

export class BrowserDirectS3Uploader {

	public static async fromFileSystem(s3 : aws.S3 , fileName : string , bucketName : string) : Promise<void> {

		const fileContent : Buffer = fs.readFileSync(fileName);

		const params : aws.S3.PutObjectRequest = {

			'Bucket' : (<NodeJS.ProcessEnv>process.env)[bucketName] as string ,

			'Key' : FileOptions.generateUUID() + '.' + FileOptions.getFileExtension(fileName) ,

			'Body' : fileContent };

		  try {

		  	let uploadedObject : aws.S3.ManagedUpload.SendData = await s3.upload(params).promise();

				console.log('File successfully uploaded'); }

			catch(err : any) {

				console.log((<Error>err)); }
	}

	public static fromRequest(s3 : aws.S3 , bucketName : string , fileExtension : string) : RequestHandler {

		return async function (req : Request , res : Response , next : NextFunction) : Promise<void> {

			const params : aws.S3.PutObjectRequest = {

				'Bucket' : (<NodeJS.ProcessEnv>process.env)[bucketName] as string ,

				'Key' : FileOptions.generateUUID() ,

				'Body' : req };

			  try {

			  	let uploadedObject : aws.S3.ManagedUpload.SendData = await s3.upload(params).promise();

					console.log('File successfully uploaded'); }

				catch(err : any) {

					console.log((<Error>err)); }
			}
	}

	public static fromJsonRequest(s3 : aws.S3 , bucketName : string , fileExtension : string , contentType : string) : RequestHandler {

		return async function(req : Request , res : Response , next : NextFunction) : Promise<void> {

			let s3 : aws.S3 = new aws.S3({});

			const { id , fileName } = JSON.parse((req.get('body') as string));
		  
		  const Key = id + '/' + fileName; //upload to s3 folder "id" with filename === fn
		  
		  const params : aws.S3.PutObjectRequest = {
		   
		    'Key' : Key ,

		    'Bucket' : bucketName ,

		    'Body' : req ,

		    'ContentType' : contentType };

			  try {

			  	let uploadedObject : aws.S3.ManagedUpload.SendData = await s3.upload(params).promise();

					res.send(Key);

					console.log('File successfully uploaded'); }

				catch(err : any) {

					res.send('Error Uploading Data: ' + JSON.stringify(err) + '\n' + JSON.stringify(err.stack)); }
		}
	}

	public static async createBucket(bucketName : string) : Promise<void> {

		let s3 : aws.S3 = new aws.S3({});

	  const params : aws.S3.CreateBucketRequest = {

	    'Bucket' : bucketName ,

	    'CreateBucketConfiguration' : {

	    	'LocationConstraint' : 'eu-west-1' } };

		  try {

		  	let createdBucket : aws.S3.CreateBucketOutput = await s3.createBucket(params).promise(); }

			catch(err : any) {

				console.log((<aws.AWSError>err)); }

	}

}