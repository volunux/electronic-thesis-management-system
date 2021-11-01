import { Express , Request , RequestHandler , Response , NextFunction } from 'express';
import NodeJS from 'node:process';
import { AbstractFileValidator } from './AbstractFileValidator';
import { FileTypeErrorList } from '../errors/FileTypeErrorList';
import { FileTypeMagic } from '../mime-validator/FileTypeMagic';
import { AbstractFileMagic } from '../mime-validator/AbstractFileMagic';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import aws from 'aws-sdk';
import sharp , { Sharp } from 'sharp';

export class ImageModifier extends AbstractFileValidator {

	constructor(s3Instance : aws.S3 ,  s3Configuration : aws.ConfigurationOptions) {

		super(s3Instance , s3Configuration);

	}

	public static getInstance(s3Instance : aws.S3 ,  s3Configuration : aws.ConfigurationOptions) : ImageModifier {

		return new ImageModifier(s3Instance , s3Configuration);
	}

	public static getSharpInstance() : Sharp {

		return sharp();
	}

	public async resizeSharp(bucketName : string) : Promise<RequestHandler> {

		let s3 : aws.S3 = this.getS3Config();

		return async function(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let key : string = (<any>req.file).key;

		let params : aws.S3.GetObjectRequest = {'Bucket' : (<NodeJS.ProcessEnv>process.env)[bucketName] as string , 'Key' : key };

		let result = await s3.getObject(params).promise(); }

	}

	public resizeJimp(req : Request , res : Response , next : NextFunction) : void {


	} 

	public resizeLocal(req : Request , res : Response , next : NextFunction) : void {

		let file : Express.Multer.File = req.file;

		const readStream : fs.ReadStream = fs.createReadStream(file.path);

		let sharp : Sharp = ImageModifier.getSharpInstance();

		sharp.toFormat('jpg');

		sharp.resize(80 , 80);

		let transformStream : Sharp = readStream.pipe(sharp);

	}

	public resizeAndCreateLocal(req : Request , res : Response , next : NextFunction) : void {

		let file : Express.Multer.File = req.file;

		let sharp : Sharp = ImageModifier.getSharpInstance();

		sharp.resize(80 , 80)

					.toFormat('jpg')

					.toFile(path.resolve(req.file.destination,'resized', file.filename));

		fs.unlinkSync(file.path);

	}

	public resizeLocalStream(req : Request , res : Response , next : NextFunction) : void {

		let file : Express.Multer.File = req.file;

		const readStream : fs.ReadStream = fs.createReadStream(file.path);

		const writeStream : fs.WriteStream = fs.createWriteStream('output' , {'flags' : 'w'});

		writeStream.on('error' , function() {

				console.log("Error"); });

		writeStream.on('close' , function() {

			console.log("Successfully saved"); });

		let sharp : Sharp = ImageModifier.getSharpInstance();

		sharp.toFormat('jpg');

		sharp.resize(80 , 80);

		let transformStream : Sharp = sharp.resize(80 , 80)

		.on('info' , function(outputFile) {

			console.log(outputFile); });

		readStream.pipe(transformStream).pipe(writeStream);

	} 

}