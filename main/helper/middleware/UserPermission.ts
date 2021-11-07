import { Request , Response , NextFunction , RequestHandler } from 'express';
import { UserSession } from '../../entity/UserSession';
import { AuthorizationError } from '../../entity/error/AuthorizationError';

export class UserPermission {

	public static isUserPermitted(roles : string[]) : RequestHandler {

		return function(req : Request , res : Response , next : NextFunction) : void {

			let userRoles : string[] = (<UserSession>req.user).getRole().split(',');

			let isPermitted : boolean = false;

			userRoles.forEach(function(role : string) : void {

				if (roles.indexOf(role) > -1) { isPermitted = true; } });

			if (isPermitted !== false) { return next(); }

			else { throw new AuthorizationError(403 , "User is unauthorized to access this page. Sorry!!!"); }
		}
	}
}