import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Status } from '../../../entity/Status';
import { LevelRepository } from '../LevelRepository';
import { LevelQuery } from '../../query/LevelQuery';
import { Level } from '../../../entity/Level';

export class LevelRepositoryImpl implements LevelRepository {

	private queryTemplate : QueryTemplate<Level> = new SimpleQueryTemplate<Level>();

	public async findOne(slug : string) : Promise<Level | null> {

		let plan : DynamicQuery = LevelQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , Level);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = LevelQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Level[]> {

		let plan : DynamicQuery = LevelQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , Level);
	} 

	public async addOne() : Promise<Level> {

		let level : Level = new Level({});

		await this.relatedEntities(level);

		return level;
	} 

	public async save(entry : Level) : Promise<Level | null> {

		let plan : DynamicQuery = LevelQuery.save(<Level>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , Level);
	}

	public async updateOne(slug : string) : Promise<Level | null> {

		let plan : DynamicQuery = LevelQuery.updateOne(slug);

		let level : Level | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , Level);

		await this.relatedEntities(<Level>level);

		return level;
	}

	public async update(slug : string , entry : Level) : Promise<Level | null> {

		let plan : DynamicQuery = LevelQuery.update(slug , <Level>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , Level);
	}

	public async deleteOne(slug : string) : Promise<Level | null> {

		let plan : DynamicQuery = LevelQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , Level);
	} 

	public async remove(slug : string) : Promise<Level | null> {

		let plan : DynamicQuery = LevelQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , Level);
	} 

	public async deleteMany(entries : string) : Promise<Level[]> {

		let plan : DynamicQuery = LevelQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , Level);
	}

	public async deleteAll() : Promise<Level[]> {

		let plan : DynamicQuery = LevelQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , Level);
	}

	public async findAndDeleteAll() : Promise<Level[]> {

		let plan : DynamicQuery = LevelQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , Level);
	}

	public async relatedEntities(entry : Level) : Promise<Level | null> {

		let plan : DynamicQuery = LevelQuery.relatedEntities();

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