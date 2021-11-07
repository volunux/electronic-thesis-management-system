import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../route/config/RouteSearchCriteria';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { S3ObjectChange } from '../helper/file/S3ObjectChange';
import { GenericControllerInterface } from './interface/GenericControllerInterface';
import { Faculty } from '../entity/Faculty';
import { Department } from '../entity/Department';
import { Publisher } from '../entity/Publisher';
import { Status } from '../entity/Status';
import { UserSession } from '../entity/UserSession';
import { ThesisServiceImpl } from '../model/service/impl/ThesisServiceImpl';
import { ThesisService } from '../model/service/ThesisService';
import { Thesis } from '../entity/Thesis';
import { ThesisGrade } from '../entity/ThesisGrade';
import { ThesisStatus } from '../entity/ThesisStatus';
import { ThesisCoverImage } from '../entity/ThesisCoverImage';
import { ThesisDocument } from '../entity/ThesisDocument';

export class ThesisController implements GenericControllerInterface {

	private service : ThesisService = new ThesisServiceImpl();

	private title : string = 'Thesis';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setThesisCoverImage(req : Request , res : Response , next : NextFunction) : void {

		if (req.file !== null && req.file !== undefined) {

			req.multipartFile = new ThesisCoverImage(req.file);

			(<ThesisCoverImage>req.multipartFile).setUserId((<UserSession>req.user).getId());
		}

		return next();
	} 

	public static setThesisDocument(req : Request , res : Response , next : NextFunction) : void {

		if (req.file !== null && req.file !== undefined) {

			req.multipartFile = new ThesisDocument(req.file);

			(<ThesisDocument>req.multipartFile).setUserId((<UserSession>req.user).getId());
		}

		return next();
	} 

	public static setThesis(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new Thesis(req.body);

			(<Thesis>req.bindingModel).setUserId((<UserSession>req.user).getId());

			(<Thesis>req.bindingModel).setAuthorId((<UserSession>req.user).getId()); }

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let flashMessage : string = req.flash('success')[0];

		res.render('pages/distinct/thesis/dashboard' , {'entryType' : this.title , 'title' : this.title , 'flash' : flashMessage});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.thesis;

		let thesis : Thesis | null = await this.service.findOne(entry);

		let thesisStatuses : ThesisStatus[] = [];

		if (thesis !== null) {

			thesisStatuses = thesis.getThesisStatuses();

			if (thesisStatuses.length < 1) { throw new Error("An error has occured."); } } 

		res.render('pages/distinct/thesis/entry-detail' , {'entry' : thesis , 'title' : this.title , 'statuses' : thesisStatuses });
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let path : string = req.path;

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : Thesis[] = [];

		let viewName : string = 'pages/distinct/thesis/entries';

		if (path.endsWith("/submission")) { entries = await this.service.findAllSubmission(req.queryConfig); 

			viewName = 'pages/distinct/thesis/submission-entries'; }

		else { entries = await this.service.findAll(req.queryConfig); }

		let totalCount : number = entries.length;

		if (entries.length == 11) entries.pop();

		if (entries.length > 0) { lastEntry = entries[entries.length - 1].getUpdatedOn().toString(); }

		let page : number = +(<any>req.query).page;

		let nextPageNumber : number = page ? page + 1 : 2;

		let prevPageNumber : number = page ? page - 1 : 0;

