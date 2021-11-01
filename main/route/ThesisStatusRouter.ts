import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { ThesisStatusController } from '../controller/ThesisStatusController';
import { ThesisStatusRouteConfig } from './config/ThesisStatusRouteConfig';

export const ThesisStatusRouter : Router = express.Router();

const ctrl : ThesisStatusController = ProxyController.create<ThesisStatusController>(new ThesisStatusController());

ctrl.init(ThesisStatusRouteConfig.getInstance());

ThesisStatusRouter.get('/' , ctrl.home);

ThesisStatusRouter.get('/entries' , ctrl.findAll);

ThesisStatusRouter.get('/detail/:thesisstatus' , ctrl.findOne);



ThesisStatusRouter.get('/add', ctrl.addOne);

ThesisStatusRouter.post('/add' , EntryAuthor.setEntryAuthor , ThesisStatusController.setThesisStatus , ValidationRegister.status , ctrl.save);


ThesisStatusRouter.get('/update/:thesisstatus' , ctrl.updateOne);

ThesisStatusRouter.post('/update/:thesisstatus' , EntryAuthor.setEntryAuthor , ThesisStatusController.setThesisStatus , ValidationRegister.status , ctrl.update);


ThesisStatusRouter.get('/delete/:thesisstatus' , ctrl.deleteOne);

ThesisStatusRouter.post('/delete/:thesisstatus' , EntryAuthor.setEntryAuthor , ThesisStatusController.setThesisStatus , ctrl.delete);



ThesisStatusRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



ThesisStatusRouter.get('/delete/entries/all' , ctrl.deleteAll);

ThesisStatusRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);