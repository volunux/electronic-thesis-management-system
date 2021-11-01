import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { LevelController } from '../controller/LevelController';
import { LevelRouteConfig } from './config/LevelRouteConfig';

export const LevelRouter : Router = express.Router();

const ctrl : LevelController = ProxyController.create<LevelController>(new LevelController());

ctrl.init(LevelRouteConfig.getInstance());

LevelRouter.get('/' , ctrl.home);

LevelRouter.get('/entries' , ctrl.findAll);

LevelRouter.get('/detail/:level' , ctrl.findOne);



LevelRouter.get('/add', ctrl.addOne);

LevelRouter.post('/add' , EntryAuthor.setEntryAuthor , LevelController.setLevel , ValidationRegister.one , ctrl.save);


LevelRouter.get('/update/:level' , ctrl.updateOne);

LevelRouter.post('/update/:level' , EntryAuthor.setEntryAuthor , LevelController.setLevel , ValidationRegister.one , ctrl.update);


LevelRouter.get('/delete/:level' , ctrl.deleteOne);

LevelRouter.post('/delete/:level' , EntryAuthor.setEntryAuthor , LevelController.setLevel , ctrl.delete);



LevelRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



LevelRouter.get('/delete/entries/all' , ctrl.deleteAll);

LevelRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);