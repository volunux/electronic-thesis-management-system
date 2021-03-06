import { Express , Request , RequestHandler , Response , NextFunction } from 'express';
import NodeJS from 'node:process';
import { FileTypeErrorList } from '../errors/FileTypeErrorList';
import { FileUploadTypeError } from '../errors/FileUploadTypeError';
import { FileUploadErrorMessage } from '../errors/FileUploadErrorMessage';
import { FileTypeMagic } from '../mime-validator/FileTypeMagic';
import { AbstractFileMagic } from '../mime-validator/AbstractFileMagic';
import multer , { StorageEngine , Multer } from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

export abstract class AbstractFileValidator {

	constructor(s3Instance : aws.S3 ,  s3Configuration : aws.ConfigurationOptions) {

		this.s3Config = s3Instance;

		this.s3 = new aws.S3();

		aws.config.update(s3Configuration);
	}

	private s3 : aws.S3;

	private s3Config : aws.S3;

	public getS3Config() : aws.S3 {

		return this.s3Config;
	}

	public checkFileUpload(req : Request , res : Response , next : NextFunction) : void {

		return next();
	}

	public mimetype(bucketName : string , fileType : string) : RequestHandler {

		let s3 : aws.S3 = this.s3Config;

		let errorType : FileUploadErrorMessage | null = FileTypeErrorList.getErrorType(fileType);

		return function(req : Request , res : Response , next : NextFunction) : void {

		if (req.file) {

			let file : Express.Multer.File = req.file;

			let fileMimetype : string = file.mimetype;

			if ((<AbstractFileMagic>FileTypeMagic.getFileMagic(fileType)).getMimetypeList().indexOf(fileMimetype) == -1) {

			let key : string = (<any>req.file).key;

			let params : aws.S3.DeleteObjectRequest = {'Bucket' : (<NodeJS.ProcessEnv>process.env)[bucketName] as string , 'Key' : key };

				req.validationErrorTypeList.add(FileUploadTypeError.MIMETYPE);

				if(errorType !== null) { req.validationErrors.addError(errorType.getMimeType()); }

				s3.deleteObject(params , (err : aws.AWSError , deleted : aws.S3.DeleteObjectOutput) => {

					if (err) { console.log(err); }

					else { console.log(deleted); }

						return next(); }); }

				else { 

					return next(); } }

			else { 

				return next(); } }

	}

	public deleteInvalidType(bucketName : string , fileType : string) : RequestHandler {

		let s3 : aws.S3 = this.s3Config;

		let errorType : FileUploadErrorMessage | null = FileTypeErrorList.getErrorType(fileType);

		return function(req : Request , res : Response , next : NextFunction) : void { 

			let counter : number = 0;

			let numberOfFiles : number = 0;

			let itemKeys : any[] = [];

			let availableObject : boolean = false;

			if (Object.keys(req.files).length > 0 && req.validationErrorTypeList.has(FileUploadTypeError.MIMETYPE) === false)	{

				for (let j in req.files) {

					if ((<any>req.files)[j].length > 0) {

						numberOfFiles += (<any>req.files)[j].length;

						if (req.validationErrorTypeList.has(FileUploadTypeError.FORM_DATA_INVALID_REUPLOAD) === false) {

								req.validationErrorTypeList.add(FileUploadTypeError.FORM_DATA_INVALID_REUPLOAD);

								if (errorType !== null) { req.validationErrors.addError(errorType.getValidObject()); } }

						availableObject = true;

						(<any>req.files)[j].forEach((item : any , idx : number) => { counter++;

							let fileToDelete : any = (<any>req.files)[j].splice(idx , 1);

							delete (<any>req.files)[j][idx];

							itemKeys.push({'Key' : item.key}); })	}

							else {

								if (counter === numberOfFiles) {

									return next(); } } }

					if (availableObject === true) {

				let params : aws.S3.DeleteObjectsRequest = {'Bucket' : (<NodeJS.ProcessEnv>process.env)[bucketName] as string , 'Delete' : {'Objects' : itemKeys	} };

					s3.deleteObjects(params , (err : aws.AWSError , deleted : aws.S3.DeleteObjectOutput) => {

						if (err) { console.log(err); }      

						else { console.log(deleted); }

							return next(); }); } }

					else { return next();	}	
				}

	}

	public deleteExceededSize(bucketName : string , fileType : string) : RequestHandler {

		let s3 : aws.S3 = this.s3Config;

		let errorType : FileUploadErrorMessage | null = FileTypeErrorList.getErrorType(fileType);

		return function(req : Request , res : Response , next : NextFunction) : void {

			let itemKeys : any[] = [];

			let keysDelete : string[] = [];

			if (Object.keys(req.files).length > 0 && req.validationErrorTypeList.has(FileUploadTypeError.SIZE) === false )	{

				for (let j in req.files) {

					if ((<any>req.files)[j].length > 0) {

						if (req.validationErrorTypeList.has(FileUploadTypeError.FORM_DATA_INVALID_REUPLOAD) === false ) {

								req.validationErrorTypeList.add(FileUploadTypeError.FORM_DATA_INVALID_REUPLOAD);

								if (errorType !== null) { req.validationErrors.addError(errorType.getValidObject()); } }

						(<any>req.files)[j].forEach((item : any , idx : number) => { 

							delete (<any>req.files)[j][idx];

							itemKeys.push({'Key' : item.key}); }); } }

				let params : aws.S3.DeleteObjectsRequest = {'Bucket' : (<NodeJS.ProcessEnv>process.env)[bucketName] as string , 'Delete' : {'Objects' : itemKeys	} };

				s3.deleteObjects(params , (err : aws.AWSError , deleted : aws.S3.DeleteObjectOutput) => {

					if (err) { console.log(err); }
					
					else { console.log(deleted); } }); }

			return next(); }

	}

