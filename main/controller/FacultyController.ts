import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../route/config/RouteSearchCriteria';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { GenericControllerInterface } from './interface/GenericControllerInterface';
import { Status } from '../entity/Status';
import { UserSession } from '../entity/UserSession';
import { FacultyServiceImpl } from '../model/service/impl/FacultyServiceImpl';
import { FacultyService } from '../model/service/FacultyService';
import { Faculty } from '../entity/Faculty';

export class FacultyController implements GenericControllerInterface {

	private service : FacultyService = new FacultyServiceImpl();

	private title : string = 'Faculty';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setFaculty(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new Faculty(req.body);

			(<Faculty>req.bindingModel).setUserId((<UserSession>req.user).getId()); }

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/shared/one/dashboard' , {'title' : this.title});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.faculty;

		let faculty : Faculty | null = await this.service.findOne(entry);

		res.render('pages/shared/one/entry-detail' , {'entry' : faculty , 'title' : this.title});
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : Faculty[] = await this.service.findAll(req.queryConfig);

		let totalCount : number = entries.length;

		if (entries.length == 11) entries.pop();

		if (entries.length > 0) { lastEntry = entries[entries.length - 1].getUpdatedOn().toString(); }

		let page : number = +(<any>req.query).page;

		let nextPageNumber : number = page ? page + 1 : 2;

		let prevPageNumber : number = page ? page - 1 : 0;

		res.render('pages/shared/one/entries' , {'entries' : entries , 'title' : this.title , 'search_criteria' : search_criteria , 

			'lastEntry' : lastEntry , 'prevPageNumber' : prevPageNumber , 'nextPageNumber' : nextPageNumber , 'totalCount' : totalCount , 'flash' : flashMessage }); 
	}

	public async addOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let faculty : Faculty = new Faculty({});

		res.render('pages/shared/one/entry-create' , {'entry' : faculty , 'title' : this.title });
	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let faculty : Faculty | null = <Faculty>req.bindingModel;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/shared/one/entry-create' , {'entry' : faculty , 'title' : this.title , 'errors' : errors});

			return; }

		faculty = await this.service.save(<Faculty>faculty);

		if (faculty !== null) {

			req.flash('success' , 'Entity successfully added.');

			res.redirect('/internal/faculty/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.faculty;

		let faculty : Faculty | null = await this.service.updateOne(entry);

		let statuses : Status[] = [];

		if (faculty !== null) { statuses = faculty.getStatuses(); 

			if (statuses.length < 1) { throw new Error("An error has occured."); }
		}

			res.render('pages/shared/one/entry-update' , {'entry' : faculty , 'statuses' : statuses , 'title' : this.title}); 
	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let faculty : Faculty | null = <Faculty>req.bindingModel;

		let entry : string = req.params.faculty;

		let statuses : Status[] = [];

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) {

			faculty = await this.service.relatedEntities(<Faculty>faculty);

			if (faculty !== null) {

				statuses = faculty.getStatuses(); 

				if (statuses.length < 1) { throw new Error("An error has occured."); }
			}

		} else { faculty = null; }

			res.render('pages/shared/one/entry-update' , {'entry' : faculty , 'statuses' : statuses , 'title' : this.title , 'errors' : errors });

			return;
		}

		faculty = await this.service.update(entry , <Faculty>faculty);

		if (faculty !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/internal/faculty/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.faculty;

		let faculty : Faculty | null = await this.service.deleteOne(entry);

		res.render('pages/shared/one/entry-delete' , {'entry' : faculty , 'title' : this.title});
	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let faculty : Faculty | null = <Faculty>req.bindingModel;

		let entry : string = req.params.faculty;

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) { } else { faculty = null; }

		res.render('pages/shared/one/entry-delete' , {'entry' : faculty , 'title' : this.title , 'errors' : errors});

		return; }

		faculty = await this.service.remove(entry);

		if (faculty !== null) {

		req.flash('success' , 'Entity successfully removed.');

		res.redirect('/internal/faculty/entries'); }

		else { throw new Error("An error has occured."); }
	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let b : any = req.body;

 		let entries : string[] = b.entries !== null && b.entries.length > 0 ? b.entries : [];

 		let entriesTransformed : string = ServiceHelper.deleteMany(entries);

 		let faculties : Faculty[] = await this.service.deleteMany(entriesTransformed);

		if (faculties.length > 0) {

			res.json({'message' : 'Entities successfully deleted.'}); }

		else { res.status(500);

			res.json({'message' : 'Unable to delete Entity or Entities'}); }
	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entries : Faculty[] = await this.service.deleteAll();

		res.render('pages/shared/all/entry-delete-all' , {'entryType' : this.title , 'title' : this.title , 'entries' : entries});
	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.flash('success' , 'Entities successfully deleted.');

		let entries : Faculty[] = await this.service.findAndDeleteAll();

		if (entries.length > 0) { res.redirect('/internal/faculty/'); }

		else { throw new Error("An error has occured."); }
	
	}

}