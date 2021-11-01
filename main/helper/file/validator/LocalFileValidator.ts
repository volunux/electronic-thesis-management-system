import { Express , Request , RequestHandler , Response , NextFunction } from 'express';
import NodeJS from 'node:process';
import { AbstractFileValidator } from './AbstractFileValidator';
import { FileTypeErrorList } from '../errors/FileTypeErrorList';
import { FileUploadTypeError } from '../errors/FileUploadTypeError';
import { FileUploadErrorMessage } from '../errors/FileUploadErrorMessage';
import { FileTypeMagic } from '../mime-validator/FileTypeMagic';
import { AbstractFileMagic } from '../mime-validator/AbstractFileMagic';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import aws from 'aws-sdk';
import sharp , { Sharp } from 'sharp';

export class LocalFileValidator {

	constructor() {

	}

	public static getInstance() : LocalFileValidator {

		return new LocalFileValidator(); }

	public mimetype(fileType : string , filePath : string) : RequestHandler {

		let errorType : FileUploadErrorMessage | null = FileTypeErrorList.getErrorType(fileType);

		return function(req : Request , res : Response , next : NextFunction) : void {

		if (req.file) {

			let file : Express.Multer.File = req.file;

			let fileMimetype = file.mimetype;

			if ((<AbstractFileMagic>FileTypeMagic.getFileMagic(fileType)).getMimetypeList().indexOf(fileMimetype) == -1) {

				let file : Express.Multer.File = req.file;

				let fileName : string = process.cwd() + '/src/main/resource/' + filePath + '/' + req.body.display_type + '.' + (<Express.Multer.File>req.file).filename.split('.')[1];

				if (fs.existsSync(fileName) == true) fs.unlinkSync(fileName);

				req.validationErrorTypeList.add(FileUploadTypeError.MIMETYPE);

				if (errorType !== null) { req.validationErrors.addError(errorType.getMimeType()); }

				return next(); }

				else { return next(); } }

			else { return next(); } }

	}


}