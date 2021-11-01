import { QueryResult , QueryResultRow } from 'pg';
import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Status } from '../../../entity/Status';
import { ThesisReviewRepository } from '../ThesisReviewRepository';
import { ThesisReviewQuery } from '../../query/ThesisReviewQuery';
import { ThesisReview } from '../../../entity/ThesisReview';

export class ThesisReviewRepositoryImpl implements ThesisReviewRepository {

	private queryTemplate : QueryTemplate<ThesisReview> = new SimpleQueryTemplate<ThesisReview>();

	public async findOne(slug : string) : Promise<ThesisReview | null> {

		let plan : DynamicQuery = ThesisReviewQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , ThesisReview);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = ThesisReviewQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<ThesisReview[]> {

		let plan : DynamicQuery = ThesisReviewQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , ThesisReview);
	} 

	public async addOne() : Promise<ThesisReview> {

		let thesisReview : ThesisReview = new ThesisReview({});

		await this.relatedEntities(thesisReview);

		return thesisReview;
	} 

	public async save(entry : ThesisReview) : Promise<ThesisReview | null> {

		let plan : DynamicQuery = ThesisReviewQuery.save(<ThesisReview>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , ThesisReview);
	}

	public async updateOne(slug : string) : Promise<ThesisReview | null> {

		let plan : DynamicQuery = ThesisReviewQuery.updateOne(slug);

		let thesisReview : ThesisReview | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , ThesisReview);

		await this.relatedEntities(<ThesisReview>thesisReview);

		return thesisReview;
	}

	public async update(slug : string , entry : ThesisReview) : Promise<ThesisReview | null> {

		let plan : DynamicQuery = ThesisReviewQuery.update(slug , <ThesisReview>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , ThesisReview);
	}

	public async deleteOne(slug : string) : Promise<ThesisReview | null> {

		let plan : DynamicQuery = ThesisReviewQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , ThesisReview);
	} 

	public async remove(slug : string) : Promise<ThesisReview | null> {

		let plan : DynamicQuery = ThesisReviewQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , ThesisReview);
	} 

	public async deleteMany(entries : string) : Promise<ThesisReview[]> {

		let plan : DynamicQuery = ThesisReviewQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , ThesisReview);
	}

	public async deleteAll() : Promise<ThesisReview[]> {

		let plan : DynamicQuery = ThesisReviewQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , ThesisReview);
	}

	public async findAndDeleteAll() : Promise<ThesisReview[]> {

		let plan : DynamicQuery = ThesisReviewQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , ThesisReview);
	}

	public async relatedEntities(entry : ThesisReview) : Promise<ThesisReview | null> {

		let plan : DynamicQuery = ThesisReviewQuery.relatedEntities();

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
