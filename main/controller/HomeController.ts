import  { Request , Response , NextFunction } from 'express';
import { IncomingHttpHeaders } from 'http';
import { PassportStatic } from 'passport';
import async from 'async';
import crypto from 'crypto';
import { UserSession } from '../entity/UserSession';
import { User } from '../entity/User';
import { Country } from '../entity/Country';
import { ShoppingCart } from '../entity/ShoppingCart';
import { ShippingDetail } from '../entity/ShippingDetail';
import { DeliveryMethod } from '../entity/DeliveryMethod';
import { OrderItem } from '../entity/OrderItem';
import { Order } from '../entity/Order';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { UserHelper } from '../helper/entry/UserHelper';
import { ShoppingCartHelper } from '../helper/shop/ShoppingCartHelper';
import { MailMessage } from '../util/mail/MailMessage';
import { MailMessageLocal } from '../util/mail/MailMessageLocal';
import { MailSender } from '../util/mail/MailSender';
import { MailSenderServicesContainer } from '../util/mail/MailSenderServicesContainer';
import { AuthenticationService } from '../model/service/AuthenticationService';
import { AuthenticationServiceImpl } from '../model/service/impl/AuthenticationServiceImpl';
import { MailHelper } from '../helper/middleware/MailHelper';

const passport : PassportStatic = require('passport');

export class HomeController {

	private service : AuthenticationService = new AuthenticationServiceImpl();

	private mailSender : MailSender | null = MailSenderServicesContainer.getService('sendgrid');

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setUser(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new User(req.body); }

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {

			res.render('pages/static/home');
	}

	public async contact(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/static/contact');
	}

	public async about(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/static/about');
	}

	public async signIn(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/distinct/authentication/sign-in' , {'entry' : new User({}) });
	}

	public async signInAccount(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let user : User = <User>req.bindingModel;

			if (req.validationErrors.isEmpty() === false) {

				let errors : string[] = req.validationErrors.getErrors();

				res.render('pages/distinct/authentication/sign-in' , {'entry' : user , 'title' : 'User' , 'errors' : errors});

				return; }

		 passport.authenticate('local-signin' , {'failureFlash' : true , 'session' : true} , async function(err , user , info) {

			if (user === false) {

				req.validationErrors.addError(info.message);

				let errors : string[] = req.validationErrors.getErrors();

				return res.render('pages/distinct/authentication/sign-in' , {'errors' : errors , 'entry' : new User({}) }); }

		 	req.login(user , () => {

			req.flash('success' , 'Authentication successful.');

		 		return res.redirect('/profile/'); });
		
		})(req , res , next);

	}

	public async signOut(req : Request , res : Response , next : NextFunction) : Promise<void> {

		req.logOut();

		req.session.destroy((err : Error) => { 

			res.redirect('/'); });
	}

	public async signUp(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let user : User = await this.service.addAccount();

		let countries : Country[] =  [];

		if (user !== null) {

			countries = user.getCountries(); }

		if (countries.length < 1) { throw new Error("An error has occured."); }

			res.render('pages/distinct/authentication/sign-up' , {'countries' : countries , 'title' : 'Account' , 'entry' : user });
	}

	public async signUpAccount(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let user : User = <User>req.bindingModel;

		let countries : Country[] =  [];

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			let user : User = await this.service.addAccount();

			if (user !== null) {

				countries = user.getCountries(); }

			if (countries.length < 1) { throw new Error("An error has occured."); }

				return res.render('pages/distinct/authentication/sign-up' , {'countries' : countries , 'title' : 'Account' , 'entry' : user , 'errors' : errors });

			}


