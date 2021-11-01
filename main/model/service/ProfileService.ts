import { UserProfilePhoto } from '../../entity/UserProfilePhoto';
import { UserSignature } from '../../entity/UserSignature';
import { User } from '../../entity/User';

export interface ProfileService {

	findOne(id : number) : Promise<User | null>; 

	existsOne(userId : number) : Promise<boolean>; 

	existsUserProfilePhoto(userId : number) : Promise<UserProfilePhoto | null>; 

	existsUserSignature(userId : number) : Promise<UserSignature | null>; 

	saveUserProfilePhoto(userId : number , entry : UserProfilePhoto) : Promise<UserProfilePhoto | null>;

	saveUserSignature(userId : number , entry : UserSignature) : Promise<UserSignature | null>;

	updateOne(userId : number) : Promise<User | null>; 

	relatedEntities(entry : User) : Promise<User | null>; 

	update(userId : number , entry : User) : Promise<User | null>;

	deleteProfilePhoto(userId : number) : Promise<UserProfilePhoto | null>; 

	deleteProfilePhotoByKey(key : string) : Promise<UserProfilePhoto | null>; 

	deleteSignatureByKey(key : string) : Promise<UserSignature | null>; 

	deleteSignature(userId : number) : Promise<UserSignature | null>; 

	deactivateOne(userId : number) : Promise<User | null>; 

	deactivate(userId : number) : Promise<User | null>; 

	reactivateOne(userId : number) : Promise<User | null>; 

	reactivate(userId : number) : Promise<User | null>; 

}