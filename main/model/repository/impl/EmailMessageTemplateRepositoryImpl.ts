import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Status } from '../../../entity/Status';
import { EmailMessageType } from '../../../entity/EmailMessageType';
import { EmailMessageTemplateRepository } from '../EmailMessageTemplateRepository';
import { EmailMessageTemplateQuery } from '../../query/EmailMessageTemplateQuery';
import { EmailMessageTemplate } from '../../../entity/EmailMessageTemplate';

export class EmailMessageTemplateRepositoryImpl implements EmailMessageTemplateRepository {

	private queryTemplate : QueryTemplate<EmailMessageTemplate> = new SimpleQueryTemplate<EmailMessageTemplate>();

	public async findOne(slug : string) : Promise<EmailMessageTemplate | null> {

		let plan : DynamicQuery = EmailMessageTemplateQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , EmailMessageTemplate);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = EmailMessageTemplateQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<EmailMessageTemplate[]> {

		let plan : DynamicQuery = EmailMessageTemplateQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , EmailMessageTemplate);
	} 

	public async addOne() : Promise<EmailMessageTemplate> {

		let emailMessageTemplate : EmailMessageTemplate = new EmailMessageTemplate({});

		await this.relatedEntities(emailMessageTemplate);

		return emailMessageTemplate;
	} 

	public async save(entry : EmailMessageTemplate) : Promise<EmailMessageTemplate | null> {

		let plan : DynamicQuery = EmailMessageTemplateQuery.save(<EmailMessageTemplate>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , EmailMessageTemplate);
	}

	public async updateOne(slug : string) : Promise<EmailMessageTemplate | null> {

		let plan : DynamicQuery = EmailMessageTemplateQuery.updateOne(slug);

		let emailMessageTemplate : EmailMessageTemplate | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , EmailMessageTemplate);

		await this.relatedEntities(<EmailMessageTemplate>emailMessageTemplate);

		return emailMessageTemplate;
	}

	public async update(slug : string , entry : EmailMessageTemplate) : Promise<EmailMessageTemplate | null> {

		let plan : DynamicQuery = EmailMessageTemplateQuery.update(slug , <EmailMessageTemplate>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , EmailMessageTemplate);
	}

	public async deleteOne(slug : string) : Promise<EmailMessageTemplate | null> {

		let plan : DynamicQuery = EmailMessageTemplateQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , EmailMessageTemplate);
	} 

	public async remove(slug : string) : Promise<EmailMessageTemplate | null> {

		let plan : DynamicQuery = EmailMessageTemplateQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , EmailMessageTemplate);
	} 

	public async deleteMany(entries : string) : Promise<EmailMessageTemplate[]> {

		let plan : DynamicQuery = EmailMessageTemplateQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , EmailMessageTemplate);
	}

	public async deleteAll() : Promise<EmailMessageTemplate[]> {

		let plan : DynamicQuery = EmailMessageTemplateQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , EmailMessageTemplate);
	}

	public async findAndDeleteAll() : Promise<EmailMessageTemplate[]> {

		let plan : DynamicQuery = EmailMessageTemplateQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , EmailMessageTemplate);
	}

	public async relatedEntities(entry : EmailMessageTemplate) : Promise<EmailMessageTemplate | null> {

		let plan : DynamicQuery = EmailMessageTemplateQuery.relatedEntities();

		let statuses : Status[] = [];

		let emailMessageTypes : EmailMessageType[] = [];

		let result : Object | null = await this.queryTemplate.relatedEntities(plan.getText() , plan.getValues());

		if (result !== null && entry !== null) {

				let listResult : Object[] = (<any>result).Status;

				let listResult2 : Object[] = (<any>result).EmailMessageType;

				statuses = ServiceHelper.rowsToObjectMapper<Status>(listResult , Status);

				emailMessageTypes = ServiceHelper.rowsToObjectMapper<EmailMessageType>(listResult2 , EmailMessageType);

				entry.setStatuses(statuses);

				entry.setEmailMessageTypes(emailMessageTypes);
		}

		return entry;
	} 

}
