import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../route/config/RouteSearchCriteria';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { GenericControllerInterface } from './interface/GenericControllerInterface';
import { UserSession } from '../entity/UserSession';
import { StatusServiceImpl } from '../model/service/impl/StatusServiceImpl';
import { StatusService } from '../model/service/StatusService';
import { Status } from '../entity/Status';

export class StatusController implements GenericControllerInterface {

	private service : StatusService = new StatusServiceImpl();

	private title : string = 'Status';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setStatus(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new Status(req.body);

			(<Status>req.bindingModel).setUserId((<UserSession>req.user).getId()); }

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/distinct/status/dashboard' , {'entryType' : this.title , 'title' : this.title});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.status;

		let status : Status | null = await this.service.findOne(entry);

		res.render('pages/distinct/status/entry-detail' , {'entry' : status , 'title' : this.title});
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : Status[] = await this.service.findAll(req.queryConfig);

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

		let status : Status = new Status({});

		res.render('pages/distinct/status/entry-create' , {'entry' : status , 'title' : this.title });
	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let status : Status | null = <Status>req.bindingModel;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/distinct/status/entry-create' , {'entry' : status , 'title' : this.title , 'errors' : errors});

			return; }

		status = await this.service.save(<Status>status);

		if (status !== null) {

			req.flash('success' , 'Entity successfully added.');

			res.redirect('/internal/status/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.status;

		let status : Status | null = await this.service.updateOne(entry);

		res.render('pages/distinct/status/entry-update' , {'entry' : status , 'title' : this.title}); 
	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let status : Status | null = <Status>req.bindingModel;

		let entry : string = req.params.status;

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) {

			} else { status = null; }

		res.render('pages/distinct/status/entry-update' , {'entry' : status , 'title' : this.title , 'errors' : errors }); 

			return; }

		status = await this.service.update(entry , <Status>status);

		if (status !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/internal/status/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.status;

		let status : Status | null = await this.service.deleteOne(entry);

		res.render('pages/distinct/status/entry-delete' , {'entry' : status , 'title' : this.title});
	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let status : Status | null = <Status>req.bindingModel;

		let entry : string = req.params.status;

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) { } else { status = null; }

		res.render('pages/distinct/status/entry-delete' , {'entry' : status , 'title' : this.title , 'errors' : errors});

		return; }

		status = await this.service.remove(entry);

		if (status !== null) {

		req.flash('success' , 'Entity successfully removed.');

		res.redirect('/internal/status/entries'); }

		else { throw new Error("An error has occured."); }
	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let b : any = req.body;

 		let entries : string[] = b.entries !== null && b.entries.length > 0 ? b.entries : [];

 		let entriesTransformed : string = ServiceHelper.deleteMany(entries);

 		let statuses : Status[] = await this.service.deleteMany(entriesTransformed);

		if (statuses.length > 0) {

			res.json({'message' : 'Entities successfully deleted.'}); }

		else { res.status(500);

			res.json({'message' : 'Unable to delete Entity or Entities'}); }
	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entries : Status[] = await this.service.deleteAll();

		res.render('pages/shared/all/entry-delete-all' , {'entryType' : this.title , 'title' : this.title , 'entries' : entries});
	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.flash('success' , 'Entities successfully deleted.');

		let entries : Status[] = await this.service.findAndDeleteAll();

		if (entries.length > 0) { res.redirect('/internal/status/'); }

		else { throw new Error("An error has occured."); }
	
	}

}