import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { StatusController } from '../controller/StatusController';
import { StatusRouteConfig } from './config/StatusRouteConfig';

export const StatusRouter : Router = express.Router();

const ctrl : StatusController = ProxyController.create<StatusController>(new StatusController());

ctrl.init(StatusRouteConfig.getInstance());

StatusRouter.get('/' , ctrl.home);

StatusRouter.get('/entries' , ctrl.findAll);

StatusRouter.get('/detail/:status' , ctrl.findOne);



StatusRouter.get('/add', ctrl.addOne);

StatusRouter.post('/add' , EntryAuthor.setEntryAuthor , StatusController.setStatus , ValidationRegister.status , ctrl.save);


StatusRouter.get('/update/:status' , ctrl.updateOne);

StatusRouter.post('/update/:status' , EntryAuthor.setEntryAuthor , StatusController.setStatus , ValidationRegister.status , ctrl.update);


StatusRouter.get('/delete/:status' , ctrl.deleteOne);

StatusRouter.post('/delete/:status' , EntryAuthor.setEntryAuthor , StatusController.setStatus , ctrl.delete);



StatusRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



StatusRouter.get('/delete/entries/all' , ctrl.deleteAll);

StatusRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);