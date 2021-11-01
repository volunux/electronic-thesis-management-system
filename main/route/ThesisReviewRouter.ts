import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { ThesisReviewController } from '../controller/ThesisReviewController';
import { ThesisReviewRouteConfig } from './config/ThesisReviewRouteConfig';

export const ThesisReviewRouter : Router = express.Router();

const ctrl : ThesisReviewController = ProxyController.create<ThesisReviewController>(new ThesisReviewController());

ctrl.init(ThesisReviewRouteConfig.getInstance());

ThesisReviewRouter.get('/' , ctrl.home);

ThesisReviewRouter.get('/entries' , ctrl.findAll);

ThesisReviewRouter.get('/detail/:thesisreview' , ctrl.findOne);


ThesisReviewRouter.get('/delete/:thesisreview' , ctrl.deleteOne);

ThesisReviewRouter.post('/delete/:thesisreview' , EntryAuthor.setEntryAuthor , ThesisReviewController.setThesisReview , ValidationRegister.three , ctrl.delete);



ThesisReviewRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



ThesisReviewRouter.get('/delete/entries/all' , ctrl.deleteAll);

ThesisReviewRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);