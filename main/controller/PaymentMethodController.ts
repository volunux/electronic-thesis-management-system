import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../route/config/RouteSearchCriteria';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { GenericControllerInterface } from './interface/GenericControllerInterface';
import { Status } from '../entity/Status';
import { UserSession } from '../entity/UserSession';
import { PaymentMethodServiceImpl } from '../model/service/impl/PaymentMethodServiceImpl';
import { PaymentMethodService } from '../model/service/PaymentMethodService';
import { PaymentMethod } from '../entity/PaymentMethod';

export class PaymentMethodController implements GenericControllerInterface {

	private service : PaymentMethodService = new PaymentMethodServiceImpl();

	private title : string = 'Payment Method';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setPaymentMethod(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new PaymentMethod(req.body);

			(<PaymentMethod>req.bindingModel).setUserId((<UserSession>req.user).getId()); }

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/shared/five/dashboard' , {'entryType' : this.title , 'title' : this.title});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.paymentmethod;

		let paymentMethod : PaymentMethod | null = await this.service.findOne(entry);

		res.render('pages/shared/five/entry-detail' , {'entry' : paymentMethod , 'title' : this.title});
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : PaymentMethod[] = await this.service.findAll(req.queryConfig);

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

		let paymentMethod : PaymentMethod = new PaymentMethod({});

		res.render('pages/shared/five/entry-create' , {'entry' : paymentMethod , 'title' : this.title });
	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let paymentMethod : PaymentMethod | null = <PaymentMethod>req.bindingModel;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/shared/five/entry-create' , {'entry' : paymentMethod , 'title' : this.title , 'errors' : errors});

			return; }

		paymentMethod = await this.service.save(<PaymentMethod>paymentMethod);

		if (paymentMethod !== null) {

			req.flash('success' , 'Entity successfully added.');

			res.redirect('/internal/payment-method/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.paymentmethod;

		let paymentMethod : PaymentMethod | null = await this.service.updateOne(entry);

		let statuses : Status[] = [];

		if (paymentMethod !== null) { statuses = paymentMethod.getStatuses(); 

			if (statuses.length < 1) { throw new Error("An error has occured."); }
		}

		res.render('pages/shared/five/entry-update' , {'entry' : paymentMethod , 'statuses' : statuses , 'title' : this.title}); 
	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let paymentMethod : PaymentMethod | null = <PaymentMethod>req.bindingModel;

		let entry : string = req.params.paymentmethod;

		let statuses : Status[] = [];

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) {

			paymentMethod = await this.service.relatedEntities(<PaymentMethod>paymentMethod);

			if (paymentMethod !== null) {

				statuses = paymentMethod.getStatuses(); 

				if (statuses.length < 1) { throw new Error("An error has occured."); }
			}

		} else { paymentMethod = null; }

			res.render('pages/shared/five/entry-update' , {'entry' : paymentMethod , 'statuses' : statuses , 'title' : this.title , 'errors' : errors });

			return;
		}

		paymentMethod = await this.service.update(entry , <PaymentMethod>paymentMethod);

		if (paymentMethod !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/internal/payment-method/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.paymentmethod;

		let paymentMethod : PaymentMethod | null = await this.service.deleteOne(entry);

		res.render('pages/shared/five/entry-delete' , {'entry' : paymentMethod , 'title' : this.title});
	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let paymentMethod : PaymentMethod | null = <PaymentMethod>req.bindingModel;

		let entry : string = req.params.paymentmethod;

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) { } else { paymentMethod = null; }

		res.render('pages/shared/five/entry-delete' , {'entry' : paymentMethod , 'title' : this.title , 'errors' : errors});

		return; }

		paymentMethod = await this.service.remove(entry);

		if (paymentMethod !== null) {

		req.flash('success' , 'Entity status successfully updated.');

		res.redirect('/internal/payment-method/entries'); }

		else { throw new Error("An error has occured."); }
	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let b : any = req.body;

 		let entries : string[] = b.entries !== null && b.entries.length > 0 ? b.entries : [];

 		let entriesTransformed : string = ServiceHelper.deleteMany(entries);

 		let paymentMethods : PaymentMethod[] = await this.service.deleteMany(entriesTransformed);

		if (paymentMethods.length > 0) {

			res.json({'message' : 'Entities successfully deleted.'}); }

		else { res.status(500);

		res.json({'message' : 'Unable to delete Entity or Entities'}); }
	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entries : PaymentMethod[] = await this.service.deleteAll();

		res.render('pages/shared/all/entry-delete-all' , {'entryType' : this.title , 'title' : this.title , 'entries' : entries});
	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.flash('success' , 'Entities successfully deleted.');

		let entries : PaymentMethod[] = await this.service.findAndDeleteAll();

		if (entries.length > 0) { res.redirect('/internal/payment-method/'); }

		else { throw new Error("An error has occured."); }
	}

}