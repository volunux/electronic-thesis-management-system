import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../route/config/RouteSearchCriteria';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { GenericControllerInterface } from './interface/GenericControllerInterface';
import { UserSession } from '../entity/UserSession';
import { ThesisStatusServiceImpl } from '../model/service/impl/ThesisStatusServiceImpl';
import { ThesisStatusService } from '../model/service/ThesisStatusService';
import { ThesisStatus } from '../entity/ThesisStatus';

export class ThesisStatusController implements GenericControllerInterface {

	private service : ThesisStatusService = new ThesisStatusServiceImpl();

	private title : string = 'Thesis Status';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setThesisStatus(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new ThesisStatus(req.body);

			(<ThesisStatus>req.bindingModel).setUserId((<UserSession>req.user).getId()); }

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/distinct/status/dashboard' , {'entryType' : this.title , 'title' : this.title});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.thesisstatus;

		let thesisStatus : ThesisStatus | null = await this.service.findOne(entry);

		res.render('pages/distinct/status/entry-detail' , {'entry' : thesisStatus , 'title' : this.title});
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : ThesisStatus[] = await this.service.findAll(req.queryConfig);

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

		let thesisStatus : ThesisStatus = new ThesisStatus({});

		res.render('pages/distinct/status/entry-create' , {'entry' : thesisStatus , 'title' : this.title });
	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let thesisStatus : ThesisStatus | null = <ThesisStatus>req.bindingModel;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/distinct/status/entry-create' , {'entry' : thesisStatus , 'title' : this.title , 'errors' : errors});

			return; }

		thesisStatus = await this.service.save(<ThesisStatus>thesisStatus);

		if (thesisStatus !== null) {

			req.flash('success' , 'Entity successfully added.');

			res.redirect('/internal/thesis-status/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.thesisstatus;

		let thesisStatus : ThesisStatus | null = await this.service.updateOne(entry);

		res.render('pages/distinct/status/entry-update' , {'entry' : thesisStatus , 'title' : this.title}); 
	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let thesisStatus : ThesisStatus | null = <ThesisStatus>req.bindingModel;

		let entry : string = req.params.thesisstatus;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			if (await this.service.existsOne(entry)) {

				} else { thesisStatus = null; }

		res.render('pages/distinct/status/entry-update' , {'entry' : thesisStatus , 'title' : this.title , 'errors' : errors }); 

			return; }

		thesisStatus = await this.service.update(entry , <ThesisStatus>thesisStatus);

		if (thesisStatus !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/internal/thesis-status/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.thesisstatus;

		let thesisStatus : ThesisStatus | null = await this.service.deleteOne(entry);

		res.render('pages/distinct/status/entry-delete' , {'entry' : thesisStatus , 'title' : this.title});
	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let thesisStatus : ThesisStatus | null = <ThesisStatus>req.bindingModel;

		let entry : string = req.params.thesisstatus;

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) { } else { thesisStatus = null; }

		res.render('pages/distinct/status/entry-delete' , {'entry' : thesisStatus , 'title' : this.title , 'errors' : errors});

		return; }

		thesisStatus = await this.service.remove(entry);

		if (thesisStatus !== null) {

		req.flash('success' , 'Entity successfully removed.');

		res.redirect('/internal/thesis-status/entries'); }

		else { throw new Error("An error has occured."); }
	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let b : any = req.body;

 		let entries : string[] = b.entries !== null && b.entries.length > 0 ? b.entries : [];

 		let entriesTransformed : string = ServiceHelper.deleteMany(entries);

 		let thesisStatuses : ThesisStatus[] = await this.service.deleteMany(entriesTransformed);

		if (thesisStatuses.length > 0) {

			res.json({'message' : 'Entities successfully deleted'}); }

		else { res.status(500);

			res.json({'message' : 'Unable to delete Entity or Entities'}); }
	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entries : ThesisStatus[] = await this.service.deleteAll();

		res.render('pages/shared/all/entry-delete-all' , {'entryType' : this.title , 'title' : this.title , 'entries' : entries});
	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.flash('success' , 'Entities successfully deleted.');

		let entries : ThesisStatus[] = await this.service.findAndDeleteAll();

		if (entries.length > 0) { res.redirect('/internal/thesis-status/'); }

		else { throw new Error("An error has occured."); }
	
	}

}