import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../route/config/RouteSearchCriteria';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { GenericControllerInterface } from './interface/GenericControllerInterface';
import { Status } from '../entity/Status';
import { UserSession } from '../entity/UserSession';
import { PublisherServiceImpl } from '../model/service/impl/PublisherServiceImpl';
import { PublisherService } from '../model/service/PublisherService';
import { Publisher } from '../entity/Publisher';

export class PublisherController implements GenericControllerInterface {

	private service : PublisherService = new PublisherServiceImpl();

	private title : string = 'Publisher';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setPublisher(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new Publisher(req.body);

			(<Publisher>req.bindingModel).setUserId((<UserSession>req.user).getId()); }

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/distinct/publisher/dashboard' , {'title' : this.title});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.publisher;

		let publisher : Publisher | null = await this.service.findOne(entry);

		res.render('pages/distinct/publisher/entry-detail' , {'entry' : publisher , 'title' : this.title});
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : Publisher[] = await this.service.findAll(req.queryConfig);

		let totalCount : number = entries.length;

		if (entries.length == 11) entries.pop();

		if (entries.length > 0) { lastEntry = entries[entries.length - 1].getUpdatedOn().toString(); }

		let page : number = +(<any>req.query).page;

		let nextPageNumber : number = page ? page + 1 : 2;

		let prevPageNumber : number = page ? page - 1 : 0;

		res.render('pages/distinct/publisher/entries' , {'entries' : entries , 'title' : this.title , 'search_criteria' : search_criteria , 

			'lastEntry' : "" + lastEntry , 'prevPageNumber' : prevPageNumber , 'nextPageNumber' : nextPageNumber , 'totalCount' : totalCount , 'flash' : flashMessage }); 
	}

	public async addOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let publisher : Publisher = new Publisher({});

		res.render('pages/distinct/publisher/entry-create' , {'entry' : publisher , 'title' : this.title });
	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let publisher : Publisher | null = <Publisher>req.bindingModel;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/distinct/publisher/entry-create' , {'entry' : publisher , 'title' : this.title , 'errors' : errors});

			return; }

		publisher = await this.service.save(<Publisher>publisher);

		if (publisher !== null) {

			req.flash('success' , 'Entity successfully added.');

			res.redirect('/internal/publisher/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.publisher;

		let publisher : Publisher | null = await this.service.updateOne(entry);

		let statuses : Status[] = [];

		if (publisher !== null) { statuses = publisher.getStatuses(); 

			if (statuses.length < 1) { throw new Error("An error has occured."); }
		}

		res.render('pages/distinct/publisher/entry-update' , {'entry' : publisher , 'statuses' : statuses , 'title' : this.title}); 
	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let publisher : Publisher | null = <Publisher>req.bindingModel;

		let entry : string = req.params.publisher;

		let statuses : Status[] = [];

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) {

			publisher = await this.service.relatedEntities(<Publisher>publisher);

			if (publisher !== null) {

				statuses = publisher.getStatuses(); 

				if (statuses.length < 1) { throw new Error("An error has occured."); }
			}

		} else { publisher = null; }

			res.render('pages/distinct/publisher/entry-update' , {'entry' : publisher , 'statuses' : statuses , 'title' : this.title , 'errors' : errors });

			return;
		}

		publisher = await this.service.update(entry , <Publisher>publisher);

		if (publisher !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/internal/publisher/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.publisher;

		let publisher : Publisher | null = await this.service.deleteOne(entry);

		res.render('pages/distinct/publisher/entry-delete' , {'entry' : publisher , 'title' : this.title});
	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let publisher : Publisher | null = <Publisher>req.bindingModel;

		let entry : string = req.params.publisher;

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) { } else { publisher = null; }

		res.render('pages/distinct/publisher/entry-delete' , {'entry' : publisher , 'title' : this.title , 'errors' : errors});

		return; }

		publisher = await this.service.remove(entry);

		if (publisher !== null) {

		req.flash('success' , 'Entity status successfully updated.');

		res.redirect('/internal/publisher/entries'); }

		else { throw new Error("An error has occured."); }
	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let b : any = req.body;

 		let entries : string[] = b.entries !== null && b.entries.length > 0 ? b.entries : [];

 		let entriesTransformed : string = ServiceHelper.deleteMany(entries);

 		let publishers : Publisher[] = await this.service.deleteMany(entriesTransformed);

		if (publishers.length > 0) {

			res.json({'message' : 'Entities successfully deleted.'}); }

		else { res.status(500);

		res.json({'message' : 'Unable to delete Entity or Entities'}); }
	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entries : Publisher[] = await this.service.deleteAll();

		res.render('pages/shared/all/entry-delete-all' , {'entryType' : this.title , 'title' : this.title , 'entries' : entries});
	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.flash('success' , 'Entities successfully deleted.');

		let entries : Publisher[] = await this.service.findAndDeleteAll();

		if (entries.length > 0) { res.redirect('/internal/publisher/'); }

		else { throw new Error("An error has occured."); }
	}

}