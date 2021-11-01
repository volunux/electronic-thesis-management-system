import express , { Router } from 'express';
import { ValidationRegister } from '../../helper/validation/register';
import { LayoutConfigurer } from '../../helper/view/LayoutConfigurer';
import { ProxyController } from '../../util/proxy/ProxyController';
import { UserProfile } from '../../helper/middleware/UserProfile';
import { EntryAuthor } from '../../helper/entry/EntryAuthor';
import { DocumentUploader } from '../../helper/file/uploader/DocumentUploader';
import { ImageUploader } from '../../helper/file/uploader/ImageUploader';
import { ImageValidator } from '../../helper/file/validator/ImageValidator';
import { DocumentValidator } from '../../helper/file/validator/DocumentValidator';
import { MulterFileValidator } from '../../helper/file/validator/MulterFileValidator';
import { FileConfigurerList } from '../../util/aws/s3/FileConfigurerList';
import { FileConfigurer } from '../../util/aws/s3/FileConfigurer';
import { UserThesisController } from '../../controller/user/UserThesisController';
import { UserThesisRouteConfig } from '../config/UserThesisRouteConfig';

export const UserThesisRouter : Router = express.Router();

const ctrl : UserThesisController = ProxyController.create<UserThesisController>(new UserThesisController());

const documentConfigurer : FileConfigurer = <FileConfigurer>FileConfigurerList.getFileConfigurer('image');

const imageConfigurer : FileConfigurer = <FileConfigurer>FileConfigurerList.getFileConfigurer('image');

const documentUploader : DocumentUploader = DocumentUploader.getInstance(documentConfigurer.getS3Instance() , documentConfigurer.getConfiguration());

const imageUploader : ImageUploader = ImageUploader.getInstance(imageConfigurer.getS3Instance() , imageConfigurer.getConfiguration());

const imageValidator : ImageValidator = ImageValidator.getInstance(imageConfigurer.getS3Instance() , imageConfigurer.getConfiguration());

const documentValidator : DocumentValidator = DocumentValidator.getInstance(documentConfigurer.getS3Instance() , documentConfigurer.getConfiguration());

const thesisDocumentBucketName : string = "thesis_doc";

const thesisCoverImageBucketName : string = "thesis_cover_image";

ctrl.init(UserThesisRouteConfig.getInstance());

UserThesisRouter.get('/' , ctrl.home);

UserThesisRouter.get('/entries/' , ctrl.findAll);

UserThesisRouter.get('/detail/:thesis' , ctrl.findOne);



UserThesisRouter.get('/add' , LayoutConfigurer.setLayout('rich') , UserThesisController.showSubmissionView , ctrl.addOne);

UserThesisRouter.post('/add' , LayoutConfigurer.setLayout('rich') , UserThesisController.setThesis , ValidationRegister.userThesis , ctrl.save);


UserThesisRouter.get('/update/:thesis' , LayoutConfigurer.setLayout('rich') , ctrl.updateOne);

UserThesisRouter.post('/update/:thesis' , LayoutConfigurer.setLayout('rich') , UserThesisController.setThesis , ValidationRegister.userThesis , ctrl.update);


UserThesisRouter.get('/delete/:thesis' , ctrl.deleteOne);

UserThesisRouter.post('/delete/:thesis' , UserThesisController.setThesis , ValidationRegister.userThesis , ctrl.delete);


UserThesisRouter.get('/cover-image/update/:thesis' , ctrl.updateOneThesisCoverImage);

UserThesisRouter.post('/cover-image/update/:thesis' , imageUploader.getUploader(thesisCoverImageBucketName , 200 , 1).single('cover_image'), EntryAuthor.setEntryAuthor , imageUploader.checkFileUpload('image') , 
	
		imageValidator.mimetype(thesisCoverImageBucketName , 'image') , imageUploader.validate(thesisCoverImageBucketName , 'image') ,

		imageUploader.checkFileSize(thesisCoverImageBucketName , 'image' , 200) , UserThesisController.setThesisCoverImage , ctrl.updateThesisCoverImage);



UserThesisRouter.get('/document/update/:thesis' , ctrl.updateOneThesisDocument);

UserThesisRouter.post('/document/update/:thesis' , documentUploader.getUploader(thesisDocumentBucketName , 1024 , 1).single('thesis_document') , EntryAuthor.setEntryAuthor , 

		documentUploader.checkFileUpload('document') , documentValidator.mimetype(thesisDocumentBucketName , 'image') , documentUploader.validate(thesisDocumentBucketName , 'document') ,

		documentUploader.checkFileSize(thesisDocumentBucketName , 'document' , 1024) , UserThesisController.setThesisDocument ,

		ctrl.updateThesisDocument);