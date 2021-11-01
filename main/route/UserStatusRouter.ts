import express , { Router } from 'express';
import { UserStatusController } from '../controller/UserStatusController';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { UserStatusRouteConfig } from './config/UserStatusRouteConfig';
import { ProxyController } from '../util/proxy/ProxyController';

export const UserStatusRouter : Router = express.Router();

const ctrl : UserStatusController = ProxyController.create<UserStatusController>(new UserStatusController());

ctrl.init(UserStatusRouteConfig.getInstance());

UserStatusRouter.get('/' , ctrl.home);

UserStatusRouter.get('/entries' , ctrl.findAll);

UserStatusRouter.get('/detail/:userstatus' , ctrl.findOne);



UserStatusRouter.get('/add', ctrl.addOne);

UserStatusRouter.post('/add' , EntryAuthor.setEntryAuthor , UserStatusController.setUserStatus , ValidationRegister.status , ctrl.save);


UserStatusRouter.get('/update/:userstatus' , ctrl.updateOne);

UserStatusRouter.post('/update/:userstatus' , EntryAuthor.setEntryAuthor , UserStatusController.setUserStatus , ValidationRegister.status , ctrl.update);


UserStatusRouter.get('/delete/:userstatus' , ctrl.deleteOne);

UserStatusRouter.post('/delete/:userstatus' , EntryAuthor.setEntryAuthor , UserStatusController.setUserStatus , ctrl.delete);



UserStatusRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



UserStatusRouter.get('/delete/entries/all' , ctrl.deleteAll);

UserStatusRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);