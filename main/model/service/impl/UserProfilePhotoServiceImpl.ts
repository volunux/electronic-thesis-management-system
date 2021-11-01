import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { UserProfilePhotoRepository } from '../../repository/UserProfilePhotoRepository';
import { UserProfilePhotoRepositoryImpl } from '../../repository/impl/UserProfilePhotoRepositoryImpl';
import { UserProfilePhotoService } from '../UserProfilePhotoService';
import { UserProfilePhoto } from '../../../entity/UserProfilePhoto';

export class UserProfilePhotoServiceImpl implements UserProfilePhotoService {

	private repository : UserProfilePhotoRepository = new UserProfilePhotoRepositoryImpl();

	public async findOne(slug : string) : Promise<UserProfilePhoto | null> {

		return this.repository.findOne(slug);
	} 

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<UserProfilePhoto[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<UserProfilePhoto> {

		return this.repository.addOne();
	} 

	public async save(entry : UserProfilePhoto) : Promise<UserProfilePhoto | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<UserProfilePhoto | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : UserProfilePhoto) : Promise<UserProfilePhoto | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : UserProfilePhoto) : Promise<UserProfilePhoto | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<UserProfilePhoto | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<UserProfilePhoto | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<UserProfilePhoto[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<UserProfilePhoto[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<UserProfilePhoto[]> {

		return this.repository.findAndDeleteAll();
	}

}
