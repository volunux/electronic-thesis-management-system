import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../route/config/RouteSearchCriteria';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { GenericControllerInterface } from './interface/GenericControllerInterface';
import { Status } from '../entity/Status';
import { UserSession } from '../entity/UserSession';
import { EmailMessageTypeServiceImpl } from '../model/service/impl/EmailMessageTypeServiceImpl';
import { EmailMessageTypeService } from '../model/service/EmailMessageTypeService';
import { EmailMessageType } from '../entity/EmailMessageType';

export class EmailMessageTypeController implements GenericControllerInterface {

	private service : EmailMessageTypeService = new EmailMessageTypeServiceImpl();

	private title : string = 'Email Message Type';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setEmailMessageType(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new EmailMessageType(req.body);

			(<EmailMessageType>req.bindingModel).setUserId((<UserSession>req.user).getId()); }

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/distinct/email-message-type/dashboard' , {'entryType' : this.title , 'title' : this.title});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.emailmessagetype;

		let emailMessageType : EmailMessageType | null = await this.service.findOne(entry);

		res.render('pages/distinct/email-message-type/entry-detail' , {'entry' : emailMessageType , 'title' : this.title});
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : EmailMessageType[] = await this.service.findAll(req.queryConfig);

		let totalCount : number = entries.length;

		if (entries.length == 11) entries.pop();

		if (entries.length > 0) { lastEntry = entries[entries.length - 1].getUpdatedOn().toString(); }

		let page : number = +(<any>req.query).page;

		let nextPageNumber : number = page ? page + 1 : 2;

		let prevPageNumber : number = page ? page - 1 : 0;

		res.render('pages/distinct/email-message-type/entries' , {'entries' : entries , 'title' : this.title , 'search_criteria' : search_criteria , 

			'lastEntry' : lastEntry , 'prevPageNumber' : prevPageNumber , 'nextPageNumber' : nextPageNumber , 'totalCount' : totalCount , 'flash' : flashMessage }); 
	}

	public async addOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let emailMessageType : EmailMessageType = new EmailMessageType({});

		res.render('pages/distinct/email-message-type/entry-create' , {'entry' : emailMessageType , 'title' : this.title });
	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let emailMessageType : EmailMessageType | null = <EmailMessageType>req.bindingModel;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/distinct/email-message-type/entry-create' , {'entry' : emailMessageType , 'title' : this.title , 'errors' : errors});

			return; }

		emailMessageType = await this.service.save(<EmailMessageType>emailMessageType);

		if (emailMessageType !== null) {

			req.flash('success' , 'Entity successfully added.');

			res.redirect('/internal/email-message-type/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.emailmessagetype;

		let emailMessageType : EmailMessageType | null = await this.service.updateOne(entry);

		let statuses : Status[] = [];

		if (emailMessageType !== null) { statuses = emailMessageType.getStatuses(); 

			if (statuses.length < 1) { throw new Error("An error has occured."); }
		}

		res.render('pages/distinct/email-message-type/entry-update' , {'entry' : emailMessageType , 'statuses' : statuses , 'title' : this.title}); 
	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let emailMessageType : EmailMessageType | null = <EmailMessageType>req.bindingModel;

		let entry : string = req.params.emailmessagetype;

		let statuses : Status[] = [];

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) {

			emailMessageType = await this.service.relatedEntities(<EmailMessageType>emailMessageType);

			if (emailMessageType !== null) {

				statuses = emailMessageType.getStatuses(); 

				if (statuses.length < 1) { throw new Error("An error has occured."); }
			}

		} else { emailMessageType = null; }

			res.render('pages/distinct/email-message-type/entry-update' , {'entry' : emailMessageType , 'statuses' : statuses , 'title' : this.title , 'errors' : errors });

			return;
		}

		emailMessageType = await this.service.update(entry , <EmailMessageType>emailMessageType);

		if (emailMessageType !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/internal/email-message-type/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.emailmessagetype;

		let emailMessageType : EmailMessageType | null = await this.service.deleteOne(entry);

		res.render('pages/distinct/email-message-type/entry-delete' , {'entry' : emailMessageType , 'title' : this.title});
	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let emailMessageType : EmailMessageType | null = <EmailMessageType>req.bindingModel;

		let entry : string = req.params.emailmessagetype;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			if (await this.service.existsOne(entry)) { } else { emailMessageType = null; }

			res.render('pages/distinct/email-message-type/entry-delete' , {'entry' : emailMessageType , 'title' : this.title , 'errors' : errors});

			return; }

		emailMessageType = await this.service.remove(entry);

		if (emailMessageType !== null) {

		req.flash('success' , 'Entity successfully removed.');

		res.redirect('/internal/email-message-type/entries'); }

		else { throw new Error("An error has occured."); }
	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let b : any = req.body;

 		let entries : string[] = b.entries !== null && b.entries.length > 0 ? b.entries : [];

 		let entriesTransformed : string = ServiceHelper.deleteMany(entries);

 		let emailMessageTypes : EmailMessageType[] = await this.service.deleteMany(entriesTransformed);

		if (emailMessageTypes.length > 0) {

			res.json({'message' : 'Entities successfully deleted.'}); }

		else { res.status(500);

			res.json({'message' : 'Unable to delete Entity or Entities'}); }
	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entries : EmailMessageType[] = await this.service.deleteAll();

		res.render('pages/shared/all/entry-delete-all' , {'entryType' : this.title , 'title' : this.title , 'entries' : entries});
	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.flash('success' , 'Entities successfully deleted.');

		let entries : EmailMessageType[] = await this.service.findAndDeleteAll();

		if (entries.length > 0) { res.redirect('/internal/email-message-type/'); }

		else { throw new Error("An error has occured."); }
	
	}

}