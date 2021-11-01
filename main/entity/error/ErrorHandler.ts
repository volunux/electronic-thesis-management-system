import { Response } from 'express';

export class ErrorHandler {

	public static handle(err : any , res : Response) {

		let status = err.statusCode || 500;

		let message = err.message;

		res.render('pages/error' , {'title' : 'Error has occured' , 'status' : status , 'message' : message});


	}

	}