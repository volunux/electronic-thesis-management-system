import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { CountryController } from '../controller/CountryController';
import { CountryRouteConfig } from './config/CountryRouteConfig';

export const SendMailRouter : Router = express.Router();

const ctrl : CountryController = ProxyController.create<CountryController>(new CountryController());

ctrl.init(CountryRouteConfig.getInstance());

SendMailRouter.get('/' , ctrl.home);

SendMailRouter.get('/entries' , ctrl.findAll);

SendMailRouter.get('/detail/:country' , ctrl.findOne);



SendMailRouter.get('/add', ctrl.addOne);

SendMailRouter.post('/add' , EntryAuthor.setEntryAuthor , CountryController.setCountry , ValidationRegister.one , ctrl.save);


SendMailRouter.get('/update/:country' , ctrl.updateOne);

SendMailRouter.post('/update/:country' , EntryAuthor.setEntryAuthor , CountryController.setCountry , ValidationRegister.one , ctrl.update);


SendMailRouter.get('/delete/:country' , ctrl.deleteOne);

SendMailRouter.post('/delete/:country' , EntryAuthor.setEntryAuthor , CountryController.setCountry , ValidationRegister.one , ctrl.delete);



SendMailRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



SendMailRouter.get('/delete/entries/all' , ctrl.deleteAll);

SendMailRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);