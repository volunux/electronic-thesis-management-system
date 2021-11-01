import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../route/config/RouteSearchCriteria';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { GenericControllerInterface } from './interface/GenericControllerInterface';
import { UserSession } from '../entity/UserSession';
import { UserStatusService } from '../model/service/UserStatusService';
import { UserStatusServiceImpl } from '../model/service/impl/UserStatusServiceImpl';
import { UserStatus } from '../entity/UserStatus';

export class UserStatusController implements GenericControllerInterface {

	private service : UserStatusService = new UserStatusServiceImpl();

	private title : string = 'User Status';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setUserStatus(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new UserStatus(req.body);

			(<UserStatus>req.bindingModel).setUserId((<UserSession>req.user).getId()); }

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/distinct/status/dashboard' , {'title' : this.title});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.userstatus;

		let userStatus : UserStatus | null = await this.service.findOne(entry);

		res.render('pages/distinct/status/entry-detail' , {'entry' : userStatus , 'title' : this.title});
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : UserStatus[] = await this.service.findAll(req.queryConfig);

		let totalCount : number = entries.length;

		if (entries.length == 11) entries.pop();

		if (entries.length > 0) { lastEntry = entries[entries.length - 1].getUpdatedOn().toString(); }

		let page : number = +(<any>req.query).page;

		let nextPageNumber : number = page ? page + 1 : 2;

		let prevPageNumber : number = page ? page - 1 : 0;

		res.render('pages/distinct/status/entries' , {'entries' : entries , 'title' : this.title , 'search_criteria' : search_criteria , 

			'lastEntry' : lastEntry , 'prevPageNumber' : prevPageNumber , 'nextPageNumber' : nextPageNumber , 'totalCount' : totalCount , 'flash' : flashMessage }); 
	}

	public async addOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userStatus : UserStatus = new UserStatus({});

		res.render('pages/distinct/status/entry-create' , {'entry' : userStatus , 'title' : this.title });
	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userStatus : UserStatus | null = <UserStatus>req.bindingModel;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/distinct/status/entry-create' , {'entry' : userStatus , 'title' : this.title , 'errors' : errors});

			return; }

		userStatus = await this.service.save(<UserStatus>userStatus);

		if (userStatus !== null) {

			req.flash('success' , 'Entity successfully added.');

			res.redirect('/internal/user-status/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.userstatus;

		let userStatus : UserStatus | null = await this.service.updateOne(entry);

		res.render('pages/distinct/status/entry-update' , {'entry' : userStatus , 'title' : this.title}); 
	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userStatus : UserStatus | null = <UserStatus>req.bindingModel;

		let entry : string = req.params.userstatus;

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) {

			} else { userStatus = null; }

		res.render('pages/distinct/status/entry-update' , {'entry' : userStatus , 'title' : this.title , 'errors' : errors }); 

			return; }

		userStatus = await this.service.update(entry , <UserStatus>userStatus);

		if (userStatus !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/internal/user-status/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.userstatus;

		let userStatus : UserStatus | null = await this.service.deleteOne(entry);

		res.render('pages/distinct/status/entry-delete' , {'entry' : userStatus , 'title' : this.title});
	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userStatus : UserStatus | null = <UserStatus>req.bindingModel;

		let entry : string = req.params.userstatus;

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) { } else { userStatus = null; }

		res.render('pages/distinct/status/entry-delete' , {'entry' : userStatus , 'title' : this.title , 'errors' : errors});

		return; }

		userStatus = await this.service.remove(entry);

		if (userStatus !== null) {

		req.flash('success' , 'Entity successfully removed.');

		res.redirect('/internal/user-status/entries'); }

		else { throw new Error("An error has occured."); }
	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let b : any = req.body;

 		let entries : string[] = b.entries !== null && b.entries.length > 0 ? b.entries : [];

 		let entriesTransformed : string = ServiceHelper.deleteMany(entries);

 		let userStatuses : UserStatus[] = await this.service.deleteMany(entriesTransformed);

		if (userStatuses.length > 0) {

			res.json({'message' : 'Entities successfully deleted.'}); }

		else { res.status(500);

			res.json({'message' : 'Unable to delete Entity or Entities'}); }
	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entries : UserStatus[] = await this.service.deleteAll();

		res.render('pages/shared/all/entry-delete-all' , {'entryType' : this.title , 'title' : this.title , 'entries' : entries});
	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.flash('success' , 'Entities successfully deleted.');

		let entries : UserStatus[] = await this.service.findAndDeleteAll();

		if (entries.length > 0) { res.redirect('/internal/user-status/'); }

		else { throw new Error("An error has occured."); }
	
	}

}