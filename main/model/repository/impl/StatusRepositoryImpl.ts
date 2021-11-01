import { QueryResult , QueryResultRow } from 'pg';
import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Status } from '../../../entity/Status';
import { StatusRepository } from '../StatusRepository';
import { StatusQuery } from '../../query/StatusQuery';

export class StatusRepositoryImpl implements StatusRepository {

	private queryTemplate : QueryTemplate<Status> = new SimpleQueryTemplate<Status>();

	public async findOne(slug : string) : Promise<Status | null> {

		let plan : DynamicQuery = StatusQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , Status);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = StatusQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Status[]> {

		let plan : DynamicQuery = StatusQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , Status);
	} 

	public async addOne() : Promise<Status> {

		let status : Status = new Status({});

		await this.relatedEntities(status);

		return status;
	} 

	public async save(entry : Status) : Promise<Status | null> {

		let plan : DynamicQuery = StatusQuery.save(<Status>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , Status);
	}

	public async updateOne(slug : string) : Promise<Status | null> {

		let plan : DynamicQuery = StatusQuery.updateOne(slug);

		let status : Status | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , Status);

		await this.relatedEntities(<Status>status);

		return status;
	}

	public async update(slug : string , entry : Status) : Promise<Status | null> {

		let plan : DynamicQuery = StatusQuery.update(slug , <Status>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , Status);
	}

	public async deleteOne(slug : string) : Promise<Status | null> {

		let plan : DynamicQuery = StatusQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , Status);
	} 

	public async remove(slug : string) : Promise<Status | null> {

		let plan : DynamicQuery = StatusQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , Status);
	} 

	public async deleteMany(entries : string) : Promise<Status[]> {

		let plan : DynamicQuery = StatusQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , Status);
	}

	public async deleteAll() : Promise<Status[]> {

		let plan : DynamicQuery = StatusQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , Status);
	}

	public async findAndDeleteAll() : Promise<Status[]> {

		let plan : DynamicQuery = StatusQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , Status);
	}

	public async relatedEntities(entry : Status) : Promise<Status | null> {

		return entry;
	} 


}
