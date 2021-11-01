import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { CountryController } from '../controller/CountryController';
import { CountryRouteConfig } from './config/CountryRouteConfig';

export const CountryRouter : Router = express.Router();

const ctrl : CountryController = ProxyController.create<CountryController>(new CountryController());

ctrl.init(CountryRouteConfig.getInstance());

CountryRouter.get('/' , ctrl.home);

CountryRouter.get('/entries' , ctrl.findAll);

CountryRouter.get('/detail/:country' , ctrl.findOne);



CountryRouter.get('/add', ctrl.addOne);

CountryRouter.post('/add' , EntryAuthor.setEntryAuthor , CountryController.setCountry , ValidationRegister.one , ctrl.save);


CountryRouter.get('/update/:country' , ctrl.updateOne);

CountryRouter.post('/update/:country' , EntryAuthor.setEntryAuthor , CountryController.setCountry , ValidationRegister.one , ctrl.update);


CountryRouter.get('/delete/:country' , ctrl.deleteOne);

CountryRouter.post('/delete/:country' , EntryAuthor.setEntryAuthor , CountryController.setCountry , ctrl.delete);



CountryRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



CountryRouter.get('/delete/entries/all' , ctrl.deleteAll);

CountryRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);