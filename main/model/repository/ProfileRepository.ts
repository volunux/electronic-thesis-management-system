import { QueryResult } from 'pg';
import { User } from '../../entity/User';
import { UserSignature } from '../../entity/UserSignature';
import { UserProfilePhoto } from '../../entity/UserProfilePhoto';

export interface ProfileRepository {

	findOne(id : number) : Promise<User | null>;
	update(id : number , entry : User) : Promise<User | null>;
	saveUserProfilePhoto(id : number , entry : UserProfilePhoto) : Promise<UserProfilePhoto | null>;
	saveUserSignature(id : number , entry : UserSignature) : Promise<UserSignature | null>;
	updateOne(id : number) : Promise<User | null>;
	existsOne(id : number) : Promise<boolean>;
	relatedEntities(entry : User) : Promise<User | null>;
	deactivateOne(id : number) : Promise<User | null>;
	deactivate(id : number) : Promise<User | null>;
	reactivateOne(id : number) : Promise<User | null>;
	reactivate(id : number) : Promise<User | null>;
	existsUserProfilePhoto(id : number) : Promise<UserProfilePhoto | null>;
	existsUserSignature(id : number) : Promise<UserSignature | null>;
	deleteProfilePhoto(id : number) : Promise<UserProfilePhoto | null>;
	deleteSignature(id : number) : Promise<UserSignature | null>;
	deleteProfilePhotoByKey(objectKey : string) : Promise<UserProfilePhoto | null>;
	deleteSignatureByKey(objectKey : string) : Promise<UserSignature | null>;

} 