import { Request , Response , NextFunction } from 'express';
import { AttachmentService } from '../model/service/AttachmentService';
import { AttachmentServiceImpl } from '../model/service/impl/AttachmentServiceImpl';
import { Attachment } from '../entity/Attachment';
import { UserSession } from '../entity/UserSession';

const FroalaEditor = require('../../../../node_modules/wysiwyg-editor-node-sdk/lib/froalaEditor.js');
const { v4 : uuidv4 } = require('uuid');

export class AttachmentController {

	private title : string = 'Upload';

	private service : AttachmentService = new AttachmentServiceImpl();

	public static setAttachment(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			let attachment : Attachment = new Attachment(req.body);
			attachment.setLocation(req.body['Location']);
			attachment.setKey(req.body['Key']);

			req.bindingModel = attachment;

			(<Attachment>req.bindingModel).setUserId((<UserSession>req.user).getId()); }

		return next();
	}

	public async generateUploadHash(req : Request , res : Response , next : NextFunction) : Promise<void> {
  
		  let configs : { [key : string] : any } = {

		    'bucket' : (<NodeJS.ProcessEnv>process.env)['posts_bucket'] as string ,

		    'region' : (<NodeJS.ProcessEnv>process.env)['posts_region'] as string ,

		    'keyStart' : '' ,

		    'acl' : 'public-read-write' ,

						'secretKey': (<NodeJS.ProcessEnv>process.env)['aremiuser_secretkey'] as string ,

						'accessKey': (<NodeJS.ProcessEnv>process.env)['aremiuser_accesskey'] as string ,
		  };

		  let s3Hash = FroalaEditor.S3.getHash(configs);

		  res.json(s3Hash);
	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let attachment : Attachment | null = <Attachment>req.bindingModel;

		attachment = await this.service.save(<Attachment>attachment);

		if (attachment !== null) {

			res.status(201);

			res.json({'message' : 'Entry added successfully.'}); }

		else { 

			res.status(400);

			res.json({'message' : 'Entry not added successfully.'}); }
	}

}