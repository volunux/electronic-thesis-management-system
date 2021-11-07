import { Express , Request , Response , NextFunction } from 'express';
import { CartItemsInvalidError } from '../entity/error/CartItemsInvalidError';
import { AuthorizationError } from '../entity/error/AuthorizationError';

export class GlobalErrorHandler {

		public static init(app : Express) : void {

		app.use((err : Error , req : Request , res : Response , next : NextFunction) => {

			if (err.constructor.name == 'CartItemsInvalidError') {

				let error : CartItemsInvalidError = <CartItemsInvalidError>err;

				let message : string = error.getMessage();

				let statusCode : number = error.getStatusCode();

				let title : string = 'Invalid Transaction';

				res.status(statusCode || 400);

				return res.render('pages/error/cart-items-invalid' , {'message' : message , 'status_code' : statusCode , 'title' : title });
			} 

				next(err);
		});

		app.use((err : Error , req : Request , res : Response , next : NextFunction) => {

			if (err.constructor.name == 'AuthorizationError') {

				let error : AuthorizationError = <AuthorizationError>err;

				let message : string = error.getMessage();

				let statusCode : number = error.getStatusCode();

				let title : string = 'Authorization Error';

				res.status(statusCode || 403);

				return res.render('pages/error/authentication' , {'message' : message , 'status_code' : statusCode , 'title' : title });
			} 

				next(err);
		});


		app.use((err : any , req : Request , res : Response , next : NextFunction) => {

			if (err.code == 'EBADCSRFTOKEN') {

				let message : string = 'The form you are trying to submit contains invalid input.';

				let statusCode : number = 400;

				res.status(statusCode || 400);

				let title : string = 'Invalid Form Submission';

				return res.render('pages/error/cart-items-invalid' , {'message' : message , 'status_code' : statusCode , 'title' : title });
			} 

				next(err);
		});

		app.use((err : any , req : Request , res : Response , next : NextFunction) => {

				let message : string = 'The action you are trying to perform cannot be processed.';

				let statusCode : number = 400;

				let title : string = '';

				res.status(statusCode || 400);

				console.log(err);

				return res.render('pages/error/error' , {'message' : message , 'status_code' : statusCode , 'title' : title });
		});

		}

}