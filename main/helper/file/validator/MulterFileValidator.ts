import { Request , Response , NextFunction , RequestHandler } from 'express';
import multer from 'multer';

export class MulterFileValidator {

	public static uploader(cb : any) : RequestHandler {

		return async function(req : Request , res : Response , next : NextFunction) : Promise<void> {

			cb(req , res , function(err : any) {

			if (err instanceof multer.MulterError) {

				if (err.code == 'LIMIT_FILE_SIZE') { req.validationErrors.addError('File is too large and will not be uploaded'); }

				if (err.code == 'LIMIT_FILE_COUNT') { req.validationErrors.addError('File limit has been exceeded and files will not be uploaded'); }

				if (err.code == 'LIMIT_UNEXPECTED_FILE') { req.validationErrors.addError('Error has occured during upload. Please try again'); }

				if (err.code == 'LIMIT_FIELD_COUNT') { req.validationErrors.addError('Too many files uploaded and operation is canceled. Please try again'); }

				return next();

			} else if (err) {

				throw new Error("An Error has occured"); }

			else { return next(); } 

		});

		}

	}

}