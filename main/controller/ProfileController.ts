import { Request , Response , NextFunction } from 'express';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { S3ObjectChange } from '../helper/file/S3ObjectChange';
import { UserSession } from '../entity/UserSession';
import { Faculty } from '../entity/Faculty';
import { Department } from '../entity/Department';
import { Level } from '../entity/Level';
import { Country } from '../entity/Country';
import { User } from '../entity/User';
import { UserProfilePhoto } from '../entity/UserProfilePhoto';
import { UserSignature } from '../entity/UserSignature';
import { ProfileServiceImpl } from '../model/service/impl/ProfileServiceImpl';
import { ProfileService } from '../model/service/ProfileService';

export class ProfileController {

	private service : ProfileService = new ProfileServiceImpl();

	private title : string = 'Profile';

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setUserProfilePhoto(req : Request , res : Response , next : NextFunction) : void {

		if (req.file !== null && req.file !== undefined) {

			req.multipartFile = new UserProfilePhoto(req.file);

			(<UserProfilePhoto>req.multipartFile).setUserId((<UserSession>req.user).getId());
		}

		return next();
	} 

	public static setUserSignature(req : Request , res : Response , next : NextFunction) : void {

		if (req.file !== null && req.file !== undefined) {

			req.multipartFile = new UserSignature(req.file);

			(<UserSignature>req.multipartFile).setUserId((<UserSession>req.user).getId());
		}

		return next();
	} 

	public static setUserProfilePhotoII(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new UserProfilePhoto(req.body);

			(<UserProfilePhoto>req.bindingModel).setUserId((<UserSession>req.user).getId());
		}

