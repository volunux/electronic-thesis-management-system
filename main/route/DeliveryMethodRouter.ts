import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { DeliveryMethodRouteConfig } from './config/DeliveryMethodRouteConfig';
import { DeliveryMethodController } from '../controller/DeliveryMethodController';

export const DeliveryMethodRouter : Router = express.Router();

const ctrl : DeliveryMethodController = ProxyController.create<DeliveryMethodController>(new DeliveryMethodController());

ctrl.init(DeliveryMethodRouteConfig.getInstance());

DeliveryMethodRouter.get('/' , ctrl.home);

DeliveryMethodRouter.get('/entries' , ctrl.findAll);

DeliveryMethodRouter.get('/detail/:deliverymethod' , ctrl.findOne);



DeliveryMethodRouter.get('/add', ctrl.addOne);

DeliveryMethodRouter.post('/add' , EntryAuthor.setEntryAuthor , DeliveryMethodController.setDeliveryMethod , ValidationRegister.five , ctrl.save);


DeliveryMethodRouter.get('/update/:deliverymethod' , ctrl.updateOne);

DeliveryMethodRouter.post('/update/:deliverymethod' , EntryAuthor.setEntryAuthor , DeliveryMethodController.setDeliveryMethod , ValidationRegister.five , ctrl.update);


DeliveryMethodRouter.get('/delete/:deliverymethod' , ctrl.deleteOne);

DeliveryMethodRouter.post('/delete/:deliverymethod' , EntryAuthor.setEntryAuthor , DeliveryMethodController.setDeliveryMethod , ValidationRegister.five , ctrl.delete);



DeliveryMethodRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



DeliveryMethodRouter.get('/delete/entries/all' , ctrl.deleteAll);

DeliveryMethodRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);