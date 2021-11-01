import { QueryResult , QueryResultRow } from 'pg';
import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { UserStatusRepository } from '../UserStatusRepository';
import { UserStatusQuery } from '../../query/UserStatusQuery';
import { UserStatus } from '../../../entity/UserStatus';

export class UserStatusRepositoryImpl implements UserStatusRepository {

	private queryTemplate : QueryTemplate<UserStatus> = new SimpleQueryTemplate<UserStatus>();

	public async findOne(slug : string) : Promise<UserStatus | null> {

		let plan : DynamicQuery = UserStatusQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , UserStatus);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = UserStatusQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<UserStatus[]> {

		let plan : DynamicQuery = UserStatusQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , UserStatus);
	} 

	public async addOne() : Promise<UserStatus> {

		let userStatus : UserStatus = new UserStatus({});

		await this.relatedEntities(userStatus);

		return userStatus;
	} 

	public async save(entry : UserStatus) : Promise<UserStatus | null> {

		let plan : DynamicQuery = UserStatusQuery.save(<UserStatus>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , UserStatus);
	}

	public async updateOne(slug : string) : Promise<UserStatus | null> {

		let plan : DynamicQuery = UserStatusQuery.updateOne(slug);

		let userStatus : UserStatus | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , UserStatus);

		await this.relatedEntities(<UserStatus>userStatus);

		return userStatus;
	}

	public async update(slug : string , entry : UserStatus) : Promise<UserStatus | null> {

		let plan : DynamicQuery = UserStatusQuery.update(slug , <UserStatus>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , UserStatus);
	}

	public async deleteOne(slug : string) : Promise<UserStatus | null> {

		let plan : DynamicQuery = UserStatusQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , UserStatus);
	} 

	public async remove(slug : string) : Promise<UserStatus | null> {

		let plan : DynamicQuery = UserStatusQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , UserStatus);
	} 

	public async deleteMany(entries : string) : Promise<UserStatus[]> {

		let plan : DynamicQuery = UserStatusQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , UserStatus);
	}

	public async deleteAll() : Promise<UserStatus[]> {

		let plan : DynamicQuery = UserStatusQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , UserStatus);
	}

	public async findAndDeleteAll() : Promise<UserStatus[]> {

		let plan : DynamicQuery = UserStatusQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , UserStatus);
	}

	public async relatedEntities(entry : UserStatus) : Promise<UserStatus | null> {

		return entry;
	} 


}
