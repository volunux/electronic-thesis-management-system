import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../../route/config/RouteOptionsConfig';
import { RouteSearchCriteria } from '../../route/config/RouteSearchCriteria';
import { GeneralThesisService } from '../../model/service/GeneralThesisService';
import { GeneralThesisServiceImpl } from '../../model/service/impl/GeneralThesisServiceImpl';
import { Thesis } from '../../entity/Thesis';

export class GeneralThesisController {

	private service : GeneralThesisService = new GeneralThesisServiceImpl();

	private title : string = 'Thesis';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : string = req.params.thesis;

		let thesis : Thesis | null = await this.service.findOne(entry);

			res.render('pages/general/thesis/entry-detail' , {'entry' : thesis , 'title' : this.title});
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

			res.render('pages/general/thesis/entries' , {'entries' : entries , 'title' : this.title , 'search_criteria' : search_criteria , 

				'lastEntry' : lastEntry , 'prevPageNumber' : prevPageNumber , 'nextPageNumber' : nextPageNumber , 'flash' : flashMessage });	
	}


}