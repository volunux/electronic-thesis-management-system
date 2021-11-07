import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Status } from '../../../entity/Status';
import { FacultyRepository } from '../FacultyRepository';
import { FacultyQuery } from '../../query/FacultyQuery';
import { Faculty } from '../../../entity/Faculty';

export class FacultyRepositoryImpl implements FacultyRepository {

	private queryTemplate : QueryTemplate<Faculty> = new SimpleQueryTemplate<Faculty>();

	public async findOne(slug : string) : Promise<Faculty | null> {

		let plan : DynamicQuery = FacultyQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , Faculty);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = FacultyQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Faculty[]> {

		let plan : DynamicQuery = FacultyQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , Faculty);
	} 

	public async addOne() : Promise<Faculty> {

		let faculty : Faculty = new Faculty({});

		await this.relatedEntities(faculty);

		return faculty;
	} 

	public async save(entry : Faculty) : Promise<Faculty | null> {

		let plan : DynamicQuery = FacultyQuery.save(<Faculty>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , Faculty);
	}

	public async updateOne(slug : string) : Promise<Faculty | null> {

		let plan : DynamicQuery = FacultyQuery.updateOne(slug);

		let faculty : Faculty | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , Faculty);

		await this.relatedEntities(<Faculty>faculty);

		return faculty;
	}

	public async update(slug : string , entry : Faculty) : Promise<Faculty | null> {

		let plan : DynamicQuery = FacultyQuery.update(slug , <Faculty>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , Faculty);
	}

	public async deleteOne(slug : string) : Promise<Faculty | null> {

		let plan : DynamicQuery = FacultyQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , Faculty);
	} 

	public async remove(slug : string) : Promise<Faculty | null> {

		let plan : DynamicQuery = FacultyQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , Faculty);
	} 

	public async deleteMany(entries : string) : Promise<Faculty[]> {

		let plan : DynamicQuery = FacultyQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , Faculty);
	}

	public async deleteAll() : Promise<Faculty[]> {

		let plan : DynamicQuery = FacultyQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , Faculty);
	}

	public async findAndDeleteAll() : Promise<Faculty[]> {

		let plan : DynamicQuery = FacultyQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , Faculty);
	}

	public async relatedEntities(entry : Faculty) : Promise<Faculty | null> {

		let plan : DynamicQuery = FacultyQuery.relatedEntities();

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
