import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { PaymentMethodRouteConfig } from './config/PaymentMethodRouteConfig';
import { PaymentMethodController } from '../controller/PaymentMethodController';

export const PaymentMethodRouter : Router = express.Router();

const ctrl : PaymentMethodController = ProxyController.create<PaymentMethodController>(new PaymentMethodController());

ctrl.init(PaymentMethodRouteConfig.getInstance());

PaymentMethodRouter.get('/' , ctrl.home);

PaymentMethodRouter.get('/entries' , ctrl.findAll);

PaymentMethodRouter.get('/detail/:paymentmethod' , ctrl.findOne);



PaymentMethodRouter.get('/add', ctrl.addOne);

PaymentMethodRouter.post('/add' , EntryAuthor.setEntryAuthor , PaymentMethodController.setPaymentMethod , ValidationRegister.five , ctrl.save);


PaymentMethodRouter.get('/update/:paymentmethod' , ctrl.updateOne);

PaymentMethodRouter.post('/update/:paymentmethod' , EntryAuthor.setEntryAuthor , PaymentMethodController.setPaymentMethod , ValidationRegister.five , ctrl.update);


PaymentMethodRouter.get('/delete/:paymentmethod' , ctrl.deleteOne);

PaymentMethodRouter.post('/delete/:paymentmethod' , EntryAuthor.setEntryAuthor , PaymentMethodController.setPaymentMethod , ValidationRegister.five , ctrl.delete);



PaymentMethodRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



PaymentMethodRouter.get('/delete/entries/all' , ctrl.deleteAll);

PaymentMethodRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);