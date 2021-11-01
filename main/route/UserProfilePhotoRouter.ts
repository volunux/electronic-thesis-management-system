import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { UserProfilePhotoController } from '../controller/UserProfilePhotoController';
import { UserProfilePhotoRouteConfig } from './config/UserProfilePhotoRouteConfig';

export const UserProfilePhotoRouter : Router = express.Router();

const ctrl : UserProfilePhotoController = ProxyController.create<UserProfilePhotoController>(new UserProfilePhotoController());

ctrl.init(UserProfilePhotoRouteConfig.getInstance());

UserProfilePhotoRouter.get('/' , ctrl.home);

UserProfilePhotoRouter.get('/detail/:userprofilephoto' , ctrl.findOne);

UserProfilePhotoRouter.get('/entries' , ctrl.findAll);


UserProfilePhotoRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



UserProfilePhotoRouter.get('/delete/entries/all' , ctrl.deleteAll);

UserProfilePhotoRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);