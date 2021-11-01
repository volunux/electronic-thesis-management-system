import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { ImageUploader } from '../helper/file/uploader/ImageUploader';
import { ImageValidator } from '../helper/file/validator/ImageValidator';
import { FileConfigurerList } from '../util/aws/s3/FileConfigurerList';
import { FileConfigurer } from '../util/aws/s3/FileConfigurer';
import { S3SignedUrlGenerator } from '../helper/file/S3SignedUrlGenerator';
import { LayoutConfigurer } from '../helper/view/LayoutConfigurer';
import { ProfileController } from '../controller/ProfileController';
import { UserRouteConfig } from './config/UserRouteConfig';

export const ProfileRouter : Router = express.Router();

const imageConfigurer : FileConfigurer = <FileConfigurer>FileConfigurerList.getFileConfigurer('image');

const imageUploader : ImageUploader = ImageUploader.getInstance(imageConfigurer.getS3Instance() , imageConfigurer.getConfiguration());

const s3SignedUrlGenerator : S3SignedUrlGenerator = S3SignedUrlGenerator.getInstance(imageConfigurer.getS3Instance() , imageConfigurer.getConfiguration());

const imageValidator : ImageValidator = ImageValidator.getInstance(imageConfigurer.getS3Instance() , imageConfigurer.getConfiguration());

const ctrl : ProfileController = ProxyController.create<ProfileController>(new ProfileController());

ctrl.init(UserRouteConfig.getInstance());

const profileBucketName : string = "thesis_user";

ProfileRouter.get('/' , ctrl.home);

ProfileRouter.get('/entries/' , ctrl.entries);

ProfileRouter.get('/detail/' , ctrl.findOne);


ProfileRouter.get('/update/' , ctrl.updateOne);

ProfileRouter.post('/update/' , EntryAuthor.setEntryAuthor , ProfileController.setUser , ValidationRegister.profileUpdate , ctrl.update);


ProfileRouter.get('/delete/profile-photo' , ctrl.deleteOneProfilePhoto);

ProfileRouter.post('/delete/profile-photo' , EntryAuthor.setEntryAuthor , ProfileController.setUser , ValidationRegister.profileUpdate , ctrl.deleteProfilePhoto);


ProfileRouter.get('/delete/signature' , ctrl.deleteOneSignature);

ProfileRouter.post('/delete/signature' , EntryAuthor.setEntryAuthor , ProfileController.setUser , ValidationRegister.profileUpdate , ctrl.deleteSignature);


ProfileRouter.get('/deactivate/' , ctrl.deactivateOne);

ProfileRouter.post('/deactivate/' , EntryAuthor.setEntryAuthor , ctrl.deactivate);


ProfileRouter.get('/reactivate/' , ctrl.reactivateOne);

ProfileRouter.post('/reactivate/' , EntryAuthor.setEntryAuthor , ctrl.reactivate);


ProfileRouter.get('/profile-photo/' , LayoutConfigurer.setLayout('profile') , ctrl.addProfilePhoto);

ProfileRouter.post('/profile-photo/' , imageUploader.getUploader(profileBucketName , 200 , 1).single('profile_photo') , EntryAuthor.setEntryAuthor , imageUploader.checkFileUpload('image') ,

		imageValidator.mimetype(profileBucketName , 'image') , imageUploader.validate(profileBucketName , 'image') , 

		imageUploader.checkFileSize(profileBucketName , 'image' , 200) , ProfileController.setUserProfilePhoto , ctrl.saveProfilePhoto);


ProfileRouter.get('/signature/' , LayoutConfigurer.setLayout('profile') , ctrl.addSignature);

ProfileRouter.post('/signature/' , imageUploader.getUploader(profileBucketName , 200 , 1).single('profile_signature') , EntryAuthor.setEntryAuthor ,

		imageUploader.checkFileUpload('image') , imageValidator.mimetype(profileBucketName , 'image') , imageUploader.validate(profileBucketName , 'image') ,

		imageUploader.checkFileSize(profileBucketName , 'image' , 200) , ProfileController.setUserSignature , ctrl.saveSignature);



ProfileRouter.post('/profile-photo/hash/:filename' , s3SignedUrlGenerator.typeOne(profileBucketName));

ProfileRouter.post('/signature/hash/:filename' , s3SignedUrlGenerator.typeOne(profileBucketName));


ProfileRouter.post('/profile-photo/save/' , ProfileController.setUserProfilePhotoII , ctrl.saveProfilePhotoII);

ProfileRouter.post('/signature/save/' , ProfileController.setUserProfilePhotoII , ctrl.saveSignatureII);



ProfileRouter.delete('/profile-photo/:objectkey' , ctrl.deleteProfilePhotoII);

ProfileRouter.delete('/signature/:objectkey' ,  ctrl.deleteProfilePhotoII);
