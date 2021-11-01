import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../route/config/RouteSearchCriteria';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { GenericControllerInterface } from './interface/GenericControllerInterface';
import { Faculty } from '../entity/Faculty';
import { Status } from '../entity/Status';
import { UserSession } from '../entity/UserSession';
import { DepartmentServiceImpl } from '../model/service/impl/DepartmentServiceImpl';
import { DepartmentService } from '../model/service/DepartmentService';
import { Department } from '../entity/Department';

export class DepartmentController implements GenericControllerInterface {

	private service : DepartmentService = new DepartmentServiceImpl();

	private title : string = 'Department';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setDepartment(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new Department(req.body);

			(<Department>req.bindingModel).setUserId((<UserSession>req.user).getId()); }

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/distinct/department/dashboard' , {'title' : this.title});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.department;

		let department : Department | null = await this.service.findOne(entry);

		res.render('pages/distinct/department/entry-detail' , {'entry' : department , 'title' : this.title});
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : Department[] = await this.service.findAll(req.queryConfig);

		let totalCount : number = entries.length;

		if (entries.length == 11) entries.pop();

		if (entries.length > 0) { lastEntry = entries[entries.length - 1].getUpdatedOn().toString(); }

		let page : number = +(<any>req.query).page;

		let nextPageNumber : number = page ? page + 1 : 2;

		let prevPageNumber : number = page ? page - 1 : 0;

		res.render('pages/distinct/department/entries' , {'entries' : entries , 'title' : this.title , 'search_criteria' : search_criteria , 

			'lastEntry' : lastEntry , 'prevPageNumber' : prevPageNumber , 'nextPageNumber' : nextPageNumber , 'totalCount' : totalCount , 'flash' : flashMessage }); 
	}

	public async addOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let department : Department | null = await this.service.addOne();

		let faculties : Faculty[] = [];

		if (department !== null) {

			faculties = department.getFaculties(); }

		if (faculties.length < 1) { throw new Error("An error has occured."); }

		res.render('pages/distinct/department/entry-create' , {'faculties' : faculties , 'title' : this.title }); 
	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let department : Department | null = <Department>req.bindingModel;

		if (req.validationErrors.isEmpty() === false) {

			department = await this.service.relatedEntities(department);

			let faculties : Faculty[] = [];

			if (department !== null) {

				faculties = department.getFaculties(); }

			if (faculties.length < 1) { throw new Error("An error has occured."); }

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/distinct/department/entry-create' , {'entry' : department , 'faculties' : faculties , 'title' : this.title , 'errors' : errors});

			return; }

		department = await this.service.save(<Department>department);

		if (department !== null) {

			req.flash('success' , 'Entity successfully added.');

			res.redirect('/internal/department/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.department;

		let department : Department | null = await this.service.updateOne(entry);

		let statuses : Status[] = [];

		let faculties : Faculty[] = [];

		if (department !== null) { 

			statuses = department.getStatuses(); 

			faculties = department.getFaculties(); 

			if (statuses.length < 1) { throw new Error("An error has occured."); }
		}

			res.render('pages/distinct/department/entry-update' , {'entry' : department , 'faculties' : faculties , 'statuses' : statuses , 'title' : this.title}); 
	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let department : Department | null = <Department>req.bindingModel;

		let entry : string = req.params.department;

		let statuses : Status[] = [];

		let faculties : Faculty[] = [];

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) {

			department = await this.service.relatedEntities(<Department>department);

			if (department !== null) {

			statuses = department.getStatuses();

			faculties = department.getFaculties(); 

				if (statuses.length < 1) { throw new Error("An error has occured."); }
			} 

		} else { department = null; }

		res.render('pages/distinct/department/entry-update' , {'entry' : department , 'faculties' : faculties , 'statuses' : statuses , 'title' : this.title , 'errors' : errors }); 

			return; }

		department = await this.service.update(entry , <Department>department);

		if (department !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/internal/department/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.department;

		let department : Department | null = await this.service.deleteOne(entry);

		res.render('pages/distinct/department/entry-delete' , {'entry' : department , 'title' : this.title});
	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let department : Department | null = <Department>req.bindingModel;

		let entry : string = req.params.department;

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) { } else { department = null; }

		res.render('pages/distinct/department/entry-delete' , {'entry' : department , 'title' : this.title , 'errors' : errors});

		return; }

		department = await this.service.remove(entry);

		if (department !== null) {

		req.flash('success' , 'Entity successfully removed.');

		res.redirect('/internal/department/entries'); }

		else { throw new Error("An error has occured."); }
	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let b : any = req.body;

 		let entries : string[] = b.entries !== null && b.entries.length > 0 ? b.entries : [];

 		let entriesTransformed : string = ServiceHelper.deleteMany(entries);

 		let departments : Department[] = await this.service.deleteMany(entriesTransformed);

		if (departments.length > 0) {

			res.json({'message' : 'Entities successfully deleted.'}); }

		else { res.status(500);

			res.json({'message' : 'Unable to delete Entity or Entities'}); }
	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entries : Department[] = await this.service.deleteAll();

		res.render('pages/shared/all/entry-delete-all' , {'entryType' : this.title , 'title' : this.title , 'entries' : entries});
	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.flash('success' , 'Entities successfully deleted.');

		let entries : Department[] = await this.service.findAndDeleteAll();

		if (entries.length > 0) { res.redirect('/internal/department/'); }

		else { throw new Error("An error has occured."); }
	
	}

}