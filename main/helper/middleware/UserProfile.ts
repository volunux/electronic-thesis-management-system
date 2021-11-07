import { Request , Response , NextFunction } from 'express';
import { UserSession } from '../../entity/UserSession';

export class UserProfile {

	public static setUserProfile(req : Request , res : Response , next : NextFunction) : void {

		if (req.user) { (<any>req.user) = new UserSession(req.user); }

			return next();
	}

	public static testProfile(req : Request , res : Response , next : NextFunction) : void {

		(<any>req.user) = new UserSession({'_id' : 1 , 'email_address' : 'volunux@gmail.com' , 'username' : 'volunux' , 'department' : 'Information and Media Technology' ,

		'faculty' : 'Information and Communication Technology' , 'level' : '500 Level' , 'role' : ['superAdministrator' , 'administrator'] });

			return next();
	}

	public static isAuthenticated(req : Request , res : Response , next : NextFunction) : void {

		if (req.isAuthenticated()) { return next(); }

		else { req.validationErrors.addError('You need to sign in before you can perform an action');

			let errors : string[] = req.validationErrors.getErrors();

			return res.render('pages/distinct/authentication/sign-in' , {'errors' : errors }); }

	}

	public static noAuthentication(req : Request , res : Response , next : NextFunction) : void {

		if (req.isAuthenticated()) { return res.redirect('/profile/'); }

		else { return next(); }

	}

	public static isUserLoggedIn(req : Request , res : Response , next : NextFunction) : void {

		if (req.user !== null && req.user !== undefined) { res.locals.isUserLoggedIn = true; }

		else { res.locals.isUserLoggedIn = false; }

		return next();
	}

	public static logOut(req : Request , res : Response , next : NextFunction) : void {

		if (req.isAuthenticated()) { return next(); }

		else { UserProfile.isAuthenticated(req , res , next); }

	}

}