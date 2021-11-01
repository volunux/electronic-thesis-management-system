import { Request , Response , NextFunction } from 'express';

const FroalaEditor = require('../../../../node_modules/wysiwyg-editor-node-sdk/lib/froalaEditor.js');
const { v4 : uuidv4 } = require('uuid');

export class AttachmentController {

	private title : string = 'Upload';

	public async generateUploadHash(req : Request , res : Response , next : NextFunction) : Promise<void> {
  
		  let configs : { [key : string] : any } = {

		    'bucket' : (<NodeJS.ProcessEnv>process.env)['posts_bucket'] as string ,

		    'region' : (<NodeJS.ProcessEnv>process.env)['posts_region'] as string ,

		    'keyStart' : '' ,

		    'acl' : 'public-read-write' ,

						'secretKey': (<NodeJS.ProcessEnv>process.env)['aremiuser_secretkey'] as string ,

						'accessKey': (<NodeJS.ProcessEnv>process.env)['aremiuser_accesskey'] as string ,
		  }

		  let s3Hash = FroalaEditor.S3.getHash(configs);

		  res.json(s3Hash);
	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {


	}

}