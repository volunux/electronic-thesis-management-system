import { Request , Response , NextFunction } from 'express';
import { UserSession } from '../entity/UserSession';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../route/config/RouteSearchCriteria';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { Status } from '../entity/Status';
import { ThesisReviewServiceImpl } from '../model/service/impl/ThesisReviewServiceImpl';
import { ThesisReviewService } from '../model/service/ThesisReviewService';
import { ThesisReview } from '../entity/ThesisReview';

export class ThesisReviewController {

	private service : ThesisReviewService = new ThesisReviewServiceImpl();

	private title : string = 'Thesis Review';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setThesisReview(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new ThesisReview(req.body);

			(<ThesisReview>req.bindingModel).setUserId((<UserSession>req.user).getId()); }

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {		

		res.render('pages/shared/three/dashboard' , {'entryType' : 'ThesisReview' , 'title' : 'Thesis Review'});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {
	
		let entry : string = req.params.thesisreview;

		let thesisReview : ThesisReview | null = await this.service.findOne(entry);

		res.render('pages/shared/three/entry-detail' , {'entry' : thesisReview , 'title' : this.title});
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : ThesisReview[] = await this.service.findAll(req.queryConfig);

		let totalCount : number = entries.length;

		if (entries.length == 11) entries.pop();

		if (entries.length > 0) { lastEntry = entries[entries.length - 1].getUpdatedOn().toString(); }

		let page : number = +(<any>req.query).page;

		let nextPageNumber : number = page ? page + 1 : 2;

		let prevPageNumber : number = page ? page - 1 : 0;

		res.render('pages/shared/three/entries' , {'entries' : entries , 'title' : this.title , 'search_criteria' : search_criteria , 

			'lastEntry' : lastEntry , 'prevPageNumber' : prevPageNumber , 'nextPageNumber' : nextPageNumber , 'flash' : flashMessage }); 
	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.thesisreview;

		let thesisReview : ThesisReview | null = await this.service.deleteOne(entry);

		res.render('pages/shared/three/entry-delete' , {'entry' : thesisReview , 'title' : this.title}); 
	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let thesisReview : ThesisReview | null = <ThesisReview>req.bindingModel;

		let entry : string = req.params.thesisreview;

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) { } else { thesisReview = null; }

		res.render('pages/shared/three/entry-delete' , {'entry' : thesisReview , 'title' : 'Thesis Review' , 'errors' : errors});

		return; }

		thesisReview = await this.service.remove(entry);

		if (thesisReview !== null) {

		req.flash('success' , 'Entity successfully removed.');

		res.redirect('/internal/thesis-review/entries'); }

		else { throw new Error("An error has occured."); }
	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let b : any = req.body;

 		let entries : string[] = b.entries !== null && b.entries.length > 0 ? b.entries : [];

 		let entriesTransformed : string = ServiceHelper.deleteMany(entries);

 		let thesisReviews : ThesisReview[] = await this.service.deleteMany(entriesTransformed);

		if (thesisReviews.length > 0) {

			res.json({'message' : 'Entities successfully deleted.'}); }

		else { res.status(500);

			res.json({'message' : 'Unable to delete Entity or Entities'}); }
	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entries : ThesisReview[] = await this.service.deleteAll();

		res.render('pages/shared/all/entry-delete-all' , {'entryType' : this.title , 'title' : this.title , 'entries' : entries});
	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.flash('success' , 'Entities successfully deleted.');

		let entries : ThesisReview[] = await this.service.findAndDeleteAll();

		if (entries.length > 0) { res.redirect('/internal/country/'); }

		else { throw new Error("An error has occured."); }
	
	}

}