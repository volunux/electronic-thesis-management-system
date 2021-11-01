import { Express , Request , RequestHandler , Response , NextFunction } from 'express';
import { GeneralUploader } from './GeneralUploader';
import { FileTypeErrorList } from '../errors/FileTypeErrorList';
import { FileUploadTypeError } from '../errors/FileUploadTypeError';
import { FileTypeMagic } from '../mime-validator/FileTypeMagic';
import { AbstractFileMagic } from '../mime-validator/AbstractFileMagic';
import { FileOptions } from '../others/FileOptions';
import { FileUploadErrorMessage } from '../errors/FileUploadErrorMessage';
import multer , { StorageEngine , Multer } from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

export abstract class AbstractFileUploader extends GeneralUploader {

	constructor(s3Instance : aws.S3 ,  s3Configuration : aws.ConfigurationOptions) {

		super();

		this.s3Config = s3Instance;

		this.s3 = new aws.S3();

		aws.config.update(s3Configuration);
	}

	private s3 : aws.S3;

	private s3Config : aws.S3;

	private static objectValidationOptions : any = {'objectType' : true , 'objectSize' : true , 'objectValid' : true};

	public getUploader(bucketName : string , fileSize : number , filesCount : number) : Multer {

		let upload : Multer = multer({

			'storage' : this.getS3Configuration(bucketName) ,

			'limits' : { 'files' : filesCount }
			
			})

		return upload;
	}

	public validate(bucketName : string , fileType : string) : RequestHandler {

		let s3 : aws.S3 = this.s3Config;

		let errorType : FileUploadErrorMessage | null = FileTypeErrorList.getErrorType(fileType);

		return async function(req : Request , res : Response , next : NextFunction) : Promise<void> {

		if (req.file !== null && req.validationErrorTypeList.has(FileUploadTypeError.MIMETYPE) === false) {

			let key : string = (<Express.MulterS3.File>req.file).key;

			try {

				let params : aws.S3.DeleteObjectRequest = {'Bucket' : (<NodeJS.ProcessEnv>process.env)[bucketName] as string , 'Key' : key };

				let objectData : aws.S3.GetObjectOutput = await s3.getObject(params).promise();

				if (objectData !== null && objectData.Body !== null && objectData.Body !== undefined) {

						let bitmap : string = (<aws.S3.Body>objectData.Body).toString('hex' , 0 , 4);

						console.log(bitmap);

					if (!(<AbstractFileMagic>FileTypeMagic.getFileMagic(fileType)).verifySignature(bitmap)) {

						console.log('Was the file invalid');

						console.log(s3.config);

						let deletedObject : aws.S3.DeleteObjectOutput = await s3.deleteObject(params).promise();

					 	AbstractFileUploader.objectValidationOptions.objectType = false;

						req.validationErrorTypeList.add(FileUploadTypeError.MIMETYPE);

						if (errorType !== null) { req.validationErrors.addError(errorType.getMimeType()); }
																									
						return next(); }

					else { return next();	} } }

				catch(err : any) {


						console.log('It was here 88888888888888888888888888888888888888');



					console.log((<aws.AWSError>err)); }	}
			
			else { return next(); } }
	}

	public checkFileSize(bucketName : string , fileType : string , fileSize : number) : RequestHandler {

		let s3 : aws.S3 = this.s3Config;

		let errorType : FileUploadErrorMessage | null = FileTypeErrorList.getErrorType(fileType);

		return async function(req : Request , res : Response , next : NextFunction) : Promise<void> {

			let calculatedFileSize : number = 1024 * fileSize;

			if (<Express.Multer.File>req.file !== null && req.file !== undefined) {
				
				if (req.file.size > calculatedFileSize && AbstractFileUploader.objectValidationOptions.objectType) {

					let key : string = (<Express.MulterS3.File>req.file).key;

					let params : aws.S3.DeleteObjectRequest = {'Bucket' : (<NodeJS.ProcessEnv>process.env)[bucketName] as string , 'Key' : key };

					try {

						let deletedObject : aws.S3.DeleteObjectOutput = await s3.deleteObject(params).promise();

						req.validationErrorTypeList.add(FileUploadTypeError.SIZE);

						if (errorType !== null) { req.validationErrors.addError(errorType.getSize(fileSize)); }

						return next(); } 

						catch (err : any) {
							console.log('329888888888888888888888888888888888888888888888888888888122222222222222222222222');
	
							console.log((<aws.AWSError>err)); } }

				else if ((<Express.MulterS3.File>req.file).size > calculatedFileSize) {

					req.validationErrorTypeList.add(FileUploadTypeError.SIZE);

					if (errorType !== null) { req.validationErrors.addError(errorType.getSize(fileSize)); }

						return next(); }

				else { return next(); }	}
			
			else { return next(); }	}

	}

	public getS3Configuration(bucketName : string) : StorageEngine {

		console.log((<NodeJS.ProcessEnv>process.env)[bucketName])

	 return multerS3({

	 	's3' : this.s3Config ,

		'bucket': (<NodeJS.ProcessEnv>process.env)[bucketName] as string ,
		
		'acl': 'public-read-write' ,

		'key' : (req : Request , file : Express.Multer.File , cb : Function) => {
		
			// let fileName : string = FileOptions.generateUUIDFileName(file.originalname);

			let fileName : string = Date.now().toString();

			cb(null, fileName);	} ,

		'metadata' : (req : Request , file : Express.Multer.File , cb : Function) => {
		
			cb(null , {'fieldName' : file.fieldname , 'Content-Type' : file.mimetype }); } }) 

	}

	public deleteFile(bucketName : string , fileType : string) : RequestHandler {

		let s3 : aws.S3 = this.s3Config;

		let errorType : FileUploadErrorMessage | null = FileTypeErrorList.getErrorType(fileType);

		return async function(req : Request , res : Response , next : NextFunction) : Promise<void> {	

			if (req.validationErrors.isEmpty() === false) {

				if (errorType !== null) { req.validationErrors.addError(errorType.getValidObject()); }

					let key : string = (<Express.MulterS3.File>req.file).key;

					let params : aws.S3.DeleteObjectRequest = {'Bucket' : (<NodeJS.ProcessEnv>process.env)[bucketName] as string , 'Key' : key };

					try {

						let deletedObject : aws.S3.DeleteObjectOutput = await s3.deleteObject(params).promise();

						console.log("Successfully deleted entry"); } 

					catch (err : any) {

						console.log((<aws.AWSError>err)); }

				return next(); }

			else { return next(); }

		}

	} 

	public async deleteFileII(req : Request , errArr : any , fileType : string , bucketName : string) : Promise<void> {

		let errorType : FileUploadErrorMessage | null = FileTypeErrorList.getErrorType(fileType);	

		if (!(req.validationErrorTypeList.has(FileUploadTypeError.MIMETYPE) || req.validationErrorTypeList.has(FileUploadTypeError.SIZE))) {

			if (errorType !== null) { req.validationErrors.addError(errorType.getValidObject()); }

			let key : string = (<Express.MulterS3.File>req.file).key;

			let params : aws.S3.DeleteObjectRequest = {'Bucket' : (<NodeJS.ProcessEnv>process.env)[bucketName] as string , 'Key' : key };

			try {

				let deletedObject : aws.S3.DeleteObjectOutput = await this.s3.deleteObject(params).promise();

				console.log("Successfully deleted entry"); } 

			catch (err : any) {

				console.log((<aws.AWSError>err)); } }	
	} 

}