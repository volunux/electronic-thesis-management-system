import express , { Router , Request } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { LayoutConfigurer } from '../helper/view/LayoutConfigurer';
import { ProxyController } from '../util/proxy/ProxyController';
import { DocumentUploader } from '../helper/file/uploader/DocumentUploader';
import { ImageUploader } from '../helper/file/uploader/ImageUploader';
import { ImageValidator } from '../helper/file/validator/ImageValidator';
import { DocumentValidator } from '../helper/file/validator/DocumentValidator';
import { FileConfigurerList } from '../util/aws/s3/FileConfigurerList';
import { FileConfigurer } from '../util/aws/s3/FileConfigurer';
import { MulterFileValidator } from '../helper/file/validator/MulterFileValidator';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ThesisRouteConfig } from './config/ThesisRouteConfig';
import { ThesisController } from '../controller/ThesisController';

export const ThesisRouter : Router = express.Router();

const ctrl : ThesisController = ProxyController.create<ThesisController>(new ThesisController());

ctrl.init(ThesisRouteConfig.getInstance());

const documentConfigurer : FileConfigurer = <FileConfigurer>FileConfigurerList.getFileConfigurer('image');

const imageConfigurer : FileConfigurer = <FileConfigurer>FileConfigurerList.getFileConfigurer('image');

const documentUploader : DocumentUploader = DocumentUploader.getInstance(documentConfigurer.getS3Instance() , documentConfigurer.getConfiguration());

const imageUploader : ImageUploader = ImageUploader.getInstance(imageConfigurer.getS3Instance() , imageConfigurer.getConfiguration());

const imageValidator : ImageValidator = ImageValidator.getInstance(imageConfigurer.getS3Instance() , imageConfigurer.getConfiguration());

const documentValidator : DocumentValidator = DocumentValidator.getInstance(documentConfigurer.getS3Instance() , documentConfigurer.getConfiguration());

const thesisDocumentBucketName : string = "photos_bucket";

const thesisCoverImageBucketName : string = "thesis_cover_image";

ctrl.init(ThesisRouteConfig.getInstance());

ThesisRouter.get('/' , ctrl.home);

ThesisRouter.get('/entries' , ctrl.findAll);

ThesisRouter.get('/entries/submission' , ctrl.findAll);

ThesisRouter.get('/detail/:thesis' , ctrl.findOne);

ThesisRouter.post('/detail/:thesis' , ctrl.updateStatus);



ThesisRouter.get('/add', LayoutConfigurer.setLayout('rich') , ctrl.addOne);

ThesisRouter.post('/add' , LayoutConfigurer.setLayout('rich') , EntryAuthor.setEntryAuthor , ThesisController.setThesis , ValidationRegister.thesis , ctrl.save);


ThesisRouter.get('/document/update/:thesis' , ctrl.updateOneThesisDocument);

ThesisRouter.post('/document/update/:thesis' , documentUploader.getUploader(thesisDocumentBucketName , 1024 , 1).single('thesis_document') , EntryAuthor.setEntryAuthor , 

		documentUploader.checkFileUpload('document') , documentValidator.mimetype(thesisDocumentBucketName , 'document') , documentUploader.validate(thesisDocumentBucketName , 'document') ,

		documentUploader.checkFileSize(thesisDocumentBucketName , 'document' , 1024) , ThesisController.setThesisDocument ,

		ctrl.updateThesisDocument);


ThesisRouter.get('/update/:thesis' , LayoutConfigurer.setLayout('rich') , ctrl.updateOne);

ThesisRouter.post('/update/:thesis' , LayoutConfigurer.setLayout('rich') , EntryAuthor.setEntryAuthor , ThesisController.setThesis , ValidationRegister.thesis , ctrl.update);


ThesisRouter.get('/cover-image/update/:thesis' , ctrl.updateOneThesisCoverImage);

ThesisRouter.post('/cover-image/update/:thesis' , imageUploader.getUploader(thesisCoverImageBucketName , 200 , 1).single('cover_image'), EntryAuthor.setEntryAuthor , imageUploader.checkFileUpload('image') , 
	
		imageValidator.mimetype(thesisCoverImageBucketName , 'image') , imageUploader.validate(thesisCoverImageBucketName , 'image') ,

		imageUploader.checkFileSize(thesisCoverImageBucketName , 'image' , 200) , ThesisController.setThesisCoverImage , ctrl.updateThesisCoverImage);


ThesisRouter.get('/delete/:thesis' , ctrl.deleteOne);

ThesisRouter.post('/delete/:thesis' , EntryAuthor.setEntryAuthor , ThesisController.setThesis , ValidationRegister.thesis , ctrl.delete);



ThesisRouter.post('/delete/entries/many' , EntryAuthor.setEntryAuthor , ctrl.deleteMany);



ThesisRouter.get('/delete/entries/all' , ctrl.deleteAll);

ThesisRouter.post('/delete/entries/all' , EntryAuthor.setEntryAuthor , ctrl.findAndDeleteAll);