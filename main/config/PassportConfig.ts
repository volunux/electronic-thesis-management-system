import { Request , Response , NextFunction } from 'express';
import { Strategy } from 'passport-local';
import { Express } from 'express';
import { Passport , PassportStatic } from 'passport';
import { AuthenticationService } from '../model/service/AuthenticationService';
import { AuthenticationServiceImpl } from '../model/service/impl/AuthenticationServiceImpl';
import { UserHelper } from '../helper/entry/UserHelper';
import { UserSession } from '../entity/UserSession';
import { User } from '../entity/User';
import { Role } from '../entity/Role';

export class PassportConfig {

		private static service : AuthenticationService = new AuthenticationServiceImpl();

		public static init(passport : PassportStatic) : void {

			passport.serializeUser(function(user : Express.User , done : Function) {

				done(null , user); });

			passport.deserializeUser(function(user : UserSession , done : Function) {

				done(null , new UserSession(user)); });
		}

		static signUp(passport : PassportStatic) : PassportStatic {

			return passport.use('local-signup' , new Strategy({

					'usernameField' : 'email_address' ,

					'passwordField' : 'password' ,

					'passReqToCallback' : true } , 

				async function(req : Request , emailAddress : string , password : string , done : Function) {

					let user : User | null = <User>req.bindingModel;

					let emailAddressExists : boolean = await PassportConfig.service.existsEmailAddress(user.getEmailAddress());

						if (emailAddressExists === true) { return done(null , false , {'message' : `Email address already exists in the record and so cannot be used.` }); }

					let usernameExists : boolean = await PassportConfig.service.existsUsername(user.getUsername());

						if (usernameExists === true) { return done(null , false , {'message' : `Username already exists in the record and so cannot be used.` }); }

					UserHelper.setPassword(user);

					user = await PassportConfig.service.save(user);

					await PassportConfig.service.saveRole(<User>user);

					let roles : Role[] = await PassportConfig.service.findRole((<User>user).getId());

					let userRoleString : string = UserHelper.getUserRoles(roles);

					let userStatus : string | null = await PassportConfig.service.findUserStatus((<User>user).getId());

					let userSession = new UserSession(user);

					userSession.setRole(userRoleString);

					userSession.setUserStatus(<string>userStatus);

					return done(null , userSession); }));
		}

		static signIn(passport : PassportStatic) : PassportStatic {

			return passport.use('local-signin' , new Strategy({

					'usernameField' : 'email_address' ,

					'passwordField' : 'password' } , 

				async function(emailAddress : string , password : string , done : Function) {

				let user : User | null = await PassportConfig.service.existsLoginDetails(emailAddress);

				let userRoleString : string = "";

				if (user !== null) userRoleString = UserHelper.getUserRoles((<User>user).getRoles());

				if (user === null) { return done(null , false , {'message' : "The credential received does not exists in the record. Hint: Email Address." }); }

				if (user !== null) {

					let userSession = new UserSession(user);

					userSession.setRole(userRoleString);

					if (UserHelper.validPassword(password , userSession) === false) { return done(null , false , {'message' : "The credential received does not match any entry in the record. Hint: Password."}); }

						else { return done(null , userSession); } } }));
		}

	public static authenticationMiddleware (req : Request , res : Response , next : NextFunction) : void {
 	
 	   if (req.isAuthenticated()) { return next(); }

      else {

      req.validationErrors.addError('User Profile not authenticated');

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/distinct/authentication/sign-in' , {'entry' : new User({}) , 'title' : 'User' , 'errors' : errors}); }
  
		}
}