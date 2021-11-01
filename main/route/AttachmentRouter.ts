import express , { Router } from 'express';
import { ProxyController } from '../util/proxy/ProxyController';
import { AttachmentController } from '../controller/AttachmentController';

export const AttachmentRouter : Router = express.Router();

const ctrl : AttachmentController = ProxyController.create<AttachmentController>(new AttachmentController());

AttachmentRouter.get('/signature' , ctrl.generateUploadHash);

AttachmentRouter.post('/save' , AttachmentController.setAttachment , ctrl.save);