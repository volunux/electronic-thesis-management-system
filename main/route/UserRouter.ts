import express , { Router } from 'express';
import { UserController } from '../controller/UserController';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { UserRouteConfig } from './config/UserRouteConfig';
import { ProxyController } from '../util/proxy/ProxyController';

export const UserRouter : Router = express.Router();

const ctrl : UserController = ProxyController.create<UserController>(new UserController());

ctrl.init(UserRouteConfig.getInstance());

UserRouter.get('/' , ctrl.home);

UserRouter.get('/entries' , ctrl.findAll);

UserRouter.get('/detail/:user' , ctrl.findOne);



UserRouter.get('/add', ctrl.addOne);

UserRouter.post('/add' , EntryAuthor.setEntryAuthor , UserController.setUser , ValidationRegister.userCreate , ctrl.save);


UserRouter.get('/update/:user' , ctrl.updateOne);

UserRouter.post('/update/:user' , EntryAuthor.setEntryAuthor , UserController.setUser , ValidationRegister.userUpdate , ctrl.update);


UserRouter.get('/role/update/:user' , ctrl.updateOneRole);

UserRouter.post('/role/update/:user' , EntryAuthor.setEntryAuthor , UserController.setUser , ValidationRegister.userRoleUpdate , ctrl.updateRole);


UserRouter.get('/delete/:user' , ctrl.deleteOne);

UserRouter.post('/delete/:user' , EntryAuthor.setEntryAuthor , UserController.setUser , ctrl.delete);



UserRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



UserRouter.get('/delete/entries/all' , ctrl.deleteAll);

UserRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);