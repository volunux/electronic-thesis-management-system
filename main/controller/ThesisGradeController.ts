import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../route/config/RouteSearchCriteria';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { GenericControllerInterface } from './interface/GenericControllerInterface';
import { Status } from '../entity/Status';
import { UserSession } from '../entity/UserSession';
import { ThesisGradeServiceImpl } from '../model/service/impl/ThesisGradeServiceImpl';
import { ThesisGradeService } from '../model/service/ThesisGradeService';
import { ThesisGrade } from '../entity/ThesisGrade';

export class ThesisGradeController implements GenericControllerInterface {

	private service : ThesisGradeService = new ThesisGradeServiceImpl();

	private title : string = 'Thesis Grade';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setThesisGrade(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new ThesisGrade(req.body);

			(<ThesisGrade>req.bindingModel).setUserId((<UserSession>req.user).getId()); }

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/shared/two/dashboard' , {'title' : this.title});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.thesisgrade;

		let thesisGrade : ThesisGrade | null = await this.service.findOne(entry);

		res.render('pages/shared/two/entry-detail' , {'entry' : thesisGrade , 'title' : this.title});
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : ThesisGrade[] = await this.service.findAll(req.queryConfig);

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

		let thesisGrade : ThesisGrade = new ThesisGrade({});

		res.render('pages/shared/two/entry-create' , {'entry' : thesisGrade , 'title' : this.title });
	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let thesisGrade : ThesisGrade | null = <ThesisGrade>req.bindingModel;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/shared/two/entry-create' , {'entry' : thesisGrade , 'title' : this.title , 'errors' : errors});

			return; }

		thesisGrade = await this.service.save(<ThesisGrade>thesisGrade);

		if (thesisGrade !== null) {

			req.flash('success' , 'Entity successfully added.');

			res.redirect('/internal/thesis-grade/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.thesisgrade;

		let thesisGrade : ThesisGrade | null = await this.service.updateOne(entry);

		let statuses : Status[] = [];

		if (thesisGrade !== null) { statuses = thesisGrade.getStatuses(); 

			if (statuses.length < 1) { throw new Error("An error has occured."); }
		}

		res.render('pages/shared/two/entry-update' , {'entry' : thesisGrade , 'statuses' : statuses , 'title' : this.title}); 
	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let thesisGrade : ThesisGrade | null = <ThesisGrade>req.bindingModel;

		let entry : string = req.params.thesisgrade;

		let statuses : Status[] = [];

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) {

			thesisGrade = await this.service.relatedEntities(<ThesisGrade>thesisGrade);

			if (thesisGrade !== null) {

				statuses = thesisGrade.getStatuses(); 

				if (statuses.length < 1) { throw new Error("An error has occured."); }
			}

		} else { thesisGrade = null; }

			res.render('pages/shared/two/entry-update' , {'entry' : thesisGrade , 'statuses' : statuses , 'title' : this.title , 'errors' : errors });

			return;
		}

		thesisGrade = await this.service.update(entry , <ThesisGrade>thesisGrade);

		if (thesisGrade !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/internal/thesis-grade/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.thesisgrade;

		let thesisGrade : ThesisGrade | null = await this.service.deleteOne(entry);

		res.render('pages/shared/two/entry-delete' , {'entry' : thesisGrade , 'title' : this.title});
	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let thesisGrade : ThesisGrade | null = <ThesisGrade>req.bindingModel;

		let entry : string = req.params.thesisgrade;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			if (await this.service.existsOne(entry)) { } else { thesisGrade = null; }

			res.render('pages/shared/two/entry-delete' , {'entry' : thesisGrade , 'title' : this.title , 'errors' : errors});

			return; }

		thesisGrade = await this.service.remove(entry);

		if (thesisGrade !== null) {

		req.flash('success' , 'Entity successfully removed.');

		res.redirect('/internal/thesis-grade/entries'); }

		else { throw new Error("An error has occured."); }
	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let b : any = req.body;

 		let entries : string[] = b.entries !== null && b.entries.length > 0 ? b.entries : [];

 		let entriesTransformed : string = ServiceHelper.deleteMany(entries);

 		let thesisGrades : ThesisGrade[] = await this.service.deleteMany(entriesTransformed);

		if (thesisGrades.length > 0) {

			res.json({'message' : 'Entities successfully deleted.'}); }

		else { res.status(500);

			res.json({'message' : 'Unable to delete Entity or Entities'}); }
	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entries : ThesisGrade[] = await this.service.deleteAll();

		res.render('pages/shared/all/entry-delete-all' , {'entryType' : this.title , 'title' : this.title , 'entries' : entries});
	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.flash('success' , 'Entities successfully deleted.');

		let entries : ThesisGrade[] = await this.service.findAndDeleteAll();

		if (entries.length > 0) { res.redirect('/internal/thesis-grade/'); }

		else { throw new Error("An error has occured."); }
	
	}

}