import { QueryResult , QueryResultRow } from 'pg';
import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Status } from '../../../entity/Status';
import { PublisherRepository } from '../PublisherRepository';
import { PublisherQuery } from '../../query/PublisherQuery';
import { Publisher } from '../../../entity/Publisher';

export class PublisherRepositoryImpl implements PublisherRepository {

	private queryTemplate : QueryTemplate<Publisher> = new SimpleQueryTemplate<Publisher>();

	public async findOne(slug : string) : Promise<Publisher | null> {

		let plan : DynamicQuery = PublisherQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , Publisher);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = PublisherQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Publisher[]> {

		let plan : DynamicQuery = PublisherQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , Publisher);
	} 

	public async addOne() : Promise<Publisher> {

		let publisher : Publisher = new Publisher({});

		await this.relatedEntities(publisher);

		return publisher;
	} 

	public async save(entry : Publisher) : Promise<Publisher | null> {

		let plan : DynamicQuery = PublisherQuery.save(<Publisher>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , Publisher);
	}

	public async updateOne(slug : string) : Promise<Publisher | null> {

		let plan : DynamicQuery = PublisherQuery.updateOne(slug);

		let publisher : Publisher | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , Publisher);

		await this.relatedEntities(<Publisher>publisher);

		return publisher;
	}

	public async update(slug : string , entry : Publisher) : Promise<Publisher | null> {

		let plan : DynamicQuery = PublisherQuery.update(slug , <Publisher>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , Publisher);
	}

	public async deleteOne(slug : string) : Promise<Publisher | null> {

		let plan : DynamicQuery = PublisherQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , Publisher);
	} 

	public async remove(slug : string) : Promise<Publisher | null> {

		let plan : DynamicQuery = PublisherQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , Publisher);
	} 

	public async deleteMany(entries : string) : Promise<Publisher[]> {

		let plan : DynamicQuery = PublisherQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , Publisher);
	}

	public async deleteAll() : Promise<Publisher[]> {

		let plan : DynamicQuery = PublisherQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , Publisher);
	}

	public async findAndDeleteAll() : Promise<Publisher[]> {

		let plan : DynamicQuery = PublisherQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , Publisher);
	}

	public async relatedEntities(entry : Publisher) : Promise<Publisher | null> {

		let plan : DynamicQuery = PublisherQuery.relatedEntities();

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
