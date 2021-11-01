import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../route/config/RouteSearchCriteria';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { GenericControllerInterface } from './interface/GenericControllerInterface';
import { Status } from '../entity/Status';
import { UserSession } from '../entity/UserSession';
import { RoleServiceImpl } from '../model/service/impl/RoleServiceImpl';
import { RoleService } from '../model/service/RoleService';
import { Role } from '../entity/Role';

export class RoleController implements GenericControllerInterface {

	private service : RoleService = new RoleServiceImpl();

	private title : string = 'Role';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setRole(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new Role(req.body);

			(<Role>req.bindingModel).setUserId((<UserSession>req.user).getId()); }

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {		

		res.render('pages/shared/two/dashboard' , {'entryType' : this.title , 'title' : this.title});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.role;

		let role : Role | null = await this.service.findOne(entry);

		res.render('pages/shared/two/entry-detail' , {'entry' : role , 'title' : this.title});
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : Role[] = await this.service.findAll(req.queryConfig);

		let totalCount : number = entries.length;

		if (entries.length == 11) entries.pop();

		if (entries.length > 0) { lastEntry = entries[entries.length - 1].getUpdatedOn().toString(); }

		let page : number = +(<any>req.query).page;

		let nextPageNumber : number = page ? page + 1 : 2;

		let prevPageNumber : number = page ? page - 1 : 0;

		res.render('pages/shared/two/entries' , {'entries' : entries , 'title' : this.title , 'search_criteria' : search_criteria , 

			'lastEntry' : lastEntry , 'prevPageNumber' : prevPageNumber , 'nextPageNumber' : nextPageNumber , 'totalCount' : totalCount , 'flash' : flashMessage }); 
	}

	public async addOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let role : Role = new Role({});

		res.render('pages/shared/two/entry-create' , {'entry' : role , 'title' : this.title });
	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let role : Role | null = <Role>req.bindingModel;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/shared/two/entry-create' , {'entry' : role , 'title' : this.title , 'errors' : errors});

			return; }

		role = await this.service.save(<Role>role);

		if (role !== null) {

			req.flash('success' , 'Entity successfully added.');

			res.redirect('/internal/role/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.role;

		let role : Role | null = await this.service.updateOne(entry);

		let statuses : Status[] = [];

		if (role !== null) { statuses = role.getStatuses(); 

			if (statuses.length < 1) { throw new Error("An error has occured."); }
		}

		res.render('pages/shared/two/entry-update' , {'entry' : role , 'statuses' : statuses , 'title' : this.title}); 
	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let role : Role | null = <Role>req.bindingModel;

		let entry : string = req.params.role;

		let statuses : Status[] = [];

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) {

			role = await this.service.relatedEntities(<Role>role);

			if (role !== null) {

				statuses = role.getStatuses(); 

				if (statuses.length < 1) { throw new Error("An error has occured."); }
			}
			
		} else { role = null; }

			res.render('pages/shared/two/entry-update' , {'entry' : role , 'statuses' : statuses , 'title' : this.title , 'errors' : errors });

			return;
		}

		role = await this.service.update(entry , <Role>role);

		if (role !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/internal/role/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.role;

		let role : Role | null = await this.service.deleteOne(entry);

		res.render('pages/shared/two/entry-delete' , {'entry' : role , 'title' : this.title});
	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let role : Role | null = <Role>req.bindingModel;

		let entry : string = req.params.role;

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) { } else { role = null; }

		res.render('pages/shared/two/entry-delete' , {'entry' : role , 'title' : this.title , 'errors' : errors});

		return; }

		role = await this.service.remove(entry);

		if (role !== null) {

		req.flash('success' , 'Entity successfully removed.');

		res.redirect('/internal/role/entries'); }

		else { throw new Error("An error has occured."); }
	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let b : any = req.body;

 		let entries : string[] = b.entries !== null && b.entries.length > 0 ? b.entries : [];

 		let entriesTransformed : string = ServiceHelper.deleteMany(entries);

 		let roles : Role[] = await this.service.deleteMany(entriesTransformed);

		if (roles.length > 0) {

			res.json({'message' : 'Entities successfully deleted.'}); }

		else { res.status(500);

			res.json({'message' : 'Unable to delete Entity or Entities'}); }
	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entries : Role[] = await this.service.deleteAll();

		res.render('pages/shared/all/entry-delete-all' , {'entryType' : this.title , 'title' : this.title , 'entries' : entries});
	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.flash('success' , 'Entities successfully deleted.');

		let entries : Role[] = await this.service.findAndDeleteAll();

		if (entries.length > 0) { res.redirect('/internal/role/'); }

		else { throw new Error("An error has occured."); }
	
	}

}