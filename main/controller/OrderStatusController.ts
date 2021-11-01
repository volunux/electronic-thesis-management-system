import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../route/config/RouteSearchCriteria';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { GenericControllerInterface } from './interface/GenericControllerInterface';
import { UserSession } from '../entity/UserSession';
import { OrderStatusServiceImpl } from '../model/service/impl/OrderStatusServiceImpl';
import { OrderStatusService } from '../model/service/OrderStatusService';
import { OrderStatus } from '../entity/OrderStatus';

export class OrderStatusController implements GenericControllerInterface {

	private service : OrderStatusService = new OrderStatusServiceImpl();

	private title : string = 'Order Status';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setOrderStatus(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new OrderStatus(req.body);

			(<OrderStatus>req.bindingModel).setUserId((<UserSession>req.user).getId()); }

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/distinct/status/dashboard' , {'entryType' : this.title , 'title' : this.title});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.orderstatus;

		let orderStatus : OrderStatus | null = await this.service.findOne(entry);

		res.render('pages/distinct/status/entry-detail' , {'entry' : orderStatus , 'title' : this.title});
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : OrderStatus[] = await this.service.findAll(req.queryConfig);

		let totalCount : number = entries.length;

		if (entries.length == 11) entries.pop();

		if (entries.length > 0) { lastEntry = entries[entries.length - 1].getUpdatedOn().toString(); }

		let page : number = +(<any>req.query).page;

		let nextPageNumber : number = page ? page + 1 : 2;

		let prevPageNumber : number = page ? page - 1 : 0;

		res.render('pages/distinct/status/entries' , {'entries' : entries , 'title' : this.title , 'search_criteria' : search_criteria , 

			'lastEntry' : lastEntry , 'prevPageNumber' : prevPageNumber , 'nextPageNumber' : nextPageNumber , 'totalCount' : totalCount , 'flash' : flashMessage }); 
	}

	public async addOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let orderStatus : OrderStatus = new OrderStatus({});

		res.render('pages/distinct/status/entry-create' , {'entry' : orderStatus , 'title' : this.title });
	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let orderStatus : OrderStatus | null = <OrderStatus>req.bindingModel;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/distinct/status/entry-create' , {'entry' : orderStatus , 'title' : this.title , 'errors' : errors});

			return; }

		orderStatus = await this.service.save(<OrderStatus>orderStatus);

		if (orderStatus !== null) {

			req.flash('success' , 'Entity successfully added.');

			res.redirect('/internal/order-status/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.orderstatus;

		let orderStatus : OrderStatus | null = await this.service.updateOne(entry);

		res.render('pages/distinct/status/entry-update' , {'entry' : orderStatus , 'title' : this.title}); 
	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let orderStatus : OrderStatus | null = <OrderStatus>req.bindingModel;

		let entry : string = req.params.orderstatus;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			if (await this.service.existsOne(entry)) {

				} else { orderStatus = null; }

		res.render('pages/distinct/status/entry-update' , {'entry' : orderStatus , 'title' : this.title , 'errors' : errors }); 

			return; }

		orderStatus = await this.service.update(entry , <OrderStatus>orderStatus);

		if (orderStatus !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/internal/order-status/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.orderstatus;

		let orderStatus : OrderStatus | null = await this.service.deleteOne(entry);

		res.render('pages/distinct/status/entry-delete' , {'entry' : orderStatus , 'title' : this.title});
	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let orderStatus : OrderStatus | null = <OrderStatus>req.bindingModel;

		let entry : string = req.params.orderstatus;

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) { } else { orderStatus = null; }

		res.render('pages/distinct/status/entry-delete' , {'entry' : orderStatus , 'title' : this.title , 'errors' : errors});

		return; }

		orderStatus = await this.service.remove(entry);

		if (orderStatus !== null) {

		req.flash('success' , 'Entity successfully removed.');

		res.redirect('/internal/order-status/entries'); }

		else { throw new Error("An error has occured."); }
	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let b : any = req.body;

 		let entries : string[] = b.entries !== null && b.entries.length > 0 ? b.entries : [];

 		let entriesTransformed : string = ServiceHelper.deleteMany(entries);

 		let orderStatuses : OrderStatus[] = await this.service.deleteMany(entriesTransformed);

		if (orderStatuses.length > 0) {

			res.json({'message' : 'Entities successfully deleted'}); }

		else { res.status(500);

			res.json({'message' : 'Unable to delete Entity or Entities'}); }
	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entries : OrderStatus[] = await this.service.deleteAll();

		res.render('pages/shared/all/entry-delete-all' , {'entryType' : this.title , 'title' : this.title , 'entries' : entries});
	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.flash('success' , 'Entities successfully deleted.');

		let entries : OrderStatus[] = await this.service.findAndDeleteAll();

		if (entries.length > 0) { res.redirect('/internal/order-status/'); }

		else { throw new Error("An error has occured."); }
	
	}

}