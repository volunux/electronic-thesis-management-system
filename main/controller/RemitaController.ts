import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { ServiceHelper } from '../model/util/ServiceHelper';
import { RemitaHelper } from '../helper/shop/RemitaHelper';
import { RemitaTransaction } from '../entity/RemitaTransaction';
import { GenericControllerInterface } from './interface/GenericControllerInterface';

const CryptoJS = require('crypto-js');

export class RemitaController implements GenericControllerInterface {

	private title : string = 'Remita';

	private config : RouteOptionsConfig | null = null;

	private remitaHelper : RemitaHelper = new RemitaHelper();

	public init(config : RouteOptionsConfig) : void {

	}

	public static setTransaction(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new RemitaTransaction(req.body); }

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {


	}

	public async initialize(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let remitaTransaction : RemitaTransaction = new RemitaTransaction({});

		console.log(remitaTransaction);

		res.render('pages/remita/initialize' , {'entry' : remitaTransaction , 'title' : this.title});
	}

	public async confirmInitialization(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let remitaTransaction : RemitaTransaction = <RemitaTransaction>req.bindingModel;

		let responseData : { [key : string] : any } = await this.remitaHelper.initializeTransaction(remitaTransaction);

		remitaTransaction.setReferenceCode(responseData.RRR);

		let hash : string = CryptoJS.SHA512(remitaTransaction.getMerchantId() + remitaTransaction.getReferenceCode() + remitaTransaction.getApiKey()).toString();

		remitaTransaction.setHash(hash);

		let transformedReference : string = RemitaHelper.tranformReferenceCode(remitaTransaction.getReferenceCode());

		res.render('pages/remita/entry-create' , {'entry' : remitaTransaction , 'referenceCode' : transformedReference , 'title' : this.title });
	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

	}

	public async findAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

	}

	public async addOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

	}

	public async save(req : Request , res : Response , next : NextFunction) : Promise<void> {

	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

	}

	public async deleteOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

	}

	public async delete(req : Request , res : Response , next : NextFunction) : Promise<void> {

	} 

	public async deleteMany(req : Request , res : Response , next : NextFunction) : Promise<void> {

	}

	public async deleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

	}

	public async findAndDeleteAll(req : Request , res : Response , next : NextFunction) : Promise<void> {

	}

}