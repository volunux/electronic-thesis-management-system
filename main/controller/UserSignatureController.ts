import { Request , Response , NextFunction } from 'express';
import { Status } from '../entity/Status';
import { UserSession } from '../entity/UserSession';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../route/config/RouteSearchCriteria';
import { S3ObjectChange } from '../helper/file/S3ObjectChange';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { GenericControllerInterface } from './interface/GenericControllerInterface';
import { UserSignatureService } from '../model/service/UserSignatureService';
import { UserSignatureServiceImpl } from '../model/service/impl/UserSignatureServiceImpl';
import { UserSignature } from '../entity/UserSignature';

export class UserSignatureController implements GenericControllerInterface {

	private service : UserSignatureService = new UserSignatureServiceImpl();

	private title : string = 'User Signature';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setUserSignature(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new UserSignature(req.body);

			(<UserSignature>req.bindingModel).setUserId((<UserSession>req.user).getId()); }

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {		

		res.render('pages/shared/four/dashboard' , {'entryType' : this.title , 'title' : this.title});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.usersignature;

		let userSignature : UserSignature | null = await this.service.findOne(entry);

		res.render('pages/shared/four/entry-detail' , {'entry' : userSignature , 'title' : this.title});
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : UserSignature[] = await this.service.findAll(req.queryConfig);

		let totalCount : number = entries.length;

		if (entries.length == 11) entries.pop();

		if (entries.length > 0) { lastEntry = entries[entries.length - 1].getUpdatedOn().toString(); }

		let page : number = +(<any>req.query).page;

		let nextPageNumber : number = page ? page + 1 : 2;

		let prevPageNumber : number = page ? page - 1 : 0;

		res.render('pages/shared/four/entries' , {'entries' : entries , 'title' : this.title , 'search_criteria' : search_criteria , 

			'lastEntry' : lastEntry , 'prevPageNumber' : prevPageNumber , 'nextPageNumber' : nextPageNumber , 'totalCount' : totalCount , 'flash' : flashMessage }); 
	}

	public async addOne(req : Request , res : Response , next : NextFunction) : Promise<void> {}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.country;

		let userSignature : UserSignature | null = await this.service.deleteOne(entry);

		res.render('pages/shared/four/entry-delete' , {'entry' : userSignature , 'title' : this.title});

	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userSignature : UserSignature = <UserSignature>req.bindingModel;

		let entry : string = req.params.usersignature;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/shared/four/entry-delete' , {'entry' : userSignature , 'title' : this.title , 'errors' : errors});

			return; }

			let userSignature2 : UserSignature | null = await this.service.remove(entry);

			S3ObjectChange.objectDeleteByLocation((<UserSignature>userSignature2).getLocation() , 'thesis_user');

			req.flash('success' , 'Entity successfully removed.');

			res.redirect('/internal/user-profile-photo/entries');
	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let b : any = req.body;

 		let entries : string[] = b.entries !== null && b.entries.length > 0 ? b.entries : [];

 		let entriesTransformed : string = ServiceHelper.deleteMany(entries);

 		let userSignatures : UserSignature[] = await this.service.deleteMany(entriesTransformed);

		if (userSignatures.length > 0) {

			res.json({'message' : 'Entities successfully deleted.'}); }

		else { res.status(500);

			res.json({'message' : 'Unable to delete Entity or Entities'}); }
	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entries : UserSignature[] = await this.service.deleteAll();

		res.render('pages/shared/all/entry-delete-all' , {'entryType' : this.title , 'title' : this.title , 'entries' : entries});
	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.flash('success' , 'Entities successfully deleted.');

		let entries : UserSignature[] = await this.service.findAndDeleteAll();

		if (entries.length > 0) { res.redirect('/internal/user-profile-photo/'); }

		else { throw new Error("An error has occured."); }	
	}

}