import { Request , Response , NextFunction } from 'express';
import { UserSession } from '../../entity/UserSession';
import { RouteOptionsConfig } from '../../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../../route/config/RouteSearchCriteria';
import { S3ObjectChange } from '../../helper/file/S3ObjectChange';
import { Department } from '../../entity/Department';
import { Faculty } from '../../entity/Faculty';
import { ThesisGrade } from '../../entity/ThesisGrade';
import { Publisher } from '../../entity/Publisher';
import { ThesisCoverImage } from '../../entity/ThesisCoverImage';
import { ThesisDocument } from '../../entity/ThesisDocument';
import { GeneralThesisService } from '../../model/service/GeneralThesisService';
import { GeneralThesisServiceImpl } from '../../model/service/impl/GeneralThesisServiceImpl';
import { Thesis } from '../../entity/Thesis';

export class UserThesisController {

	private service : GeneralThesisService = new GeneralThesisServiceImpl();

	private title : string = 'User Thesis';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setThesisCoverImage(req : Request , res : Response , next : NextFunction) : void {

		if (req.file !== null && req.file !== undefined) {

			req.multipartFile = new ThesisCoverImage(req.file);

			(<ThesisCoverImage>req.multipartFile).setUserId((<UserSession>req.user).getId()); }

		return next();
	} 

	public static showSubmissionView(req : Request , res : Response , next : NextFunction) : void {

			if ((<any>req.session).submission) {

			 delete (<any>req.session).submission;

			return res.render('pages/distinct/user-thesis/submission'); }

			return next();
	}

	public static setThesisDocument(req : Request , res : Response , next : NextFunction) : void {

		if (req.file !== null && req.file !== undefined) {

			req.multipartFile = new ThesisDocument(req.file);

			(<ThesisDocument>req.multipartFile).setUserId((<UserSession>req.user).getId()); }

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

			res.render('pages/distinct/user-thesis/dashboard' , {'entryType' : this.title , 'title' : this.title , 'flash' : flashMessage});
	}

	public async findThesis(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.thesis;

		let thesis : Thesis | null = await this.service.findOne(entry);

		res.render('pages/general/thesis/entry-detail' , {'entry' : thesis , 'title' : this.title});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.thesis;

		let thesis : Thesis | null = await this.service.findOne(entry);

		res.render('pages/distinct/user-thesis/entry-detail' , {'entry' : thesis , 'title' : this.title});
	}

	public async findAllThesis(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : Thesis[] = await this.service.findAll(req.queryConfig);

		let totalCount : number = entries.length;

		if (entries.length == 11) entries.pop();

		if (entries.length > 0) { lastEntry = entries[entries.length - 1].getUpdatedOn().toString(); }

		let page : number = +(<any>req.query).page;

		let nextPageNumber : number = page ? page + 1 : 2;

		let prevPageNumber : number = page ? page - 1 : 0;

			res.render('pages/general/thesis/entries' , {'entries' : entries , 'title' : this.title , 'search_criteria' : search_criteria , 

				'lastEntry' : lastEntry , 'prevPageNumber' : prevPageNumber , 'nextPageNumber' : nextPageNumber , 'flash' : flashMessage });	
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : Thesis[] = await this.service.findAll(req.queryConfig);

		let totalCount : number = entries.length;

		if (entries.length == 11) entries.pop();

		if (entries.length > 0) { lastEntry = entries[entries.length - 1].getUpdatedOn().toString(); }

		let page : number = +(<any>req.query).page;

		let nextPageNumber : number = page ? page + 1 : 2;

		let prevPageNumber : number = page ? page - 1 : 0;

			res.render('pages/distinct/user-thesis/entries' , {'entries' : entries , 'title' : this.title , 'search_criteria' : search_criteria , 

				'lastEntry' : lastEntry , 'prevPageNumber' : prevPageNumber , 'nextPageNumber' : nextPageNumber , 'flash' : flashMessage }); 
	}

	public async addOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let thesis : Thesis | null = await this.service.addOne();

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let thesisGrades : ThesisGrade[] = [];

		let publishers : Publisher[] = [];

		if (thesis !== null) {

			faculties = thesis.getFaculties();

			departments = thesis.getDepartments();

			thesisGrades = thesis.getThesisGrades();

			publishers = thesis.getPublishers(); }

		if (faculties.length < 1) { throw new Error("An error has occured."); }

			res.render('pages/distinct/user-thesis/entry-create' , {'entry' : thesis , 'departments' : departments , 'faculties' : faculties , 

				'thesisGrades' : thesisGrades , 'publishers' : publishers , 'title' : this.title});
	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let thesis : Thesis | null = <Thesis>req.bindingModel;

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let thesisGrades : ThesisGrade[] = [];

		let publishers : Publisher[] = [];

