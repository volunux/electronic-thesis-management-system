import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../route/config/RouteSearchCriteria';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { GenericControllerInterface } from './interface/GenericControllerInterface';
import { Status } from '../entity/Status';
import { UserSession } from '../entity/UserSession';
import { DeliveryMethodServiceImpl } from '../model/service/impl/DeliveryMethodServiceImpl';
import { DeliveryMethodService } from '../model/service/DeliveryMethodService';
import { DeliveryMethod } from '../entity/DeliveryMethod';

export class DeliveryMethodController implements GenericControllerInterface {

	private service : DeliveryMethodService = new DeliveryMethodServiceImpl();

	private title : string = 'Delivery Method';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setDeliveryMethod(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new DeliveryMethod(req.body);

			(<DeliveryMethod>req.bindingModel).setUserId((<UserSession>req.user).getId()); }

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/shared/five/dashboard' , {'entryType' : this.title , 'title' : this.title});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.deliverymethod;

		let deliveryMethod : DeliveryMethod | null = await this.service.findOne(entry);

		res.render('pages/shared/five/entry-detail' , {'entry' : deliveryMethod , 'title' : this.title});
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : DeliveryMethod[] = await this.service.findAll(req.queryConfig);

		let totalCount : number = entries.length;

		if (entries.length == 11) entries.pop();

		if (entries.length > 0) { lastEntry = entries[entries.length - 1].getUpdatedOn().toString(); }

		let page : number = +(<any>req.query).page;

		let nextPageNumber : number = page ? page + 1 : 2;

		let prevPageNumber : number = page ? page - 1 : 0;

		res.render('pages/shared/five/entries' , {'entries' : entries , 'title' : this.title , 'search_criteria' : search_criteria , 

			'lastEntry' : "" + lastEntry , 'prevPageNumber' : prevPageNumber , 'nextPageNumber' : nextPageNumber , 'totalCount' : totalCount , 'flash' : flashMessage }); 
	}

	public async addOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let deliveryMethod : DeliveryMethod = new DeliveryMethod({});

		res.render('pages/shared/five/entry-create' , {'entry' : deliveryMethod , 'title' : this.title });
	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let deliveryMethod : DeliveryMethod | null = <DeliveryMethod>req.bindingModel;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/shared/five/entry-create' , {'entry' : deliveryMethod , 'title' : this.title , 'errors' : errors});

			return; }

		deliveryMethod = await this.service.save(<DeliveryMethod>deliveryMethod);

		if (deliveryMethod !== null) {

			req.flash('success' , 'Entity successfully added.');

			res.redirect('/internal/delivery-method/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.deliverymethod;

		let deliveryMethod : DeliveryMethod | null = await this.service.updateOne(entry);

		let statuses : Status[] = [];

		if (deliveryMethod !== null) { statuses = deliveryMethod.getStatuses(); 

			if (statuses.length < 1) { throw new Error("An error has occured."); }
		}

		res.render('pages/shared/five/entry-update' , {'entry' : deliveryMethod , 'statuses' : statuses , 'title' : this.title}); 
	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let deliveryMethod : DeliveryMethod | null = <DeliveryMethod>req.bindingModel;

		let entry : string = req.params.deliverymethod;

		let statuses : Status[] = [];

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) {

			deliveryMethod = await this.service.relatedEntities(<DeliveryMethod>deliveryMethod);

			if (deliveryMethod !== null) {

				statuses = deliveryMethod.getStatuses(); 

				if (statuses.length < 1) { throw new Error("An error has occured."); }
			}

		} else { deliveryMethod = null; }

			res.render('pages/shared/five/entry-update' , {'entry' : deliveryMethod , 'statuses' : statuses , 'title' : this.title , 'errors' : errors });

			return;
		}

		deliveryMethod = await this.service.update(entry , <DeliveryMethod>deliveryMethod);

		if (deliveryMethod !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/internal/delivery-method/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.deliverymethod;

		let deliveryMethod : DeliveryMethod | null = await this.service.deleteOne(entry);

		res.render('pages/shared/five/entry-delete' , {'entry' : deliveryMethod , 'title' : this.title});
	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let deliveryMethod : DeliveryMethod | null = <DeliveryMethod>req.bindingModel;

		let entry : string = req.params.deliverymethod;

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) { } else { deliveryMethod = null; }

		res.render('pages/shared/five/entry-delete' , {'entry' : deliveryMethod , 'title' : this.title , 'errors' : errors});

		return; }

		deliveryMethod = await this.service.remove(entry);

		if (deliveryMethod !== null) {

		req.flash('success' , 'Entity status successfully updated.');

		res.redirect('/internal/delivery-method/entries'); }

		else { throw new Error("An error has occured."); }
	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let b : any = req.body;

 		let entries : string[] = b.entries !== null && b.entries.length > 0 ? b.entries : [];

 		let entriesTransformed : string = ServiceHelper.deleteMany(entries);

 		let deliveryMethods : DeliveryMethod[] = await this.service.deleteMany(entriesTransformed);

		if (deliveryMethods.length > 0) {

			res.json({'message' : 'Entities successfully deleted.'}); }

		else { res.status(500);

		res.json({'message' : 'Unable to delete Entity or Entities'}); }
	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entries : DeliveryMethod[] = await this.service.deleteAll();

		res.render('pages/shared/all/entry-delete-all' , {'entryType' : this.title , 'title' : this.title , 'entries' : entries});
	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.flash('success' , 'Entities successfully deleted.');

		let entries : DeliveryMethod[] = await this.service.findAndDeleteAll();

		if (entries.length > 0) { res.redirect('/internal/delivery-method/'); }

		else { throw new Error("An error has occured."); }
	}

}