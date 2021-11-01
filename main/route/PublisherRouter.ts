import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { PublisherRouteConfig } from './config/PublisherRouteConfig';
import { PublisherController } from '../controller/PublisherController';

export const PublisherRouter : Router = express.Router();

const ctrl : PublisherController = ProxyController.create<PublisherController>(new PublisherController());

ctrl.init(PublisherRouteConfig.getInstance());

PublisherRouter.get('/' , ctrl.home);

PublisherRouter.get('/entries' , ctrl.findAll);

PublisherRouter.get('/detail/:publisher' , ctrl.findOne);



PublisherRouter.get('/add', ctrl.addOne);

PublisherRouter.post('/add' , EntryAuthor.setEntryAuthor , PublisherController.setPublisher , ValidationRegister.publisher , ctrl.save);


PublisherRouter.get('/update/:publisher' , ctrl.updateOne);

PublisherRouter.post('/update/:publisher' , EntryAuthor.setEntryAuthor , PublisherController.setPublisher , ValidationRegister.publisher , ctrl.update);


PublisherRouter.get('/delete/:publisher' , ctrl.deleteOne);

PublisherRouter.post('/delete/:publisher' , EntryAuthor.setEntryAuthor , PublisherController.setPublisher , ctrl.delete);



PublisherRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



PublisherRouter.get('/delete/entries/all' , ctrl.deleteAll);

PublisherRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);