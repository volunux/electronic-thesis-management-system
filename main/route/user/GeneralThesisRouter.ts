import express , { Router } from 'express';
import { ProxyController } from '../../util/proxy/ProxyController';
import { GeneralThesisController } from '../../controller/user/GeneralThesisController';
import { GeneralThesisRouteConfig } from '../config/GeneralThesisRouteConfig';

export const GeneralThesisRouter : Router = express.Router();

const ctrl : GeneralThesisController = ProxyController.create<GeneralThesisController>(new GeneralThesisController());

ctrl.init(GeneralThesisRouteConfig.getInstance());

GeneralThesisRouter.get('/' , ctrl.findAll);

GeneralThesisRouter.get('/thesis/' , ctrl.findAll);

GeneralThesisRouter.get('/thesis/detail/:thesis/' , ctrl.findOne);