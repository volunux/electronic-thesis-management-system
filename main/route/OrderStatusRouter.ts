import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { OrderStatusController } from '../controller/OrderStatusController';
import { OrderStatusRouteConfig } from './config/OrderStatusRouteConfig';

export const OrderStatusRouter : Router = express.Router();

const ctrl : OrderStatusController = ProxyController.create<OrderStatusController>(new OrderStatusController());

ctrl.init(OrderStatusRouteConfig.getInstance());

OrderStatusRouter.get('/' , ctrl.home);

OrderStatusRouter.get('/entries' , ctrl.findAll);

OrderStatusRouter.get('/detail/:orderstatus' , ctrl.findOne);



OrderStatusRouter.get('/add', ctrl.addOne);

OrderStatusRouter.post('/add' , EntryAuthor.setEntryAuthor , OrderStatusController.setOrderStatus , ValidationRegister.orderStatus , ctrl.save);


OrderStatusRouter.get('/update/:orderstatus' , ctrl.updateOne);

OrderStatusRouter.post('/update/:orderstatus' , EntryAuthor.setEntryAuthor , OrderStatusController.setOrderStatus , ValidationRegister.orderStatus , ctrl.update);


OrderStatusRouter.get('/delete/:orderstatus' , ctrl.deleteOne);

OrderStatusRouter.post('/delete/:orderstatus' , EntryAuthor.setEntryAuthor , OrderStatusController.setOrderStatus , ValidationRegister.orderStatus , ctrl.delete);



OrderStatusRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



OrderStatusRouter.get('/delete/entries/all' , ctrl.deleteAll);

OrderStatusRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);