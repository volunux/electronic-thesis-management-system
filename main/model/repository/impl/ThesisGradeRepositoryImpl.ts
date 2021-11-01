import { QueryResult , QueryResultRow } from 'pg';
import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Status } from '../../../entity/Status';
import { ThesisGradeRepository } from '../ThesisGradeRepository';
import { ThesisGradeQuery } from '../../query/ThesisGradeQuery';
import { ThesisGrade } from '../../../entity/ThesisGrade';

export class ThesisGradeRepositoryImpl implements ThesisGradeRepository {

	private queryTemplate : QueryTemplate<ThesisGrade> = new SimpleQueryTemplate<ThesisGrade>();

	public async findOne(slug : string) : Promise<ThesisGrade | null> {

		let plan : DynamicQuery = ThesisGradeQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , ThesisGrade);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = ThesisGradeQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<ThesisGrade[]> {

		let plan : DynamicQuery = ThesisGradeQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , ThesisGrade);
	} 

	public async addOne() : Promise<ThesisGrade> {

		let country : ThesisGrade = new ThesisGrade({});

		await this.relatedEntities(country);

		return country;
	} 

	public async save(entry : ThesisGrade) : Promise<ThesisGrade | null> {

		let plan : DynamicQuery = ThesisGradeQuery.save(<ThesisGrade>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , ThesisGrade);
	}

	public async updateOne(slug : string) : Promise<ThesisGrade | null> {

		let plan : DynamicQuery = ThesisGradeQuery.updateOne(slug);

		let country : ThesisGrade | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , ThesisGrade);

		await this.relatedEntities(<ThesisGrade>country);

		return country;
	}

	public async update(slug : string , entry : ThesisGrade) : Promise<ThesisGrade | null> {

		let plan : DynamicQuery = ThesisGradeQuery.update(slug , <ThesisGrade>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , ThesisGrade);
	}

	public async deleteOne(slug : string) : Promise<ThesisGrade | null> {

		let plan : DynamicQuery = ThesisGradeQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , ThesisGrade);
	} 

	public async remove(slug : string) : Promise<ThesisGrade | null> {

		let plan : DynamicQuery = ThesisGradeQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , ThesisGrade);
	} 

	public async deleteMany(entries : string) : Promise<ThesisGrade[]> {

		let plan : DynamicQuery = ThesisGradeQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , ThesisGrade);
	}

	public async deleteAll() : Promise<ThesisGrade[]> {

		let plan : DynamicQuery = ThesisGradeQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , ThesisGrade);
	}

	public async findAndDeleteAll() : Promise<ThesisGrade[]> {

		let plan : DynamicQuery = ThesisGradeQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , ThesisGrade);
	}

	public async relatedEntities(entry : ThesisGrade) : Promise<ThesisGrade | null> {

		let plan : DynamicQuery = ThesisGradeQuery.relatedEntities();

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
