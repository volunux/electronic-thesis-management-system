import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { DepartmentRouteConfig } from './config/DepartmentRouteConfig';
import { DepartmentController } from '../controller/DepartmentController';

export const DepartmentRouter : Router = express.Router();

const ctrl : DepartmentController = ProxyController.create<DepartmentController>(new DepartmentController());

ctrl.init(DepartmentRouteConfig.getInstance());

DepartmentRouter.get('/' , ctrl.home);

DepartmentRouter.get('/entries' , ctrl.findAll);

DepartmentRouter.get('/detail/:department' , ctrl.findOne);



DepartmentRouter.get('/add', ctrl.addOne);

DepartmentRouter.post('/add' , EntryAuthor.setEntryAuthor , DepartmentController.setDepartment , ValidationRegister.department , ctrl.save);


DepartmentRouter.get('/update/:department' , ctrl.updateOne);

DepartmentRouter.post('/update/:department' , EntryAuthor.setEntryAuthor , DepartmentController.setDepartment , ValidationRegister.department , ctrl.update);


DepartmentRouter.get('/delete/:department' , ctrl.deleteOne);

DepartmentRouter.post('/delete/:department' , EntryAuthor.setEntryAuthor , DepartmentController.setDepartment , ctrl.delete);



DepartmentRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



DepartmentRouter.get('/delete/entries/all' , ctrl.deleteAll);

DepartmentRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);