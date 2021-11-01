import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { ThesisReplyController } from '../controller/ThesisReplyController';
import { ThesisReplyRouteConfig } from './config/ThesisReplyRouteConfig';

export const ThesisReplyRouter : Router = express.Router();

const ctrl : ThesisReplyController = ProxyController.create<ThesisReplyController>(new ThesisReplyController());

ctrl.init(ThesisReplyRouteConfig.getInstance());

ThesisReplyRouter.get('/' , ctrl.home);

ThesisReplyRouter.get('/entries' , ctrl.findAll);

ThesisReplyRouter.get('/detail/:thesisreply' , ctrl.findOne);


ThesisReplyRouter.get('/delete/:thesisreply' , ctrl.deleteOne);

ThesisReplyRouter.post('/delete/:thesisreply' , EntryAuthor.setEntryAuthor , ThesisReplyController.setThesisReply , ValidationRegister.three , ctrl.delete);



ThesisReplyRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



ThesisReplyRouter.get('/delete/entries/all' , ctrl.deleteAll);

ThesisReplyRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);