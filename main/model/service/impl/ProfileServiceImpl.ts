import { UserProfilePhoto } from '../../../entity/UserProfilePhoto';
import { UserSignature } from '../../../entity/UserSignature';
import { ProfileRepository } from '../../repository/ProfileRepository';
import { ProfileRepositoryImpl } from '../../repository/impl/ProfileRepositoryImpl';
import { ProfileService } from '../ProfileService';
import { User } from '../../../entity/User';

export class ProfileServiceImpl implements ProfileService {

	private repository : ProfileRepository = new ProfileRepositoryImpl();

	public async findOne(userId : number) : Promise<User | null> {

		return this.repository.findOne(userId);
	} 

	public async existsOne(userId : number) : Promise<boolean> {

		return this.repository.existsOne(userId);
	} 

	public async existsUserProfilePhoto(userId : number) : Promise<UserProfilePhoto | null> {

		return this.repository.existsUserProfilePhoto(userId);
	} 

	public async existsUserSignature(userId : number) : Promise<UserSignature | null> {

		return this.repository.existsUserSignature(userId);
	} 

	public async saveUserProfilePhoto(userId : number , entry : UserProfilePhoto) : Promise<UserProfilePhoto | null> {

		return this.repository.saveUserProfilePhoto(userId , entry);
	}

	public async saveUserSignature(userId : number , entry : UserSignature) : Promise<UserSignature | null> {

		return this.repository.saveUserSignature(userId , entry);
	}

	public async updateOne(userId : number) : Promise<User | null> {

		return this.repository.updateOne(userId);
	} 

	public async relatedEntities(entry : User) : Promise<User | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(userId : number , entry : User) : Promise<User | null> {

		return this.repository.update(userId , entry);
	}

	public async deleteProfilePhoto(userId : number) : Promise<UserProfilePhoto | null> {

		return this.repository.deleteProfilePhoto(userId);
	} 

	public async deleteProfilePhotoByKey(key : string) : Promise<UserProfilePhoto | null> {

		return this.repository.deleteProfilePhotoByKey(key);
	} 

	public async deleteSignatureByKey(key : string) : Promise<UserSignature | null> {

		return this.repository.deleteSignatureByKey(key);
	} 

	public async deleteSignature(userId : number) : Promise<UserSignature | null> {

		return this.repository.deleteSignature(userId);
	} 

	public async deactivateOne(userId : number) : Promise<User | null> {

		return this.repository.deactivateOne(userId);
	} 

	public async deactivate(userId : number) : Promise<User | null> {

		return this.repository.deactivate(userId);
	} 

	public async reactivateOne(userId : number) : Promise<User | null> {

		return this.repository.reactivateOne(userId);
	} 

	public async reactivate(userId : number) : Promise<User | null> {

		return this.repository.reactivate(userId);
	} 

}