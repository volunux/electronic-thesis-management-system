import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Status } from '../../../entity/Status';
import { ThesisReplyRepository } from '../ThesisReplyRepository';
import { ThesisReplyQuery } from '../../query/ThesisReplyQuery';
import { ThesisReply } from '../../../entity/ThesisReply';

export class ThesisReplyRepositoryImpl implements ThesisReplyRepository {

	private queryTemplate : QueryTemplate<ThesisReply> = new SimpleQueryTemplate<ThesisReply>();

	public async findOne(slug : string) : Promise<ThesisReply | null> {

		let plan : DynamicQuery = ThesisReplyQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , ThesisReply);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = ThesisReplyQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<ThesisReply[]> {

		let plan : DynamicQuery = ThesisReplyQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , ThesisReply);
	} 

	public async addOne() : Promise<ThesisReply> {

		let thesisReply : ThesisReply = new ThesisReply({});

		await this.relatedEntities(thesisReply);

		return thesisReply;
	} 

	public async save(entry : ThesisReply) : Promise<ThesisReply | null> {

		let plan : DynamicQuery = ThesisReplyQuery.save(<ThesisReply>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , ThesisReply);
	}

	public async updateOne(slug : string) : Promise<ThesisReply | null> {

		let plan : DynamicQuery = ThesisReplyQuery.updateOne(slug);

		let thesisReply : ThesisReply | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , ThesisReply);

		await this.relatedEntities(<ThesisReply>thesisReply);

		return thesisReply;
	}

	public async update(slug : string , entry : ThesisReply) : Promise<ThesisReply | null> {

		let plan : DynamicQuery = ThesisReplyQuery.update(slug , <ThesisReply>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , ThesisReply);
	}

	public async deleteOne(slug : string) : Promise<ThesisReply | null> {

		let plan : DynamicQuery = ThesisReplyQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , ThesisReply);
	} 

	public async remove(slug : string) : Promise<ThesisReply | null> {

		let plan : DynamicQuery = ThesisReplyQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , ThesisReply);
	} 

	public async deleteMany(entries : string) : Promise<ThesisReply[]> {

		let plan : DynamicQuery = ThesisReplyQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , ThesisReply);
	}

	public async deleteAll() : Promise<ThesisReply[]> {

		let plan : DynamicQuery = ThesisReplyQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , ThesisReply);
	}

	public async findAndDeleteAll() : Promise<ThesisReply[]> {

		let plan : DynamicQuery = ThesisReplyQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , ThesisReply);
	}

	public async relatedEntities(entry : ThesisReply) : Promise<ThesisReply | null> {

		let plan : DynamicQuery = ThesisReplyQuery.relatedEntities();

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