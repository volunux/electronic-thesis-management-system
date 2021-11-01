import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ThesisCoverImageController } from '../controller/ThesisCoverImageController';
import { ThesisCoverImageRouteConfig } from './config/ThesisCoverImageRouteConfig';

export const ThesisCoverImageRouter : Router = express.Router();

const ctrl = new ThesisCoverImageController();

ThesisCoverImageRouter.get('/' , ctrl.home);

ThesisCoverImageRouter.get('/entries' , ctrl.findAll);

ThesisCoverImageRouter.get('/detail/:thesisCoverImage' , ctrl.findOne);



ThesisCoverImageRouter.get('/add', ctrl.addOne);

ThesisCoverImageRouter.post('/add' , EntryAuthor.setEntryAuthor , ValidationRegister.four , ctrl.save);


ThesisCoverImageRouter.get('/update/:thesisCoverImage' , ctrl.updateOne);

ThesisCoverImageRouter.post('/update/:thesisCoverImage' , EntryAuthor.setEntryAuthor , ValidationRegister.four , ctrl.update);


ThesisCoverImageRouter.get('/delete/:thesisCoverImage' , ctrl.deleteOne);

ThesisCoverImageRouter.post('/delete/:thesisCoverImage' , EntryAuthor.setEntryAuthor , ValidationRegister.four , ctrl.delete);



ThesisCoverImageRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



ThesisCoverImageRouter.get('/delete/entries/all' , ctrl.deleteAll);

ThesisCoverImageRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);