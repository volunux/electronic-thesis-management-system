import { Express , Request , Response , NextFunction } from 'express';
import Csrf from 'csurf';
import { CartItemsInvalidError } from '../entity/error/CartItemsInvalidError';

export class GlobalErrorHandler {

		public static init(app : Express) : void {

		app.use((err : Error , req : Request , res : Response , next : NextFunction) => {

			if (err.constructor.name == 'CartItemsInvalidError') {

				let error : CartItemsInvalidError = <CartItemsInvalidError>err;

				let message : string = error.getMessage();

				let statusCode : number = error.getStatusCode();

				let title : string = 'Invalid Transaction';

				return res.render('pages/error/cart-items-invalid' , {'message' : message , 'status_code' : statusCode , 'title' : title });
			} 

				next(err);
		});

		app.use((err : any , req : Request , res : Response , next : NextFunction) => {

			if (err.code == 'EBADCSRFTOKEN') {

				let message : string = 'The form you are trying to submit contains invalid input.';

				let statusCode : number = 400;

				let title : string = 'Invalid Form Submission';

				return res.render('pages/error/cart-items-invalid' , {'message' : message , 'status_code' : statusCode , 'title' : title });
			} 

				next(err);
		});

		app.use((err : any , req : Request , res : Response , next : NextFunction) => {

				let message : string = 'The action you are trying to perform cannot be processed.';

				let statusCode : number = 400;

				let title : string = '';

				return res.render('pages/error/error' , {'message' : message , 'status_code' : statusCode , 'title' : title });
		});

		}

}