			if (req.validationErrors.isEmpty() === false) {

				thesis = await this.service.addOne();

			if (thesis !== null) {

				faculties = thesis.getFaculties();

				departments = thesis.getDepartments();

				thesisGrades = thesis.getThesisGrades();

				publishers = thesis.getPublishers(); }

			if (faculties.length < 1) { throw new Error("An error has occured."); }

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/distinct/user-thesis/entry-create' , {'entry' : thesis , 'departments' : departments , 'faculties' : faculties , 

				'thesisGrades' : thesisGrades , 'publishers' : publishers , 'title' : this.title , 'errors' : errors });

				return; }

		thesis = await this.service.save(<Thesis>thesis);

		if (thesis !== null) {

			req.flash('success' , 'Entity successfully added.');

			(<any>req.session).submission = true;

			res.redirect('/thesis/user/add'); }

		else { throw new Error("An error has occured."); }

	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.thesis;

		let thesis : Thesis | null = await this.service.updateOne(entry);

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let thesisGrades : ThesisGrade[] = [];

		let publishers : Publisher[] = [];

		if (thesis !== null) {

			faculties = thesis.getFaculties();

			departments = thesis.getDepartments();

			thesisGrades = thesis.getThesisGrades();

			publishers = thesis.getPublishers();
		
			if (faculties.length < 1) { throw new Error("An error has occured."); }
		}

		let title : string = (<Thesis>thesis).getTitle();

			res.render('pages/distinct/user-thesis/entry-update' , {'entry' : thesis , 'departments' : departments , 'faculties' : faculties , 

				'thesisGrades' : thesisGrades , 'publishers' : publishers , 'title' : title });
	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let thesis : Thesis | null = <Thesis>req.bindingModel;

		let entry : string = req.params.thesis;

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let thesisGrades : ThesisGrade[] = [];

		let publishers : Publisher[] = [];

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) {

			thesis = await this.service.relatedEntities(<Thesis>thesis);

			if (thesis !== null) {

				faculties = thesis.getFaculties();

				departments = thesis.getDepartments();

				thesisGrades = thesis.getThesisGrades();

				publishers = thesis.getPublishers();
			
				if (faculties.length < 1) { throw new Error("An error has occured."); } 
			}

		} else { thesis = null; }

			res.render('pages/distinct/user-thesis/entry-update' , {'entry' : thesis , 'departments' : departments , 'faculties' : faculties ,

				'thesisGrades' : thesisGrades , 'publishers' : publishers , 'title' : this.title , 'errors' : errors });

			return; }

		thesis = await this.service.update(entry , <Thesis>thesis);

		if (thesis !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/thesis/user/entries'); }

		else { throw new Error("An error has occured."); }

	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.thesis;

		let thesis : Thesis | null = await this.service.deleteOne(entry);

		res.render('pages/distinct/user-thesis/entry-delete' , {'entry' : thesis , 'title' : this.title});

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

			res.redirect('/thesis/user/entries'); }

		else { throw new Error("An error has occured."); }
	} 

	public async updateOneThesisCoverImage(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.thesis;

		let thesis : Thesis | null = await this.service.entryExists(entry);

		let title : string = this.title;

		if (thesis !== null) {

			title = thesis.getTitle(); }

		res.render('pages/distinct/user-thesis/entry-update-cover-image' , {'title' : title , 'fileSize' : 153600 , 'uploadUrl' : '/user/thesis/cover-image' , 'fileType' : 'image' , 'entry' : thesis });
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

		res.render('pages/distinct/user-thesis/entry-update-cover-image' , {'title' : title , 'fileSize' : 153600 , 'uploadUrl' : '/user/thesis/cover-image' , 'fileType' : 'image' , 'entry' : thesis });

			return; }

		let thesisId : string = (<Thesis>thesis).getId().toString();

		let objectLocation : string = (<ThesisCoverImage>thesisCoverImage).getLocation();

		let existsThesisCoverImage : ThesisCoverImage | null = await this.service.existsThesisCoverImage(thesisId);

		if (existsThesisCoverImage !== null) {

			S3ObjectChange.objectDeleteByLocation(existsThesisCoverImage.getLocation() , 'thesis_cover_image'); }

			(<ThesisCoverImage>thesisCoverImage).setThesisId(thesisId);

			thesisCoverImage = await this.service.saveThesisCoverImage(<ThesisCoverImage>thesisCoverImage);

			if (thesisCoverImage !== null) {

			req.flash('success' , 'Entity successfully added.');

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

		res.render('pages/distinct/user-thesis/entry-update-document' , {'title' : title , 'fileSize' : 2097152 , 'uploadUrl' : '/user/thesis/thesis-document' , 'fileType' : 'application' , 'entry' : thesis });
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

		res.render('pages/distinct/user-thesis/entry-update-document' , {'title' : title , 'fileSize' : 2097152 , 'uploadUrl' : '/user/thesis/thesis-document' , 'fileType' : 'application' , 'entry' : thesis });

			return; }

		let thesisId : string = (<Thesis>thesis).getId().toString();

		let objectLocation : string = (<ThesisDocument>thesisDocument).getLocation();

		let existsThesisDocument : ThesisDocument | null = await this.service.existsThesisDocument(thesisId);

		if (existsThesisDocument !== null) {

			S3ObjectChange.objectDeleteByLocation(existsThesisDocument.getLocation() , 'thesis_doc'); }

			(<ThesisDocument>thesisDocument).setThesisId(thesisId);

			thesisDocument = await this.service.saveThesisDocument(<ThesisDocument>thesisDocument);

			if (thesisDocument !== null) {

			req.flash('success' , 'Entity successfully added.');

			res.redirect('/internal/thesis/entries'); }

			else {

				S3ObjectChange.objectDeleteByLocation(objectLocation , 'thesis_doc');

				throw new Error("An Error has occured"); }
	}


}