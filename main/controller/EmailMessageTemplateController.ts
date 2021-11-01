import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../route/config/RouteSearchCriteria';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { GenericControllerInterface } from './interface/GenericControllerInterface';
import { Status } from '../entity/Status';
import { UserSession } from '../entity/UserSession';
import { EmailMessageType } from '../entity/EmailMessageType';
import { EmailMessageTemplateServiceImpl } from '../model/service/impl/EmailMessageTemplateServiceImpl';
import { EmailMessageTemplateService } from '../model/service/EmailMessageTemplateService';
import { EmailMessageTemplate } from '../entity/EmailMessageTemplate';

export class EmailMessageTemplateController implements GenericControllerInterface {

	private service : EmailMessageTemplateService = new EmailMessageTemplateServiceImpl();

	private title : string = 'Email Message Template';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setEmailMessageTemplate(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new EmailMessageTemplate(req.body);

			(<EmailMessageTemplate>req.bindingModel).setUserId((<UserSession>req.user).getId()); }

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/distinct/email-message-template/dashboard' , {'entryType' : this.title , 'title' : this.title});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.emailmessagetemplate;

		let emailMessageTemplate : EmailMessageTemplate | null = await this.service.findOne(entry);

		res.render('pages/distinct/email-message-template/entry-detail' , {'entry' : emailMessageTemplate , 'title' : this.title});
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : EmailMessageTemplate[] = await this.service.findAll(req.queryConfig);

		let totalCount : number = entries.length;

		if (entries.length == 11) entries.pop();

		if (entries.length > 0) { lastEntry = entries[entries.length - 1].getUpdatedOn().toString(); }

		let page : number = +(<any>req.query).page;

		let nextPageNumber : number = page ? page + 1 : 2;

		let prevPageNumber : number = page ? page - 1 : 0;

		res.render('pages/distinct/email-message-template/entries' , {'entries' : entries , 'title' : this.title , 'search_criteria' : search_criteria , 

			'lastEntry' : lastEntry , 'prevPageNumber' : prevPageNumber , 'nextPageNumber' : nextPageNumber , 'totalCount' : totalCount , 'flash' : flashMessage }); 
	}

	public async addOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let emailMessageTemplate : EmailMessageTemplate | null = await this.service.addOne();

		let emailMessageTypes : EmailMessageType[] = [];

		if (emailMessageTemplate !== null) {

				emailMessageTypes = emailMessageTemplate.getEmailMessageTypes();

			if (emailMessageTypes.length < 1) throw new Error("An error has occured."); }

		res.render('pages/distinct/email-message-template/entry-create' , {'entry' : emailMessageTemplate , 'messageTypes' : emailMessageTypes , 'title' : this.title });
	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let emailMessageTemplate : EmailMessageTemplate | null = <EmailMessageTemplate>req.bindingModel;

		let emailMessageTypes : EmailMessageType[] = [];

		if (req.validationErrors.isEmpty() === false) {

		if (emailMessageTemplate !== null) {

				emailMessageTemplate = await this.service.addOne();

				emailMessageTypes = emailMessageTemplate.getEmailMessageTypes();

				if (emailMessageTypes.length < 1) throw new Error("An error has occured."); }

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/distinct/email-message-template/entry-create' , {'entry' : emailMessageTemplate , 'messageTypes' : emailMessageTypes , 'title' : this.title , 'errors' : errors});

			return; }

		emailMessageTemplate = await this.service.save(<EmailMessageTemplate>emailMessageTemplate);

		if (emailMessageTemplate !== null) {

			req.flash('success' , 'Entity successfully added.');

			res.redirect('/internal/email-message-template/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.emailmessagetemplate;

		let emailMessageTemplate : EmailMessageTemplate | null = await this.service.updateOne(entry);

		let statuses : Status[] = [];

		let emailMessageTypes : EmailMessageType[] = [];

		if (emailMessageTemplate !== null) {

			statuses = emailMessageTemplate.getStatuses();

			emailMessageTypes = emailMessageTemplate.getEmailMessageTypes();

			if (statuses.length < 1) { throw new Error("An error has occured."); }
		}

		res.render('pages/distinct/email-message-template/entry-update' , {'entry' : emailMessageTemplate , 'messageTypes' : emailMessageTypes , 'statuses' : statuses , 'title' : this.title}); 
	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let emailMessageTemplate : EmailMessageTemplate | null = <EmailMessageTemplate>req.bindingModel;

		let entry : string = req.params.emailmessagetemplate;

		let statuses : Status[] = [];

		let emailMessageTypes : EmailMessageType[] = [];

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) {

			emailMessageTemplate = await this.service.relatedEntities(<EmailMessageTemplate>emailMessageTemplate);

			if (emailMessageTemplate !== null) {

				statuses = emailMessageTemplate.getStatuses(); 

				emailMessageTypes = emailMessageTemplate.getEmailMessageTypes();

				if (statuses.length < 1) { throw new Error("An error has occured."); }
			}

		} else { emailMessageTemplate = null; }

			res.render('pages/distinct/email-message-template/entry-update' , {'entry' : emailMessageTemplate , 'messageTypes' : emailMessageTypes , 'statuses' : statuses , 'title' : this.title , 'errors' : errors });

			return;
		}

		emailMessageTemplate = await this.service.update(entry , <EmailMessageTemplate>emailMessageTemplate);

		if (emailMessageTemplate !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/internal/email-message-template/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.emailmessagetemplate;

		let emailMessageTemplate : EmailMessageTemplate | null = await this.service.deleteOne(entry);

		res.render('pages/distinct/email-message-template/entry-delete' , {'entry' : emailMessageTemplate , 'title' : this.title});
	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let emailMessageTemplate : EmailMessageTemplate | null = <EmailMessageTemplate>req.bindingModel;

		let entry : string = req.params.emailmessagetemplate;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			if (await this.service.existsOne(entry)) { } else { emailMessageTemplate = null; }

			res.render('pages/distinct/email-message-template/entry-delete' , {'entry' : emailMessageTemplate , 'title' : this.title , 'errors' : errors});

			return; }

		emailMessageTemplate = await this.service.remove(entry);

		if (emailMessageTemplate !== null) {

		req.flash('success' , 'Entity successfully removed.');

		res.redirect('/internal/email-message-template/entries'); }

		else { throw new Error("An error has occured."); }
	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let b : any = req.body;

 		let entries : string[] = b.entries !== null && b.entries.length > 0 ? b.entries : [];

 		let entriesTransformed : string = ServiceHelper.deleteMany(entries);

 		let emailMessageTemplates : EmailMessageTemplate[] = await this.service.deleteMany(entriesTransformed);

		if (emailMessageTemplates.length > 0) {

			res.json({'message' : 'Entities successfully deleted.'}); }

		else { res.status(500);

			res.json({'message' : 'Unable to delete Entity or Entities'}); }
	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entries : EmailMessageTemplate[] = await this.service.deleteAll();

		res.render('pages/shared/all/entry-delete-all' , {'entryType' : this.title , 'title' : this.title , 'entries' : entries});
	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.flash('success' , 'Entities successfully deleted.');

		let entries : EmailMessageTemplate[] = await this.service.findAndDeleteAll();

		if (entries.length > 0) { res.redirect('/internal/email-message-template/'); }

		else { throw new Error("An error has occured."); }
	
	}

}