		 passport.authenticate('local-signup' , {'failureFlash' : true , 'session' : true} , async function(err : any , user : any , info : any) {

			if (user === false) {

				req.validationErrors.addError(info.message);

				let errors : string[] = req.validationErrors.getErrors();

				return res.render('pages/distinct/authentication/sign-up' , {'errors' : errors , 'entry' : user }); }

		 	req.login(user , () => {

			req.flash('success' , 'Account creation successful.');

		 		return res.redirect('/profile/'); });
		
		})(req , res , next);

	}

	public async forgotPassword(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/general/index/forgot-password' , {'title' : 'Forgot password?'});
	}

	public async forgotPassword$(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : any = req.body;

		let thisObj = this;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/general/index/forgot-password' , {'entry' : entry , 'title' : 'Forgot password?' , 'errors' : errors});

			return; }

			async.waterfall([

				async function createToken(done : (err : Error | null , token : string) => void) : Promise<void> {

					crypto.randomBytes(20 , (err : Error | null , buf : Buffer) => {

						let token : string = buf.toString('hex');

						done(err , token); });	

				} ,

				async function saveRandomToken(token : string , done : (err : Error | null, token : string , user : any) => void) : Promise<void> {

					let emailAddress : string = req.body.email_address;

					let emailAddressExists : boolean = await thisObj.service.existsEmailAddress(emailAddress);

					let error : any;

					let user : User | null = null;

					let tokenExpiryDate : string = (Date.now() + 9600000).toString();

					if (emailAddressExists === true) {

						try { user = await thisObj.service.createForgotPasswordToken(emailAddress , token , tokenExpiryDate); }

						catch(err : any) { error = err; }

						done(error , token , user); }

					else { res.render('pages/general/index/forgot-password' , {'message' : 'No account or profile with that email address exists in the record.'}); }
			} ,

			async function deliverForgotPasswordMessage(token : string , user : User , done : (err : Error | null , user : User) => void) : Promise<void> {

			let mailMessage : MailMessage = MailMessageLocal.forgotPassword(user.getEmailAddress() , token , (<IncomingHttpHeaders>req.headers).host as string);

			MailHelper.sendEmail(thisObj.mailSender , user , mailMessage);

			done(null , user); 

			} ] ,

			async function confirmDelivery(err : Error | null | undefined, user : unknown) : Promise<void> {

				if (err) throw new Error('Error has occured');

				res.render('pages/distinct/user/forgot-password' , {'message' : 'Forgot password email has been sent'});
			
				});
		}

		public async resetPassword(req : Request , res : Response , next : NextFunction) : Promise<void> {

			let resetPasswordToken : string = req.params.token;

			if (resetPasswordToken === undefined && resetPasswordToken === null) {

				return res.render('pages/distinct/user/forgot-password/' , {'title' : 'Forgot password?' , 'message' : 'You need to provide a forgot password token'}); }

			let user : User | null = await this.service.validateResetPasswordToken(resetPasswordToken);

				if (user !== null) { res.render('pages/distinct/user/reset-password'); }

				else { res.render('pages/distinct/user/forgot-password' , {'title' : 'Forgot password?' , 'message' : 'Forgot password token has expired. You have to request for a new one.'}); }
		}

		public async saveNewPassword(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : any = req.body;
			
		let thisObj = this;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/general/index/forgot-password' , {'entry' : entry , 'title' : 'Forgot password?' , 'errors' : errors});

			return; }

			async.waterfall([

			async function saveNewPassword(done : (err : Error | null , user : User) => void) : Promise<void> {

			let token : string = req.params.token;

			let user : User | null = await thisObj.service.validateResetPasswordToken(token);

			if (user !== null) { UserHelper.setPassword(user); }

			else { return res.render('pages/distinct/user/forgot-password' , {'title' : 'Forgot password?' , 'message' : 'Forgot password token has expired. You have to request for a new one.'}); }

			user = await thisObj.service.saveNewPassword(user);

			if (user !== null) { done(null , user); }

			else { return res.render('pages/distinct/user/forgot-password' , {'title' : 'Forgot password?' , 'message' : 'No account or profile with that email address exists in the record.'}); }
			
		} ,

		async function sendChangePasswordMessage(user : User , done : (err : Error | null , user : User) => void) : Promise<void> {

				let mailMessage : MailMessage = MailMessageLocal.resetPasswordSuccess((<IncomingHttpHeaders>req.headers).host as string);

				MailHelper.sendEmail(thisObj.mailSender , user , mailMessage);

		} ] ,

		function changesDone(err : Error | null | undefined) {

			if (err) { res.render('pages/distinct/user/forgot-password' , {'title' : 'Forgot password?' , 'message' : 'Forgot password token has expired. You have to request for a new one.'}); }

			else { res.render('pages/distinct/user/forgot-password' , {'title' : 'User Profile' , 'message' : `Password successfully changed and updated.`});	}	

		});

		}


}