	public checkFileSize(bucketName : string , fileType : string , fileSize : number) : RequestHandler {

		let s3 : aws.S3 = this.s3Config;

		let errorType : FileUploadErrorMessage | null = FileTypeErrorList.getErrorType(fileType);

			return function(req : Request , res : Response , next : NextFunction) : void {

				let counter : number = 0 , numberOfFiles : number = 0 , runned : boolean = false;

				let imageSize = 1024 * fileSize;

				if (Object.keys(req.files).length > 0) {

					for (let i in req.files) {

						if ((<any>req.files)[i].length) {

							numberOfFiles += (<any>req.files)[i].length;

					(<any>req.files)[i].forEach(checkImageSize);	}		}

					function checkImageSize(item : any) {

						if (item.size > imageSize) {

							let params : aws.S3.DeleteObjectRequest = {'Bucket' : (<NodeJS.ProcessEnv>process.env)[bucketName] as string , 'Key' : item.key };

							s3.deleteObject(params , (err : aws.AWSError , deleted : aws.S3.DeleteObjectOutput) => {

								if (err) { console.log(err); } });

								if (req.validationErrorTypeList.has(FileUploadTypeError.SIZE) === false) {

											req.validationErrorTypeList.add(FileUploadTypeError.SIZE);

											if (errorType !== null) { req.validationErrors.addError(errorType.getSize(fileSize)); }

										runned = true;

									return next(); } }		

									else { counter++;	}	}	

										if (counter == numberOfFiles && !runned) { return next();	}	}
					
					else { return next();	}
			}

	}

	public validate(bucketName : string , fileType : string) : RequestHandler {

		let s3 : aws.S3 = this.s3Config;

		let errorType : FileUploadErrorMessage | null = FileTypeErrorList.getErrorType(fileType);

		return function(req : Request , res : Response , next : NextFunction) : void {

		let counter : number = 0 , numberOfFiles : number = 0 , runned : boolean = false;

		if (Object.keys(req.files).length > 0) {

		for (var i in req.files) {

			numberOfFiles += (<any>req.files)[i].length;

			(<any>req.files)[i].forEach(checkItem); }

		function checkItem(item : any , idx : number) {

			let params : aws.S3.DeleteObjectRequest = {'Bucket' : process.env[bucketName] as string , 'Key' : item.key };

			s3.getObject(params , (err : aws.AWSError , data : aws.S3.GetObjectOutput) => {

				if (err) { console.log(err); }

				if (data !== null) {

					if (data.Body !== null) {

						let bitmap = (<aws.S3.Body>data.Body).toString('hex' , 0 , 4);

						if (!(<AbstractFileMagic>FileTypeMagic.getFileMagic(fileType)).verifySignature(bitmap)) {

							return s3.deleteObject(params , (err : aws.AWSError , deleted : aws.S3.DeleteObjectOutput) => {

								if (err) { console.log(err); }

								else { console.log(deleted); }

								delete (<any>req.files)[i][idx];

						if (req.validationErrorTypeList.has(FileUploadTypeError.MIMETYPE) === false) {

								req.validationErrorTypeList.add(FileUploadTypeError.MIMETYPE);

								if (errorType !== null) { req.validationErrors.addError(errorType.getValidObject()); }

						runned = true;

						return next(); } }); }	

					else { counter++;

						if (counter == numberOfFiles && !runned) { return next();	}	}	}	}	});	}	}

				else { return next();	} 		
	}

	}

	public addFilesUploaded(filesKey : string , fieldName : string) : RequestHandler {

		return function(req : Request , res : Response , next : NextFunction) {

			if (req.files !== undefined && req.files !== null) { req.body[filesKey] = (<any>req.files)[fieldName]; }

				return next(); }
	}

	public deleteFiles(req : Request , errorList : any , fileType : string , fieldName : string , bucketName : string) {

		let errorType : FileUploadErrorMessage | null = FileTypeErrorList.getErrorType(fileType);

		let itemKeys : any = [];

		if ((req.validationErrorTypeList.has(FileUploadTypeError.MIMETYPE) === false || req.validationErrorTypeList.has(FileUploadTypeError.SIZE) === false) && (<any>req.files)[fieldName] && (<any>req.files)[fieldName].length > 0) {

			req.validationErrorTypeList.add(FileUploadTypeError.FORM_DATA_INVALID_REUPLOAD);

			if (errorType !== null) { req.validationErrors.addError(errorType.getValidObject()); }

				for (let j in req.files) {

					if ((<any>req.files)[j].length) {

					(<any>req.files)[j].forEach((item : any , idx : number) => { 

						delete (<any>req.files)[j][idx];

						itemKeys.push({'Key' : item.key}); })	} }

			let params : aws.S3.DeleteObjectsRequest = {'Bucket' : (<NodeJS.ProcessEnv>process.env)[bucketName] as string , 'Delete' : {'Objects' : itemKeys	} };

				this.s3.deleteObjects(params , (err : aws.AWSError , deleted : aws.S3.DeleteObjectOutput) => {

					if (err) { console.log(err); }      
					
					else { console.log(deleted); } }); }			
			} 

}