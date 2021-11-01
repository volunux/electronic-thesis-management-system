import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../route/config/RouteSearchCriteria';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { GenericControllerInterface } from './interface/GenericControllerInterface';
import { OrderStatus } from '../entity/OrderStatus';
import { UserSession } from '../entity/UserSession';
import { OrderServiceImpl } from '../model/service/impl/OrderServiceImpl';
import { OrderService } from '../model/service/OrderService';
import { Order } from '../entity/Order';

export class OrderController implements GenericControllerInterface {

	private service : OrderService = new OrderServiceImpl();

	private title : string = 'Order';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setOrder(req : Request , res : Response , next : NextFunction) : void {

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/distinct/order/dashboard' , {'entryType' : this.title , 'title' : this.title});
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.order;

		let order : Order | null = await this.service.findOne(entry);

		res.render('pages/distinct/order/entry-detail' , {'entry' : order , 'title' : this.title});
	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let search_criteria : RouteSearchCriteria[] = (<RouteOptionsConfig>this.config).getRouteSearchCriteria();

		let flashMessage : string = req.flash('success')[0];

		let lastEntry : string = '';

		let entries : Order[] = await this.service.findAll(req.queryConfig);

		let totalCount : number = entries.length;

		if (entries.length == 11) entries.pop();

		if (entries.length > 0) { lastEntry = entries[entries.length - 1].getUpdatedOn().toString(); }

		let page : number = +(<any>req.query).page;

		let nextPageNumber : number = page ? page + 1 : 2;

		let prevPageNumber : number = page ? page - 1 : 0;

		res.render('pages/distinct/order/entries' , {'entries' : entries , 'title' : this.title , 'search_criteria' : search_criteria , 

			'lastEntry' : lastEntry , 'prevPageNumber' : prevPageNumber , 'nextPageNumber' : nextPageNumber , 'totalCount' : totalCount , 'flash' : flashMessage }); 
	}

	public async addOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {


	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry = req.params.order;

		let order : Order | null = await this.service.updateOne(entry);

		let statuses : OrderStatus[] = [];

		if (order !== null) { statuses = order.getStatuses(); 

			if (statuses.length < 1) { throw new Error("An error has occured."); }
		}

		res.render('pages/distinct/order/entry-update' , {'entry' : order , 'statuses' : statuses , 'title' : this.title}); 
	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let order : Order | null = <Order>req.bindingModel;

		let entry : string = req.params.order;

		let statuses : OrderStatus[] = [];

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) {

			order = await this.service.relatedEntities(<Order>order);

			if (order !== null) {

				statuses = order.getStatuses(); 

				if (statuses.length < 1) { throw new Error("An error has occured."); }
			}

		} else { order = null; }

			res.render('pages/distinct/order/entry-update' , {'entry' : order , 'statuses' : statuses , 'title' : this.title , 'errors' : errors });

			return;
		}

		order = await this.service.update(entry , <Order>order);

		if (order !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/internal/order/entries'); }

		else { throw new Error("An error has occured."); }
	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.order;

		let order : Order | null = await this.service.deleteOne(entry);

		res.render('pages/distinct/order/entry-delete' , {'entry' : order , 'title' : this.title});
	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let order : Order | null = <Order>req.bindingModel;

		let entry : string = req.params.order;

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(entry)) { } else { order = null; }

		res.render('pages/distinct/order/entry-delete' , {'entry' : order , 'title' : this.title , 'errors' : errors});

		return; }

		order = await this.service.remove(entry);

		if (order !== null) {

		req.flash('success' , 'Entity successfully removed.');

		res.redirect('/internal/order/entries'); }

		else { throw new Error("An error has occured."); }
	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let b : any = req.body;

 		let entries : string[] = b.entries !== null && b.entries.length > 0 ? b.entries : [];

 		let entriesTransformed : string = ServiceHelper.deleteMany(entries);

 		let countries : Order[] = await this.service.deleteMany(entriesTransformed);

		if (countries.length > 0) {

			res.json({'message' : 'Entities successfully deleted.'}); }

		else { res.status(500);

			res.json({'message' : 'Unable to delete Entity or Entities'}); }
	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entries : Order[] = await this.service.deleteAll();

		res.render('pages/shared/all/entry-delete-all' , {'entryType' : this.title , 'title' : this.title , 'entries' : entries});
	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.flash('success' , 'Entities successfully deleted.');

		let entries : Order[] = await this.service.findAndDeleteAll();

		if (entries.length > 0) { res.redirect('/internal/order/'); }

		else { throw new Error("An error has occured."); }
	
	}

}