		return next();
	} 

	public static setUserSignatureII(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new UserSignature(req.body);

			(<UserSignature>req.bindingModel).setUserId((<UserSession>req.user).getId());
		}

		return next();
	} 

	public static setUser(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) req.bindingModel = new User(req.body);

		return next();
	}

	public async home(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let flashMessage : string = req.flash('success')[0];

		res.render('pages/distinct/profile/dashboard' , {'entryType' : 'User' , 'title' : 'User' , 'flash' : flashMessage});
	}

	public async entries(req : Request , res : Response , next : NextFunction) : Promise<void> {		

		res.render('pages/distinct/profile/user-entries' , {'entryType' : 'User' , 'title' : 'User' });

	}

	public async findOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userId : number = (<UserSession>req.user).getId();

		let user : User | null = await this.service.findOne(userId);

		res.render('pages/distinct/profile/entry-detail' , {'entry' : user , 'title' : 'User'});
	}

	public async updateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userId : number = (<UserSession>req.user).getId();

		let user : User | null = await this.service.updateOne(userId);

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let levels : Level[] = [];

		let countries : Country[] = [];

		if (user !== null) {

			faculties = user.getFaculties();

			departments = user.getDepartments();

			levels = user.getLevels();

			countries = user.getCountries();
	
			if (faculties.length < 1) { throw new Error("An error has occured."); }
		}

			res.render('pages/distinct/profile/entry-update' , {'entry' : user , 'departments' : departments , 'faculties' : faculties , 'levels' : levels ,

				'countries' : countries , 'title' : this.title });
	}

	public async update(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let user : User | null = <User>req.bindingModel;

		let userId : number = (<UserSession>req.user).getId();

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let levels : Level[] = [];

		let countries : Country[] = [];

		if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

		if (await this.service.existsOne(userId)) {

			user = await this.service.relatedEntities(<User>user);

			if (user !== null) {

				faculties = user.getFaculties();

				departments = user.getDepartments();

				levels = user.getLevels();

				countries = user.getCountries();
		
				if (faculties.length < 1) { throw new Error("An error has occured."); }
			}
		
		} else { user = null; }

			res.render('pages/distinct/profile/entry-update' , {'entry' : user , 'departments' : departments , 'faculties' : faculties , 'levels' : levels ,

				'countries' : countries , 'title' : 'User' , 'errors' : errors}); 

			return; }

		user = await this.service.update(userId , <User>user);

		if (user !== null) {

		req.flash('success' , 'Entity successfully updated.');

		res.redirect('/profile'); }

		else { throw new Error("An error has occured."); }
	}

	public async deactivateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userId : number = (<UserSession>req.user).getId();

		let user : User | null = await this.service.deactivateOne(userId);

		res.render('pages/distinct/profile/entry-deactivate' , {'entry' : user , 'title' : 'User'});
	}

	public async deactivate(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userId : number = (<UserSession>req.user).getId();

		let user : User | null = await this.service.deactivate(userId);

		if (user !== null) {

			req.flash('success' , 'Profile successfully deactivated.');

			res.redirect('/profile/');
			
		} else { throw new Error("Entity cannot be found or retrieved"); }

	}

	public async reactivateOne(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userId : number = (<UserSession>req.user).getId();

		let user : User | null = await this.service.reactivateOne(userId);

		res.render('pages/distinct/profile/entry-reactivate' , {'entry' : user , 'title' : 'User'});
	}

	public async reactivate(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userId : number = (<UserSession>req.user).getId();

		let user : User | null = await this.service.reactivate(userId);

		if (user !== null) {

			req.flash('success' , 'Profile successfully reactivated.');

			res.redirect('/profile/');
			
		} else { throw new Error("Entity cannot be found or retrieved"); }

	}

	public async addProfilePhoto(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userId : number = (<UserSession>req.user).getId();

		let userExists : boolean = await this.service.existsOne(userId);

		return res.render('pages/distinct/profile/entry-update-profile-photo' , {'entry' : {} , 'fileSize' : 153600 , 'uploadUrl' : '/profile/profile-photo/' , 'fileType' : 'image' , 'title' : 'User'});
	}

	public async saveProfilePhoto(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userId : number = (<UserSession>req.user).getId();

		let userProfilePhoto : UserProfilePhoto | null = <UserProfilePhoto>req.multipartFile;

			if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/distinct/profile/entry-update-profile-photo' , {'title' : 'User' , 'fileSize' : 153600 , 'uploadUrl' : '/profile/signature/' , 'fileType' : 'image' , 'errors' : errors }); 

			return; }

		let objectLocation : string = (<UserProfilePhoto>userProfilePhoto).getLocation();

		let existsUserProfilePhoto : UserProfilePhoto | null = await this.service.existsUserProfilePhoto(userId);

		if (existsUserProfilePhoto !== null) {

			S3ObjectChange.objectDeleteByLocation(existsUserProfilePhoto.getLocation() , 'thesis_user'); }

			userProfilePhoto = await this.service.saveUserProfilePhoto(userId , <UserProfilePhoto>userProfilePhoto);

			if (userProfilePhoto !== null) {

			req.flash('success' , 'Entity successfully updated.');

			res.redirect('/profile/'); }

			else {

				S3ObjectChange.objectDeleteByLocation(objectLocation , 'thesis_user');

				throw new Error("An Error has occured"); }
	}

	public async addSignature(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userId : number = (<UserSession>req.user).getId();

		let userExists : boolean = await this.service.existsOne(userId);

		return res.render('pages/distinct/profile/entry-update-signature' , {'entry' : {} , 'fileSize' : 153600 , 'uploadUrl' : '/profile/signature/' , 'fileType' : 'image' , 'title' : 'User'});
	}

	public async saveSignature(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userId : number = (<UserSession>req.user).getId();

		let userSignature : UserSignature | null = <UserSignature>req.multipartFile;

			if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

			res.render('pages/distinct/profile/entry-update-signature' , {'title' : 'User' , 'fileSize' : 153600 , 'uploadUrl' : '/profile/signature/' , 'fileType' : 'image' , 'errors' : errors }); 

			return; }

		let objectLocation : string = (<UserSignature>userSignature).getLocation();

		let existsUserSignature : UserSignature | null = await this.service.existsUserSignature(userId);

		if (existsUserSignature !== null) {

			S3ObjectChange.objectDeleteByLocation(existsUserSignature.getLocation() , 'thesis_user'); }

			userSignature = await this.service.saveUserSignature(userId , <UserSignature>userSignature);

			if (userSignature !== null) {

			req.flash('success' , 'Entity successfully updated.');

			res.redirect('/profile/'); }

			else {

				S3ObjectChange.objectDeleteByLocation(objectLocation , 'thesis_user');

				throw new Error("An Error has occured");}
	}

	public async deleteOneProfilePhoto(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userId : number = (<UserSession>req.user).getId();

		res.render('pages/distinct/profile/entry-delete-profile-photo' , {'title' : 'User'});

	}

	public async deleteProfilePhoto(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userId : number = (<UserSession>req.user).getId();

		let userProfilePhoto : UserProfilePhoto | null = await this.service.deleteProfilePhoto(userId);

		if (userProfilePhoto !== null) {

			S3ObjectChange.objectDeleteByLocation(userProfilePhoto.getLocation() , 'thesis_user'); }

		req.flash('success' , 'Profile Photo successfully deleted.');

		res.redirect('/profile/');

	}

	public async deleteOneSignature(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userId : number = (<UserSession>req.user).getId();

		res.render('pages/distinct/profile/entry-delete-signature' , {'title' : 'User'});

	}

	public async deleteSignature(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userId : number = (<UserSession>req.user).getId();

		let userSignature : UserSignature | null = await this.service.deleteSignature(userId);

		if (userSignature !== null) {

			S3ObjectChange.objectDeleteByLocation(userSignature.getLocation() , 'thesis_user'); }

		req.flash('success' , 'Signature successfully deleted.');

		res.redirect('/profile/');

	}

	public async saveProfilePhotoII(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userId : number = (<UserSession>req.user).getId();

		let userProfilePhoto : UserProfilePhoto | null = <UserProfilePhoto>req.bindingModel;

			if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

			res.status(400).json({'message' : 'Action unsuccessful' , 'details' : { 'errors' : errors } }); 

			return; }

		let existsUserProfilePhoto : UserProfilePhoto | null = await this.service.existsUserProfilePhoto(userId);

		let objectLocation : string = (<UserProfilePhoto>userProfilePhoto).getLocation();

		if (existsUserProfilePhoto !== null) {

			S3ObjectChange.objectDeleteByLocation(existsUserProfilePhoto.getLocation() , 'thesis_user'); }


			userProfilePhoto = await this.service.saveUserProfilePhoto(userId , <UserProfilePhoto>userProfilePhoto);

			if (userProfilePhoto !== null) {

				res.status(200).json({'message' : 'Action successful' , 'details' : {'redirectUrl' : '/profile'}}); }

			else {

				S3ObjectChange.objectDeleteByLocation(objectLocation , 'thesis_user'); 

				res.status(400).json({'message' : 'Action unsuccessful' , 'details' : { 'errors' : [] } });
			}
	}

		public async saveSignatureII(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userId : number = (<UserSession>req.user).getId();

		let userSignature : UserSignature | null = <UserSignature>req.bindingModel;

			if (req.validationErrors.isEmpty() === false) {

		let errors : string[] = req.validationErrors.getErrors();

			res.status(400).json({'message' : 'Action unsuccessful' , 'details' : { 'errors' : errors } }); 

			return; }

		let existsUserSignature : UserSignature | null = await this.service.existsUserSignature(userId);

		let objectLocation : string = (<UserSignature>userSignature).getLocation();

		if (existsUserSignature !== null) {

			S3ObjectChange.objectDeleteByLocation(existsUserSignature.getLocation() , 'thesis_user'); }


			userSignature = await this.service.saveUserSignature(userId , <UserSignature>userSignature);

			if (userSignature !== null) {

				res.status(200).json({'message' : 'Action successful' , 'details' : {'redirectUrl' : '/profile'}}); }

			else {

				S3ObjectChange.objectDeleteByLocation(objectLocation , 'thesis_user'); 

				res.status(400).json({'message' : 'Action unsuccessful' , 'details' : { 'errors' : [] } });
			}
	}

	public async deleteProfilePhotoII(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let objectKey = req.params.objectkey;

		try {

			let result = await S3ObjectChange.objectDeleteByKey('thesis_user' , objectKey); 

			let userProfilePhoto : UserProfilePhoto | null = await this.service.deleteProfilePhotoByKey(objectKey);

			if (userProfilePhoto !== null) { 

				let key : string = userProfilePhoto.getKey(); }

			res.status(200).json({'message' : 'Action successful'}); 

			} catch(e : any) {

			res.status(400).json({'message' : 'Action unsuccessful' , 'errors' : {'errors' : []}}); }
	}

	public async deleteSignatureII(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let objectKey = req.params.objectkey;

		try {

			let result = await S3ObjectChange.objectDeleteByKey('thesis_user' , objectKey); 

			let userSignature : UserSignature | null = await this.service.deleteSignatureByKey(objectKey);

			if (userSignature !== null) { 

				let key : string = userSignature.getKey(); }

			res.status(200).json({'message' : 'Action successful'}); 

			} catch(e : any) {

			res.status(400).json({'message' : 'Action unsuccessful' , 'errors' : {'errors' : []}}); }
	}


}