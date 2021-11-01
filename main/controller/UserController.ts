import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../route/config/RouteSearchCriteria';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { UserHelper } from '../helper/entry/UserHelper';
import { handlebarsTemplateHelpers } from '../helper/view/HandlebarsTemplateHelpers';
import { GenericControllerInterface } from './interface/GenericControllerInterface';
import { Faculty } from '../entity/Faculty';
import { Department } from '../entity/Department';
import { Level } from '../entity/Level';
import { Country } from '../entity/Country';
import { Role } from '../entity/Role';
import { UserStatus } from '../entity/UserStatus';
import { Status } from '../entity/Status';
import { UserServiceImpl } from '../model/service/impl/UserServiceImpl';
import { UserService } from '../model/service/UserService';
import { User } from '../entity/User';
import { MailMessage } from '../util/mail/MailMessage';
import { MailMessageLocal } from '../util/mail/MailMessageLocal';
import { MailSender } from '../util/mail/MailSender';
import { MailSenderServicesContainer } from '../util/mail/MailSenderServicesContainer';
import { MailHelper } from '../helper/middleware/MailHelper';

export class UserController implements GenericControllerInterface {

	private service : UserService = new UserServiceImpl();

	private mailSender : MailSender | null = MailSenderServicesContainer.getService('sendgrid');

	private title : string = 'User';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setUser(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new User(req.body); }

		next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/distinct/user/dashboard' , {'entryType' : this.title , 'title' : this.title});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.user;

		let user : User | null = await this.service.findOne(entry);

		res.render('pages/distinct/user/entry-detail' , {'entry' : user , 'title' : this.title});
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : User[] = await this.service.findAll(req.queryConfig);

		let totalCount : number = entries.length;

		if (entries.length == 11) entries.pop();

		if (entries.length > 0) { lastEntry = entries[entries.length - 1].getUpdatedOn().toString(); }

		let page : number = +(<any>req.query).page;

		let nextPageNumber : number = page ? page + 1 : 2;

		let prevPageNumber : number = page ? page - 1 : 0;

