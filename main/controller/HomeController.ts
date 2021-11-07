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
import { MailMessageImpl } from '../util/mail/MailMessageImpl';
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

		 passport.authenticate('local-signin' , {'failureFlash' : true , 'session' : true} , async function(err , signedIn , info) {

			if (signedIn === false) {

				req.validationErrors.addError(info.message);

				let errors : string[] = req.validationErrors.getErrors();

				return res.render('pages/distinct/authentication/sign-in' , {'errors' : errors , 'entry' : new User({}) }); }

		 	req.login(signedIn , () => {

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

			let userCreate : User = await this.service.addAccount();

			if (userCreate !== null) {

				countries = userCreate.getCountries(); }

				user.setCountries(countries);

			if (countries.length < 1) { throw new Error("An error has occured."); }

				return res.render('pages/distinct/authentication/sign-up' , {'countries' : countries , 'title' : 'Account' , 'entry' : user , 'errors' : errors });

			}

			let thisObj : HomeController = this;

		 passport.authenticate('local-signup' , {'failureFlash' : true , 'session' : true} , async function(err : any , userCreated : any , info : any) {

			if (userCreated === false) {

				req.validationErrors.addError(info.message);

				let errors : string[] = req.validationErrors.getErrors();

				let userCreate : User = await thisObj.service.addAccount();

					if (userCreate !== null) {

						countries = userCreate.getCountries(); }

						user.setCountries(countries);

				return res.render('pages/distinct/authentication/sign-up' , {'entry' : user , 'title' : 'Account' , 'errors' : errors , 'countries' : countries }); }

			let datas : { [key : string] : any } = {

				'email_address' : user.getEmailAddress() ,

				'password' : user.getPassword() };

				let mailMessage : MailMessage = new MailMessageImpl('Account Created Successfully' , "");

			MailHelper.renderTemplateAndSend(res , 'templates/welcome' , thisObj.mailSender , mailMessage , <any>user , datas);

		 	req.login(user , () => {

			req.flash('success' , 'Account creation successful.');

		 		return res.redirect('/profile/'); });
		
		})(req , res , next);

	}

	public async forgotPassword(req : Request , res : Response , next : NextFunction) : Promise<void> {

		res.render('pages/general/index/forgot-password' , {'title' : 'Forgot password?'});
	}

	public async forgotPasswordConfirm(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : any = req.body;

		let thisObj : HomeController = this;

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

					let tokenExpiryDate : string = (Date.now() + 3600000).toString();

					if (emailAddressExists === true) {

						try { user = await thisObj.service.createForgotPasswordToken(emailAddress , token , tokenExpiryDate); }

						catch(err : any) { error = err; }

						done(error , token , user); }

					else {

						req.validationErrors.addError('No account or profile with that email address exists in the record.');

						let errors : string[] = req.validationErrors.getErrors();

					 res.render('pages/general/index/forgot-password' , {'title' : 'Forgot password?' , 'entry' : entry , 'errors' : errors}); }
			} ,

			async function deliverForgotPasswordMessage(token : string , user : User , done : (err : Error | null , user : User) => void) : Promise<void> {

			let datas : { [key : string] : any } = {

				'token' : token ,

				'host' : (<IncomingHttpHeaders>req.headers).host as string };

			let mailMessage : MailMessage = new MailMessageImpl('Password Reset Notification' , "");

			MailHelper.renderTemplateAndSend(res , 'templates/forgot-password' , thisObj.mailSender , mailMessage , <any>user , datas);

			done(null , user); 

			} ] ,

			async function confirmDelivery(err : Error | null | undefined, user : unknown) : Promise<void> {

				if (err) throw new Error('Error has occured');

			req.flash('success' , 'Forgot password email has been sent.');

		 		return res.redirect('/'); });
		}

		public async resetPassword(req : Request , res : Response , next : NextFunction) : Promise<void> {

			let resetPasswordToken : string = req.params.token;

			if (resetPasswordToken === undefined && resetPasswordToken === null) {

				req.validationErrors.addError('You need to provide a forgot password token');

				let errors : string[] = req.validationErrors.getErrors();

				return res.render('pages/general/index/forgot-password' , {'title' : 'Forgot password?' , 'errors' : errors }); }

			let user : User | null = await this.service.validateResetPasswordToken(resetPasswordToken);

				if (user !== null) { res.render('pages/general/index/reset-password'); }

				else {

					req.validationErrors.addError('Forgot password token has expired. You have to request for a new one.');

					let errors : string[] = req.validationErrors.getErrors();

					res.render('pages/general/index/forgot-password' , {'title' : 'Forgot password?' , 'errors' : errors}); }
		}

		public async saveNewPassword(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let entry : any = req.body;
			
		let thisObj : HomeController = this;

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/general/index/reset-password' , {'entry' : entry , 'title' : 'Forgot password?' , 'errors' : errors});

			return; }

			async.waterfall([

			async function saveNewPassword(done : (err : Error | null , user : User) => void) : Promise<void> {

			let token : string = req.params.token;

			let user : User | null = await thisObj.service.validateResetPasswordToken(token);

			if (user !== null) { UserHelper.setPassword(user); }

			else { let errors : string[] = ['Forgot password token has expired. You have to request for a new one.'];

				return res.render('pages/distinct/user/forgot-password' , {'title' : 'Forgot password?' , 'errors' : errors}); }

			user = await thisObj.service.saveNewPassword(user);

			if (user !== null) { done(null , user); }

			else { let errors : string[] = ['No account or profile with that email address exists in the record.'];

				return res.render('pages/distinct/user/forgot-password' , {'title' : 'Forgot password?' , 'errors' : errors}); }			
		} ,

		async function sendChangePasswordMessage(user : User , done : (err : Error | null , user : User) => void) : Promise<void> {

			let datas : { [key : string] : any } = {

				'full_name' : user.getFirstName() + ' ' + user.getLastName() ,

				'host' : (<IncomingHttpHeaders>req.headers).host as string };

			let mailMessage : MailMessage = new MailMessageImpl('Password Reset Successfully' , "");

			MailHelper.renderTemplateAndSend(res , 'templates/reset-password-success' , thisObj.mailSender , mailMessage , <any>user , datas);

			done(null , user); 

		} ] ,

		async function changesDone(err : Error | null | undefined , user : unknown) : Promise<void> {

			if (err) { let errors : string[] = ['Forgot password token has expired. You have to request for a new one.'];

				res.render('pages/distinct/user/forgot-password' , {'title' : 'Forgot password?' , 'errors' : errors}); }

			else { req.flash('success' , 'Password successfully changed and updated.');

		 		return res.redirect('/');	}	});
		}


}