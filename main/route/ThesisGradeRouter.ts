import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { ThesisGradeController } from '../controller/ThesisGradeController';
import { ThesisGradeRouteConfig } from './config/ThesisGradeRouteConfig';

export const ThesisGradeRouter : Router = express.Router();

const ctrl : ThesisGradeController = ProxyController.create<ThesisGradeController>(new ThesisGradeController());

ctrl.init(ThesisGradeRouteConfig.getInstance());

ThesisGradeRouter.get('/' , ctrl.home);

ThesisGradeRouter.get('/entries' , ctrl.findAll);

ThesisGradeRouter.get('/detail/:thesisgrade' , ctrl.findOne);



ThesisGradeRouter.get('/add', ctrl.addOne);

ThesisGradeRouter.post('/add' , EntryAuthor.setEntryAuthor , ThesisGradeController.setThesisGrade , ValidationRegister.two , ctrl.save);


ThesisGradeRouter.get('/update/:thesisgrade' , ctrl.updateOne);

ThesisGradeRouter.post('/update/:thesisgrade' , EntryAuthor.setEntryAuthor , ThesisGradeController.setThesisGrade , ValidationRegister.two , ctrl.update);


ThesisGradeRouter.get('/delete/:thesisgrade' , ctrl.deleteOne);

ThesisGradeRouter.post('/delete/:thesisgrade' , EntryAuthor.setEntryAuthor , ThesisGradeController.setThesisGrade , ctrl.delete);



ThesisGradeRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



ThesisGradeRouter.get('/delete/entries/all' , ctrl.deleteAll);

ThesisGradeRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);