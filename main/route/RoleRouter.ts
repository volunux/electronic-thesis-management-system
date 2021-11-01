import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { RoleController } from '../controller/RoleController';
import { RoleRouteConfig } from './config/RoleRouteConfig';

export const RoleRouter : Router = express.Router();

const ctrl : RoleController = ProxyController.create<RoleController>(new RoleController());

ctrl.init(RoleRouteConfig.getInstance());

RoleRouter.get('/' , ctrl.home);

RoleRouter.get('/entries' , ctrl.findAll);

RoleRouter.get('/detail/:role' , ctrl.findOne);



RoleRouter.get('/add', ctrl.addOne);

RoleRouter.post('/add' , EntryAuthor.setEntryAuthor , RoleController.setRole , ValidationRegister.two , ctrl.save);


RoleRouter.get('/update/:role' , ctrl.updateOne);

RoleRouter.post('/update/:role' , EntryAuthor.setEntryAuthor , RoleController.setRole , ValidationRegister.two , ctrl.update);


RoleRouter.get('/delete/:role' , ctrl.deleteOne);

RoleRouter.post('/delete/:role' , EntryAuthor.setEntryAuthor , RoleController.setRole , ctrl.delete);



RoleRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



RoleRouter.get('/delete/entries/all' , ctrl.deleteAll);

RoleRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);