		res.render('pages/distinct/user/entries' , {'entries' : entries , 'title' : this.title , 'search_criteria' : search_criteria , 

			'lastEntry' : lastEntry , 'prevPageNumber' : prevPageNumber , 'nextPageNumber' : nextPageNumber , 'totalCount' : totalCount , 'flash' : flashMessage }); 
	}

	public async addOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let user : User | null = await this.service.addOne();

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let levels : Level[] = [];

		let countries : Country[] = [];

		let userStatuses : UserStatus[] = [];

		if (user !== null) {

			faculties = user.getFaculties();

			departments = user.getDepartments();

			levels = user.getLevels();

			countries = user.getCountries();

			userStatuses = user.getUserStatuses(); }

		if (faculties.length < 1) { throw new Error("An error has occured."); }

			res.render('pages/distinct/user/entry-create' , {'entry' : user , 'departments' : departments , 'faculties' : faculties , 'levels' : levels ,

				'countries' : countries , 'userStatuses' : userStatuses , 'title' : this.title});	
	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let user : User | null = <User>req.bindingModel;

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let levels : Level[] = [];

		let countries : Country[] = [];

		let userStatuses : UserStatus[] = [];

			if (req.validationErrors.isEmpty() === false) {

				user = await this.service.relatedEntities(user);

			if (user !== null) {

				faculties = user.getFaculties();

				departments = user.getDepartments();

				levels = user.getLevels();

				countries = user.getCountries();

				userStatuses = user.getUserStatuses(); }

			if (faculties.length < 1) { throw new Error("An error has occured."); }

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/distinct/user/entry-create' , {'entry' : user , 'departments' : departments , 'faculties' : faculties , 'levels' : levels ,

				'countries' : countries , 'userStatuses' : userStatuses , 'title' : this.title , 'errors' : errors});

				return; }

		user = await this.service.save(<User>user);

		if (user !== null) {

			let mailMessage : MailMessage = MailMessageLocal.createUser(user.getUsername() , user.getEmailAddress() , user.getPassword());

			MailHelper.sendEmail(this.mailSender , user , mailMessage);

			req.flash('success' , 'Entity successfully added.');

			res.redirect('/internal/user/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.user;

		let user : User | null = await this.service.updateOne(entry);

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let levels : Level[] = [];

		let countries : Country[] = [];

		let userStatuses : UserStatus[] = [];

		if (user !== null) {

			faculties = user.getFaculties();

			departments = user.getDepartments();

			levels = user.getLevels();

			countries = user.getCountries();

			userStatuses = user.getUserStatuses(); 
		
			if (faculties.length < 1) { throw new Error("An error has occured."); }
		}

			res.render('pages/distinct/user/entry-update' , {'entry' : user , 'departments' : departments , 'faculties' : faculties , 'levels' : levels ,

				'countries' : countries , 'userStatuses' : userStatuses , 'title' : this.title});
	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let user : User | null = <User>req.bindingModel;

		let entry : string = req.params.user;

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let levels : Level[] = [];

		let countries : Country[] = [];

		let userStatuses : UserStatus[] = [];

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) {

			user = await this.service.relatedEntities(<User>user);

			if (user !== null) {

				faculties = user.getFaculties();

				departments = user.getDepartments();

				levels = user.getLevels();

				countries = user.getCountries();

				userStatuses = user.getUserStatuses(); 
			
				if (faculties.length < 1) { throw new Error("An error has occured."); } 
			}

		} else { user = null; }

			res.render('pages/distinct/user/entry-update' , {'entry' : user , 'departments' : departments , 'faculties' : faculties , 'levels' : levels ,

				'countries' : countries , 'userStatuses' : userStatuses , 'title' : this.title , 'errors' : errors});

			return; }

		user = await this.service.update(entry , <User>user);

		if (user !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/internal/user/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async updateOneRole(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.user;

		let user : User | null = await this.service.updateOneRole(entry);

		let roles : Role[] = [];

		if (user !== null) { 

			roles = user.getRoles(); 

			if (roles.length < 1) { throw new Error("An error has occured."); }
		}

		res.render('pages/distinct/user/entry-update-role' , {'entry' : user , 'roles' : roles , 'title' : this.title});
	}

	public async updateRole(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let user : User | null = <User>req.bindingModel;

		let entry : string = req.params.user;

		let roles : Role[] = [];

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) {

			user = await this.service.roleRelatedEntries(<User>user);

			if (user !== null) {

				roles = user.getRoles();
			
				if (roles.length < 1) { throw new Error("An error has occured."); } 
			}

		} else { user = null; }

			res.render('pages/distinct/user/entry-update-role' , {'entry' : user , 'roles' : roles , 'title' : this.title , 'errors' : errors});

			return; }

		let roleUpdated : boolean = await this.service.updateAndDeleteRole(entry , <User>user);

		if (roleUpdated === false) { throw new Error("An error has occured."); }

		if (user !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/internal/user/entries'); }

		else { throw new Error("An error has occured."); }

	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.user;

		let user : User | null = await this.service.deleteOne(entry);

		res.render('pages/distinct/user/entry-delete' , {'entry' : user , 'title' : this.title});
	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let user : User | null = <User>req.bindingModel;

		let entry : string = req.params.user;

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		res.render('pages/distinct/user/entry-delete' , {'entry' : user , 'title' : this.title , 'errors' : errors});

		return; }

		user = await this.service.remove(entry);

		if (user !== null) {

			req.flash('success' , 'Entity successfully removed.');

			res.redirect('/internal/user/entries'); }

		else { throw new Error("An error has occured."); }
	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let b : any = req.body;

 		let entries : string[] = b.entries !== null && b.entries.length > 0 ? b.entries : [];

 		let entriesTransformed : string = ServiceHelper.deleteMany(entries);

 		let users : User[] = await this.service.deleteMany(entriesTransformed);

		if (users.length > 0) {

			res.json({'message' : 'Entities successfully deleted.'}); }

		else { res.status(500);

			res.json({'message' : 'Unable to delete Entity or Entities'}); }
	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entries : User[] = await this.service.deleteAll();

		res.render('pages/shared/all/entry-delete-all' , {'entryType' : this.title , 'title' : this.title , 'entries' : entries});
	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.flash('success' , 'Entities successfully deleted.');

		let users : User[] = await this.service.findAndDeleteAll();

		if (users.length > 0) { res.redirect('/internal/thesis/'); }

		else { throw new Error("Unable to delete Entities"); }
	
	}

}