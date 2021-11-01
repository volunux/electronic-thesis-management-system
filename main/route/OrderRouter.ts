import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { OrderController } from '../controller/OrderController';
import { OrderRouteConfig } from './config/OrderRouteConfig';

export const OrderRouter : Router = express.Router();

const ctrl : OrderController = ProxyController.create<OrderController>(new OrderController());

ctrl.init(OrderRouteConfig.getInstance());

OrderRouter.get('/' , ctrl.home);

OrderRouter.get('/entries' , ctrl.findAll);

OrderRouter.get('/detail/:order' , ctrl.findOne);



OrderRouter.get('/add', ctrl.addOne);

OrderRouter.post('/add' , EntryAuthor.setEntryAuthor , OrderController.setOrder , ValidationRegister.one , ctrl.save);


OrderRouter.get('/update/:order' , ctrl.updateOne);

OrderRouter.post('/update/:order' , EntryAuthor.setEntryAuthor , OrderController.setOrder , ValidationRegister.one , ctrl.update);


OrderRouter.get('/delete/:order' , ctrl.deleteOne);

OrderRouter.post('/delete/:order' , EntryAuthor.setEntryAuthor , OrderController.setOrder , ValidationRegister.one , ctrl.delete);



OrderRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



OrderRouter.get('/delete/entries/all' , ctrl.deleteAll);

OrderRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);