import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { LayoutConfigurer } from '../helper/view/LayoutConfigurer';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { EmailMessageTemplateController } from '../controller/EmailMessageTemplateController';
import { EmailMessageTemplateRouteConfig } from './config/EmailMessageTemplateRouteConfig';

export const EmailMessageTemplateRouter : Router = express.Router();

const ctrl : EmailMessageTemplateController = ProxyController.create<EmailMessageTemplateController>(new EmailMessageTemplateController());

ctrl.init(EmailMessageTemplateRouteConfig.getInstance());

EmailMessageTemplateRouter.get('/' , ctrl.home);

EmailMessageTemplateRouter.get('/entries' , ctrl.findAll);

EmailMessageTemplateRouter.get('/detail/:emailmessagetemplate' , ctrl.findOne);



EmailMessageTemplateRouter.get('/add', LayoutConfigurer.setLayout('rich') , ctrl.addOne);

EmailMessageTemplateRouter.post('/add' , LayoutConfigurer.setLayout('rich') , EntryAuthor.setEntryAuthor , EmailMessageTemplateController.setEmailMessageTemplate , ValidationRegister.emailMessageTemplate , ctrl.save);


EmailMessageTemplateRouter.get('/update/:emailmessagetemplate' , LayoutConfigurer.setLayout('rich') , ctrl.updateOne);

EmailMessageTemplateRouter.post('/update/:emailmessagetemplate' , LayoutConfigurer.setLayout('rich') , EntryAuthor.setEntryAuthor , EmailMessageTemplateController.setEmailMessageTemplate , ValidationRegister.emailMessageTemplate , ctrl.update);


EmailMessageTemplateRouter.get('/delete/:emailmessagetemplate' , ctrl.deleteOne);

EmailMessageTemplateRouter.post('/delete/:emailmessagetemplate' , EntryAuthor.setEntryAuthor , EmailMessageTemplateController.setEmailMessageTemplate , ValidationRegister.emailMessageTemplate , ctrl.delete);



EmailMessageTemplateRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



EmailMessageTemplateRouter.get('/delete/entries/all' , ctrl.deleteAll);

EmailMessageTemplateRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);