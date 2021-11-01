import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { EmailMessageTypeController } from '../controller/EmailMessageTypeController';
import { EmailMessageTypeRouteConfig } from './config/EmailMessageTypeRouteConfig';

export const EmailMessageTypeRouter : Router = express.Router();

const ctrl : EmailMessageTypeController = ProxyController.create<EmailMessageTypeController>(new EmailMessageTypeController());

ctrl.init(EmailMessageTypeRouteConfig.getInstance());

EmailMessageTypeRouter.get('/' , ctrl.home);

EmailMessageTypeRouter.get('/entries' , ctrl.findAll);

EmailMessageTypeRouter.get('/detail/:emailmessagetype' , ctrl.findOne);



EmailMessageTypeRouter.get('/add', ctrl.addOne);

EmailMessageTypeRouter.post('/add' , EntryAuthor.setEntryAuthor , EmailMessageTypeController.setEmailMessageType , ValidationRegister.emailMessageType , ctrl.save);


EmailMessageTypeRouter.get('/update/:emailmessagetype' , ctrl.updateOne);

EmailMessageTypeRouter.post('/update/:emailmessagetype' , EntryAuthor.setEntryAuthor , EmailMessageTypeController.setEmailMessageType , ValidationRegister.emailMessageType , ctrl.update);


EmailMessageTypeRouter.get('/delete/:emailmessagetype' , ctrl.deleteOne);

EmailMessageTypeRouter.post('/delete/:emailmessagetype' , EntryAuthor.setEntryAuthor , EmailMessageTypeController.setEmailMessageType , ValidationRegister.emailMessageType , ctrl.delete);



EmailMessageTypeRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



EmailMessageTypeRouter.get('/delete/entries/all' , ctrl.deleteAll);

EmailMessageTypeRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);