		res.render(viewName , {'entries' : entries , 'title' : this.title , 'search_criteria' : search_criteria , 

			'lastEntry' : lastEntry , 'prevPageNumber' : prevPageNumber , 'nextPageNumber' : nextPageNumber , 'totalCount' : totalCount , 'flash' : flashMessage }); 
	}

	public async addOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let thesis : Thesis | null = await this.service.addOne();

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let thesisGrades : ThesisGrade[] = [];

		let publishers : Publisher[] = [];

		let thesisStatuses : ThesisStatus[] = [];

		if (thesis !== null) {

			faculties = thesis.getFaculties();

			departments = thesis.getDepartments();

			thesisGrades = thesis.getThesisGrades();

			publishers = thesis.getPublishers();

			thesisStatuses = thesis.getThesisStatuses(); }

		if (faculties.length < 1) { throw new Error("An error has occured."); }

			res.render('pages/distinct/thesis/entry-create' , {'entry' : thesis , 'departments' : departments , 'faculties' : faculties , 'thesisGrades' : thesisGrades , 'publishers' : publishers , 

				'thesisStatuses' : thesisStatuses , 'title' : this.title});
	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let thesis : Thesis | null = <Thesis>req.bindingModel;

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let thesisGrades : ThesisGrade[] = [];

		let publishers : Publisher[] = [];

		let thesisStatuses : ThesisStatus[] = [];

			if (req.validationErrors.isEmpty() === false) {

				let errors : string[] = req.validationErrors.getErrors();

					thesis = await this.service.addOne();

				if (thesis !== null) {

					faculties = thesis.getFaculties();

					departments = thesis.getDepartments();

					thesisGrades = thesis.getThesisGrades();

					publishers = thesis.getPublishers();

					thesisStatuses = thesis.getThesisStatuses(); }

				if (faculties.length < 1) { throw new Error("An error has occured."); }

			res.render('pages/distinct/thesis/entry-create' , {'entry' : thesis , 'departments' : departments , 'faculties' : faculties , 'thesisGrades' : thesisGrades , 'publishers' : publishers , 

				'thesisStatuses' : thesisStatuses , 'title' : this.title , 'errors' : errors });

				return; }

		thesis = await this.service.save(<Thesis>thesis);

		if (thesis !== null) {

			req.flash('success' , 'Entity successfully added.');

			res.redirect('/internal/thesis/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.thesis;

		let thesis : Thesis | null = await this.service.updateOne(entry);

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let thesisGrades : ThesisGrade[] = [];

		let publishers : Publisher[] = [];

		let thesisStatuses : ThesisStatus[] = [];

		if (thesis !== null) {

			faculties = thesis.getFaculties();

			departments = thesis.getDepartments();

			thesisGrades = thesis.getThesisGrades();

			publishers = thesis.getPublishers();

			thesisStatuses = thesis.getThesisStatuses(); 
		
			if (faculties.length < 1) { throw new Error("An error has occured."); }
		}

		let title : string = (<Thesis>thesis).getTitle();

			res.render('pages/distinct/thesis/entry-update' , {'entry' : thesis , 'departments' : departments , 'faculties' : faculties , 'thesisGrades' : thesisGrades , 'publishers' : publishers , 

				'thesisStatuses' : thesisStatuses , 'title' : title });
	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let thesis : Thesis | null = <Thesis>req.bindingModel;

		let entry : string = req.params.thesis;

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let thesisGrades : ThesisGrade[] = [];

		let publishers : Publisher[] = [];

		let thesisStatuses : ThesisStatus[] = [];

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			if (await this.service.existsOne(entry)) {

				thesis = await this.service.relatedEntities(<Thesis>thesis);

				if (thesis !== null) {

					faculties = thesis.getFaculties();

					departments = thesis.getDepartments();

					thesisGrades = thesis.getThesisGrades();

					publishers = thesis.getPublishers();

					thesisStatuses = thesis.getThesisStatuses(); 

					this.title = thesis.getTitle();
				
					if (faculties.length < 1) { throw new Error("An error has occured."); } 
			}

		} else { thesis = null; }

			res.render('pages/distinct/thesis/entry-update' , {'entry' : thesis , 'departments' : departments , 'faculties' : faculties , 'thesisGrades' : thesisGrades , 'publishers' : publishers , 

				'thesisStatuses' : thesisStatuses , 'title' : this.title , 'errors' : errors });

			return; }

		thesis = await this.service.update(entry , <Thesis>thesis);

		if (thesis !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/internal/thesis/entries'); }

		else { throw new Error("An error has occured."); }

	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.thesis;

		let thesis : Thesis | null = await this.service.deleteOne(entry);

		res.render('pages/distinct/thesis/entry-delete' , {'entry' : thesis , 'title' : this.title});
	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let thesis : Thesis | null = <Thesis>req.bindingModel;

		let entry : string = req.params.thesis;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			if (await this.service.existsOne(entry)) { } else { thesis = null; }

			res.render('pages/distinct/thesis/entry-delete' , {'entry' : thesis , 'title' : this.title , 'errors' : errors});

			return; }

		thesis = await this.service.remove(entry);

		if (thesis !== null) {

			req.flash('success' , 'Entity successfully removed.');

			res.redirect('/internal/thesis/entries'); }

		else { throw new Error("An error has occured."); }
	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let b : any = req.body;

 		let entries : string[] = b.entries !== null && b.entries.length > 0 ? b.entries : [];

 		let entriesTransformed : string = ServiceHelper.deleteMany(entries);

 		let theses : Thesis[] = await this.service.deleteMany(entriesTransformed);

		if (theses.length > 0) {

			res.json({'message' : 'Entities successfully deleted.'}); }

		else { res.status(500);

			res.json({'message' : 'Unable to delete Entity or Entities'}); }
	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entries : Thesis[] = await this.service.deleteAll();

		res.render('pages/shared/all/entry-delete-all' , {'entryType' : this.title , 'title' : this.title , 'entries' : entries});
	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.flash('success' , 'Entities successfully deleted.');

		let theses : Thesis[] = await this.service.findAndDeleteAll();

		if (theses.length > 0) { res.redirect('/internal/thesis/'); }

		else { throw new Error("Unable to delete Entities"); }
	}

	public async updateOneThesisCoverImage(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.thesis;

		let thesis : Thesis | null = await this.service.entryExists(entry);

		let title : string = this.title;

		if (thesis !== null) {

			title = thesis.getTitle(); }

			res.render('pages/distinct/thesis/entry-update-cover-image' , {'title' : title , 'entry' : thesis });
	}

	public async updateThesisCoverImage(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.thesis;

		let thesisCoverImage : ThesisCoverImage | null = <ThesisCoverImage>req.multipartFile;

		let thesis : Thesis | null  = await this.service.entryExists(entry);

			if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			let title : string = this.title;

				if (thesis !== null) {

					title = thesis.getTitle();
				}

				res.render('pages/distinct/thesis/entry-update-cover-image' , {'title' : title , 'errors' : errors });

			return; }

		let thesisId : string = (<Thesis>thesis).getId().toString();

		let objectLocation : string = (<ThesisCoverImage>thesisCoverImage).getLocation();

		let existsThesisCoverImage : ThesisCoverImage | null = await this.service.existsThesisCoverImage(thesisId);

		if (existsThesisCoverImage !== null) {

			S3ObjectChange.objectDeleteByLocation(existsThesisCoverImage.getLocation() , 'thesis_cover_image'); }

			(<ThesisCoverImage>thesisCoverImage).setThesisId(thesisId);

			thesisCoverImage = await this.service.saveThesisCoverImage(<ThesisCoverImage>thesisCoverImage);

			if (thesisCoverImage !== null) {

			req.flash('success' , 'Entity successfully updated.');

			res.redirect('/internal/thesis/entries'); }

			else {

				S3ObjectChange.objectDeleteByLocation(objectLocation , 'thesis_cover_image');

				throw new Error("An Error has occured"); }
	}

	public async updateOneThesisDocument(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.thesis;

		let thesis : Thesis | null = await this.service.entryExists(entry);

		let title : string = this.title;

		if (thesis !== null) {

			title = thesis.getTitle(); }

			res.render('pages/distinct/thesis/entry-update-document' , {'title' : title , 'entry' : thesis });
	}

	public async updateThesisDocument(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.thesis;

		let thesisDocument : ThesisDocument | null = <ThesisDocument>req.multipartFile;

		let thesis : Thesis | null  = await this.service.entryExists(entry);

			if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			let title : string = this.title;

				if (thesis !== null) {

					title = thesis.getTitle();
				}

				res.render('pages/distinct/thesis/entry-update-document' , {'title' : title , 'errors' : errors , 'entry' : thesis });

			return; }

		let thesisId : string = (<Thesis>thesis).getId().toString();

		let objectLocation : string = (<ThesisDocument>thesisDocument).getLocation();

		let existsThesisDocument : ThesisDocument | null = await this.service.existsThesisDocument(thesisId);

		if (existsThesisDocument !== null) {

			S3ObjectChange.objectDeleteByLocation(existsThesisDocument.getLocation() , 'thesis_doc'); }

			(<ThesisDocument>thesisDocument).setThesisId(thesisId);

			thesisDocument = await this.service.saveThesisDocument(<ThesisDocument>thesisDocument);

			if (thesisDocument !== null) {

			req.flash('success' , 'Entity successfully updated.');

			res.redirect('/internal/thesis/entries'); }

			else {

				S3ObjectChange.objectDeleteByLocation(objectLocation , 'thesis_doc');

				throw new Error("An Error has occured"); }
	}

	public async updateStatus(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.thesis;

		let status : string = req.body.status;

		let entryExists : boolean = await this.service.existsOne(entry);

		if (entryExists === false) { throw new Error("An error has occured"); }

		let entryUpdated : boolean = await this.service.updateStatus(entry , status);

		if (entryUpdated === false) {

			throw new Error("An error has occured");
		}

			req.flash('success' , 'Entity successfully updated.');

			res.redirect('/internal/thesis/entries');
	}

}