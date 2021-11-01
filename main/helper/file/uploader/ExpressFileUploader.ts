import { Express , Request , RequestHandler , Response , NextFunction } from 'express';
import fileUpload , { UploadedFile } from 'express-fileupload';
import NodeJS from 'node:process';
import { GeneralUploader } from './GeneralUploader';
import { FileTypeErrorList } from '../errors/FileTypeErrorList';
import { FileTypeMagic } from '../mime-validator/FileTypeMagic';
import { AbstractFileMagic } from '../mime-validator/AbstractFileMagic';
import { FileOptions } from '../others/FileOptions';
import multer , { StorageEngine , Multer } from 'multer';
import dotenv from 'dotenv';
import multerS3 from 'multer-s3';
import path from 'path';
import fs from 'fs';
import aws from 'aws-sdk';

export class ExpressFileUploader {

	constructor(s3Instance : aws.S3 , s3Configuration : aws.ConfigurationOptions) {

		this.s3Config = s3Instance;

		this.s3 = new aws.S3();

		aws.config.update(s3Configuration);
	}

	public static init(app : Express) : void {

			app.use(fileUpload({

				'limits' : { 'fileSize' : 1024 * ExpressFileUploader.fileSize } ,

				'abortOnLimit' : true
			
			}));
	}

	private static fileSize : number;

	private static fieldName : string;

	private static bucketName : string;

	private s3 : aws.S3;

	private s3Config : aws.S3;

	public static setFileSizeAndFieldName(fileSize : number , fieldName : string) : void {

		ExpressFileUploader.fileSize = fileSize;

		ExpressFileUploader.fieldName = fieldName;
	}

	public static setBucketName(bucketName : string) : void {

		ExpressFileUploader.bucketName = bucketName;
	}

	public async handleRequest(req : Request , res : Response , next : NextFunction) : Promise<void> {

		const fieldName : string = ExpressFileUploader.fieldName;

		const uploadedFile : UploadedFile = (<any>req.files)[fieldName];

		try {

				const upload : aws.S3.ManagedUpload = new aws.S3.ManagedUpload({

					'params' : {

							'Body' : uploadedFile.data ,

							'Key' : FileOptions.generateUniqueFileName(uploadedFile.name) ,

							'ACL' : 'public-read' ,

							'Bucket' : ExpressFileUploader.bucketName 
					} ,

					'service' : this.s3

				});

				const response = upload.promise();

		} catch(err : any) {

			console.log('An error has occured');
		}

	}

	public async handleRequestII(req : Request , res : Response , next : NextFunction) : Promise<void> {

		const uploadedFile : UploadedFile = (<any>req.file);

		const fieldName : string = ExpressFileUploader.fieldName;

		try {

					const params : aws.S3.PutObjectRequest = {

							'Body' : uploadedFile.data ,

							'Key' : FileOptions.generateUniqueFileName(uploadedFile.name) ,

							'ACL' : 'public-read' ,

							'Bucket' : ExpressFileUploader.bucketName 
					};

					this.s3.putObject(params , (err : aws.AWSError , data : aws.S3.PutObjectOutput) => {

						if (err) console.log(err);

						if (data) console.log(data);

					});

		} catch(err : any) {

			console.log('An error has occured');
		}

	} 

	public async handleRequestIII(req : Request , res : Response , next : NextFunction) : Promise<void> {

		const fieldName : string = ExpressFileUploader.fieldName;

		const uploadedFile : UploadedFile = (<any>req.files)[fieldName];

		try {

					const params : aws.S3.PutObjectRequest = {

							'Body' : uploadedFile.data ,

							'Key' : FileOptions.generateUniqueFileName(uploadedFile.name) ,

							'ACL' : 'public-read' ,

							'Bucket' : ExpressFileUploader.bucketName 
					};

					this.s3.upload(params , (err : Error , data : aws.S3.ManagedUpload.SendData) => {

						if (err) console.log(err);

						if (data) console.log(data);

					});

		} catch(err : any) {

			console.log('An error has occured');
		}

	} 

}