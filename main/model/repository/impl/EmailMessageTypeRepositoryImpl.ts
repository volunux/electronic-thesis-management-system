import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Status } from '../../../entity/Status';
import { EmailMessageTypeRepository } from '../EmailMessageTypeRepository';
import { EmailMessageTypeQuery } from '../../query/EmailMessageTypeQuery';
import { EmailMessageType } from '../../../entity/EmailMessageType';

export class EmailMessageTypeRepositoryImpl implements EmailMessageTypeRepository {

	private queryTemplate : QueryTemplate<EmailMessageType> = new SimpleQueryTemplate<EmailMessageType>();

	public async findOne(slug : string) : Promise<EmailMessageType | null> {

		let plan : DynamicQuery = EmailMessageTypeQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , EmailMessageType);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = EmailMessageTypeQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<EmailMessageType[]> {

		let plan : DynamicQuery = EmailMessageTypeQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , EmailMessageType);
	} 

	public async addOne() : Promise<EmailMessageType> {

		let emailMessageType : EmailMessageType = new EmailMessageType({});

		await this.relatedEntities(emailMessageType);

		return emailMessageType;
	} 

	public async save(entry : EmailMessageType) : Promise<EmailMessageType | null> {

		let plan : DynamicQuery = EmailMessageTypeQuery.save(<EmailMessageType>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , EmailMessageType);
	}

	public async updateOne(slug : string) : Promise<EmailMessageType | null> {

		let plan : DynamicQuery = EmailMessageTypeQuery.updateOne(slug);

		let emailMessageType : EmailMessageType | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , EmailMessageType);

		await this.relatedEntities(<EmailMessageType>emailMessageType);

		return emailMessageType;
	}

	public async update(slug : string , entry : EmailMessageType) : Promise<EmailMessageType | null> {

		let plan : DynamicQuery = EmailMessageTypeQuery.update(slug , <EmailMessageType>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , EmailMessageType);
	}

	public async deleteOne(slug : string) : Promise<EmailMessageType | null> {

		let plan : DynamicQuery = EmailMessageTypeQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , EmailMessageType);
	} 

	public async remove(slug : string) : Promise<EmailMessageType | null> {

		let plan : DynamicQuery = EmailMessageTypeQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , EmailMessageType);
	} 

	public async deleteMany(entries : string) : Promise<EmailMessageType[]> {

		let plan : DynamicQuery = EmailMessageTypeQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , EmailMessageType);
	}

	public async deleteAll() : Promise<EmailMessageType[]> {

		let plan : DynamicQuery = EmailMessageTypeQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , EmailMessageType);
	}

	public async findAndDeleteAll() : Promise<EmailMessageType[]> {

		let plan : DynamicQuery = EmailMessageTypeQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , EmailMessageType);
	}

	public async relatedEntities(entry : EmailMessageType) : Promise<EmailMessageType | null> {

		let plan : DynamicQuery = EmailMessageTypeQuery.relatedEntities();

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
