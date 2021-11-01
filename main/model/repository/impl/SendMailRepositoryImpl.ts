import { QueryResult , QueryResultRow } from 'pg';
import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Status } from '../../../entity/Status';
import { SendMailRepository } from '../SendMailRepository';
import { SendMailQuery } from '../../query/SendMailQuery';
import { SendMail } from '../../../entity/SendMail';

export class SendMailRepositoryImpl implements SendMailRepository {

	private queryTemplate : QueryTemplate<SendMail> = new SimpleQueryTemplate<SendMail>();

	public async findOne(slug : string) : Promise<SendMail | null> {

		let plan : DynamicQuery = SendMailQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , SendMail);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = SendMailQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<SendMail[]> {

		let plan : DynamicQuery = SendMailQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , SendMail);
	} 

	public async addOne() : Promise<SendMail> {

		let sendMail : SendMail = new SendMail({});

		await this.relatedEntities(sendMail);

		return sendMail;
	} 

	public async save(entry : SendMail) : Promise<SendMail | null> {

		let plan : DynamicQuery = SendMailQuery.save(<SendMail>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , SendMail);
	}

	public async updateOne(slug : string) : Promise<SendMail | null> {

		let plan : DynamicQuery = SendMailQuery.updateOne(slug);

		let sendMail : SendMail | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , SendMail);

		await this.relatedEntities(<SendMail>sendMail);

		return sendMail;
	}

	public async update(slug : string , entry : SendMail) : Promise<SendMail | null> {

		let plan : DynamicQuery = SendMailQuery.update(slug , <SendMail>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , SendMail);
	}

	public async deleteOne(slug : string) : Promise<SendMail | null> {

		let plan : DynamicQuery = SendMailQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , SendMail);
	} 

	public async remove(slug : string) : Promise<SendMail | null> {

		let plan : DynamicQuery = SendMailQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , SendMail);
	} 

	public async deleteMany(entries : string) : Promise<SendMail[]> {

		let plan : DynamicQuery = SendMailQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , SendMail);
	}

	public async deleteAll() : Promise<SendMail[]> {

		let plan : DynamicQuery = SendMailQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , SendMail);
	}

	public async findAndDeleteAll() : Promise<SendMail[]> {

		let plan : DynamicQuery = SendMailQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , SendMail);
	}

	public async relatedEntities(entry : SendMail) : Promise<SendMail | null> {

		let plan : DynamicQuery = SendMailQuery.relatedEntities();

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
