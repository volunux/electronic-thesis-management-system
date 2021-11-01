import { QueryResult , QueryResultRow } from 'pg';
import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { UserProfilePhotoQuery } from '../../query/UserProfilePhotoQuery';
import { UserProfilePhotoRepository } from '../UserProfilePhotoRepository';
import { UserProfilePhoto } from '../../../entity/UserProfilePhoto';

export class UserProfilePhotoRepositoryImpl implements UserProfilePhotoRepository {

	private queryTemplate : QueryTemplate<UserProfilePhoto> = new SimpleQueryTemplate<UserProfilePhoto>();

	public async findOne(slug : string) : Promise<UserProfilePhoto | null> {

		let plan : DynamicQuery = UserProfilePhotoQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , UserProfilePhoto);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = UserProfilePhotoQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<UserProfilePhoto[]> {

		let plan : DynamicQuery = UserProfilePhotoQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , UserProfilePhoto);
	} 

	public async addOne() : Promise<UserProfilePhoto> {

		return new UserProfilePhoto({});
	} 

	public async save(entry : UserProfilePhoto) : Promise<UserProfilePhoto | null> {

		return null;
	}

	public async updateOne(slug : string) : Promise<UserProfilePhoto | null> {

		return null;
	}

	public async update(slug : string , entry : UserProfilePhoto) : Promise<UserProfilePhoto | null> {

		return null;
	}

	public async deleteOne(slug : string) : Promise<UserProfilePhoto | null> {

		let plan : DynamicQuery = UserProfilePhotoQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , UserProfilePhoto);
	} 

	public async remove(slug : string) : Promise<UserProfilePhoto | null> {

		let plan : DynamicQuery = UserProfilePhotoQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , UserProfilePhoto);
	} 

	public async deleteMany(entries : string) : Promise<UserProfilePhoto[]> {

		let plan : DynamicQuery = UserProfilePhotoQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , UserProfilePhoto);
	}

	public async deleteAll() : Promise<UserProfilePhoto[]> {

		let plan : DynamicQuery = UserProfilePhotoQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , UserProfilePhoto);
	}

	public async findAndDeleteAll() : Promise<UserProfilePhoto[]> {

		let plan : DynamicQuery = UserProfilePhotoQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , UserProfilePhoto);
	}

	public async relatedEntities(entry : UserProfilePhoto) : Promise<UserProfilePhoto | null> {

		return null;
	} 

}
