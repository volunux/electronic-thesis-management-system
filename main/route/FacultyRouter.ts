import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { FacultyController } from '../controller/FacultyController';
import { FacultyRouteConfig } from './config/FacultyRouteConfig';

export const FacultyRouter : Router = express.Router();

const ctrl : FacultyController = ProxyController.create<FacultyController>(new FacultyController());

ctrl.init(FacultyRouteConfig.getInstance());

FacultyRouter.get('/' , ctrl.home);

FacultyRouter.get('/entries' , ctrl.findAll);

FacultyRouter.get('/detail/:faculty' , ctrl.findOne);



FacultyRouter.get('/add', ctrl.addOne);

FacultyRouter.post('/add' , EntryAuthor.setEntryAuthor , FacultyController.setFaculty , ValidationRegister.one , ctrl.save);


FacultyRouter.get('/update/:faculty' , ctrl.updateOne);

FacultyRouter.post('/update/:faculty' , EntryAuthor.setEntryAuthor , FacultyController.setFaculty , ValidationRegister.one , ctrl.update);


FacultyRouter.get('/delete/:faculty' , ctrl.deleteOne);

FacultyRouter.post('/delete/:faculty' , EntryAuthor.setEntryAuthor , FacultyController.setFaculty , ctrl.delete);



FacultyRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



FacultyRouter.get('/delete/entries/all' , ctrl.deleteAll);

FacultyRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);