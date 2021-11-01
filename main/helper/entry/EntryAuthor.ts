import { Request , Response , NextFunction } from 'express';
import { UserSession } from '../../entity/UserSession';

export class EntryAuthor {

	public static setEntryAuthor(req : Request , res : Response , next : NextFunction) : void {

		if (req.user != null && req.user != undefined && (<UserSession>req.user).getId() != undefined) {

			return next(); } 

		else { return next(); }

	}

}