import { Express , Request , Response , NextFunction } from 'express';

export class CartConfig {

	static init(app : Express) : void {

		app.use(function cartConfig(req : Request , res : Response , next : NextFunction) : void {

			if (req.session.cart === undefined || req.session.cart === null) { 

				req.session.cart = {

					'items' : [] ,

					'total_item' : 0 ,

					'total_amount' : 0 ,

					'total_quantity' : 0	} as any;
				
				}

			return next();

		});

	}
}