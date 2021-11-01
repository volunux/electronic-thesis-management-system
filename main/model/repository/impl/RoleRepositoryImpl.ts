import { QueryResult , QueryResultRow } from 'pg';
import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Status } from '../../../entity/Status';
import { RoleRepository } from '../RoleRepository';
import { RoleQuery } from '../../query/RoleQuery';
import { Role } from '../../../entity/Role';

export class RoleRepositoryImpl implements RoleRepository {

	private queryTemplate : QueryTemplate<Role> = new SimpleQueryTemplate<Role>();

	public async findOne(slug : string) : Promise<Role | null> {

		let plan : DynamicQuery = RoleQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , Role);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = RoleQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Role[]> {

		let plan : DynamicQuery = RoleQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , Role);
	} 

	public async addOne() : Promise<Role> {

		let role : Role = new Role({});

		await this.relatedEntities(role);

		return role;
	} 

	public async save(entry : Role) : Promise<Role | null> {

		let plan : DynamicQuery = RoleQuery.save(<Role>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , Role);
	}

	public async updateOne(slug : string) : Promise<Role | null> {

		let plan : DynamicQuery = RoleQuery.updateOne(slug);

		let role : Role | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , Role);

		await this.relatedEntities(<Role>role);

		return role;
	}

	public async update(slug : string , entry : Role) : Promise<Role | null> {

		let plan : DynamicQuery = RoleQuery.update(slug , <Role>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , Role);
	}

	public async deleteOne(slug : string) : Promise<Role | null> {

		let plan : DynamicQuery = RoleQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , Role);
	} 

	public async remove(slug : string) : Promise<Role | null> {

		let plan : DynamicQuery = RoleQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , Role);
	} 

	public async deleteMany(entries : string) : Promise<Role[]> {

		let plan : DynamicQuery = RoleQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , Role);
	}

	public async deleteAll() : Promise<Role[]> {

		let plan : DynamicQuery = RoleQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , Role);
	}

	public async findAndDeleteAll() : Promise<Role[]> {

		let plan : DynamicQuery = RoleQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , Role);
	}

	public async relatedEntities(entry : Role) : Promise<Role | null> {

		let plan : DynamicQuery = RoleQuery.relatedEntities();

		let statuses : Status[] = [];

		let result : Object | null = await this.queryTemplate.relatedEntities(plan.getText() , plan.getValues());

		if (result !== null && entry !== null) {

			let listResult : Object[] = (<any>result).Status;

			statuses = ServiceHelper.rowsToObjectMapper<Status>(listResult , Status);

			entry.setStatuses(statuses);
		}

		return entry;
	} 


}
