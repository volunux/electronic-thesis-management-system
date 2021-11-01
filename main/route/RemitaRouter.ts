import express , { Router } from 'express';
import { RemitaController } from '../controller/RemitaController';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { UserRouteConfig } from './config/UserRouteConfig';
import { ProxyController } from '../util/proxy/ProxyController';

export const RemitaRouter : Router = express.Router();

const ctrl : RemitaController = ProxyController.create<RemitaController>(new RemitaController());

ctrl.init(UserRouteConfig.getInstance());

RemitaRouter.get('/' , ctrl.home);


RemitaRouter.get('/initialize', ctrl.initialize);

RemitaRouter.post('/initialize' , RemitaController.setTransaction , ctrl.confirmInitialization);
