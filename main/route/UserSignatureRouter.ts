import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { UserSignatureController } from '../controller/UserSignatureController';
import { UserSignatureRouteConfig } from './config/UserSignatureRouteConfig';

export const UserSignatureRouter : Router = express.Router();

const ctrl : UserSignatureController = ProxyController.create<UserSignatureController>(new UserSignatureController());

ctrl.init(UserSignatureRouteConfig.getInstance());

UserSignatureRouter.get('/' , ctrl.home);

UserSignatureRouter.get('/detail/:usersignature' , ctrl.findOne);

UserSignatureRouter.get('/entries' , ctrl.findAll);


UserSignatureRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



UserSignatureRouter.get('/delete/entries/all' , ctrl.deleteAll);

UserSignatureRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);