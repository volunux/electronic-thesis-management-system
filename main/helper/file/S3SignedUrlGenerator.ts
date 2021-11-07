import { Request , RequestHandler , Response , NextFunction } from 'express';
import { FileOptions } from './others/FileOptions';
import NodeJS from 'node:process';
import dotenv from 'dotenv';
import aws from 'aws-sdk';

const { v4: uuidv4 } = require('uuid');

export class S3SignedUrlGenerator {

	constructor(s3Instance : aws.S3 , s3Configuration : aws.ConfigurationOptions) {

		this.s3Config = s3Instance;

		this.s3 = new aws.S3();

		aws.config.update(s3Configuration);
	}

	public static getInstance(s3Instance : aws.S3 , s3Configuration : aws.ConfigurationOptions) : S3SignedUrlGenerator {

		return new S3SignedUrlGenerator(s3Instance , s3Configuration);
	}

	private s3 : aws.S3;

	private s3Config : aws.S3;

	public typeOne(bucketName : string) : RequestHandler {

		let s3 : aws.S3 = this.s3;

		return function(req : Request , res : Response , next : NextFunction) : void {

		let params : aws.S3.PresignedPost.Params = {

					'Bucket' : (<NodeJS.ProcessEnv>process.env)[bucketName] as string ,

					'Fields' : {
												'key' : Date.now().toString() + FileOptions.getFileExtension(req.body.fileName) ,

												'acl' : 'public-read' ,

												'Content-Type' : req.body.contentType ,

												'success_action_status' : '201' ,

												'Expires' : '300000' } ,

					'Conditions' : [
													
						{'bucket' : (<NodeJS.ProcessEnv>process.env)[bucketName] as string } ,

						{'acl' : 'public-read'} ,

						{'success_action_status' : '201'} ,

						['starts-with' , '$Content-Type' , req.body.contentType.split('/')[0]] ,

						["content-length-range" , '0' , '1048576'] ] ,

					'Expires' : 300000		
				};

				s3.createPresignedPost(params , (err : Error , data : aws.S3.PresignedPost) => {
							
					if (err) { console.log(err);	} 

					else { res.status(200).json(data); } });
		}
	}

	public typeTwo(bucketName : string) : RequestHandler {

		let s3 : aws.S3 = this.s3;

		return function(req : Request , res : Response , next : NextFunction) : void {

			let params : any = {

					'Bucket' : (<NodeJS.ProcessEnv>process.env)[bucketName] as string ,

					'Key' : uuidv4() + FileOptions.getFileExtension(req.body.filename) ,

					'ACL' : 'public-read' ,

					'Content-Type' : req.body.contentType ,

					'Expires' : 86400000 };

				s3.getSignedUrl('putObject' , params , (err : Error , data : string) => {

					let url = `https://${bucketName}.s3.amazonaws.com/${req.body.filename}`
							
					if (err) { console.log(err); }

					else { res.status(200).json(data);	} });
		}
	}

}