import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { EmailMessageTemplateRepository } from '../../repository/EmailMessageTemplateRepository';
import { EmailMessageTemplateRepositoryImpl } from '../../repository/impl/EmailMessageTemplateRepositoryImpl';
import { EmailMessageTemplateService } from '../EmailMessageTemplateService';
import { EmailMessageTemplate } from '../../../entity/EmailMessageTemplate';

export class EmailMessageTemplateServiceImpl implements EmailMessageTemplateService {

	private repository : EmailMessageTemplateRepository = new EmailMessageTemplateRepositoryImpl();

	public async findOne(slug : string) : Promise<EmailMessageTemplate | null> {

		return this.repository.findOne(slug);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<EmailMessageTemplate[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<EmailMessageTemplate> {

		return this.repository.addOne();
	} 

	public async save(entry : EmailMessageTemplate) : Promise<EmailMessageTemplate | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<EmailMessageTemplate | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : EmailMessageTemplate) : Promise<EmailMessageTemplate | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : EmailMessageTemplate) : Promise<EmailMessageTemplate | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<EmailMessageTemplate | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<EmailMessageTemplate | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<EmailMessageTemplate[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<EmailMessageTemplate[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<EmailMessageTemplate[]> {

		return this.repository.findAndDeleteAll();
	}

}
