import express , { Router } from 'express';
import { LocalImageUploader } from '../helper/file/uploader/LocalImageUploader';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { LocalFileValidator } from '../helper/file/validator/LocalFileValidator';
import { MulterFileValidator } from '../helper/file/validator/MulterFileValidator';
import { AdminController } from '../controller/AdminController';

const localImageUploader : LocalImageUploader = LocalImageUploader.getInstance();

export const AdminRouter : Router = express.Router();

const ctrl = new AdminController();

AdminRouter.get('/' , ctrl.dashboard);

AdminRouter.get('/dashboard' , ctrl.dashboard);

AdminRouter.get('/dashboard/entries' , ctrl.entries);

AdminRouter.get('/dashboard/others' , ctrl.others);

AdminRouter.get('/dashboard/others/change-display-picture/' , ctrl.updateOneDisplay);

AdminRouter.post('/dashboard/others/change-display-picture/' , localImageUploader.getUploader(200 , 1).single('display_picture') , EntryAuthor.setEntryAuthor , 

localImageUploader.checkFileUpload('image') , LocalFileValidator.getInstance().mimetype('image' , 'images') , localImageUploader.validate('image' , 'images') , 

localImageUploader.checkFileSize('image' , 200 , 'images') , ctrl.updateDisplay);