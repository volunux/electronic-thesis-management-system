import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { EmailMessageTypeRepository } from '../../repository/EmailMessageTypeRepository';
import { EmailMessageTypeRepositoryImpl } from '../../repository/impl/EmailMessageTypeRepositoryImpl';
import { EmailMessageTypeService } from '../EmailMessageTypeService';
import { EmailMessageType } from '../../../entity/EmailMessageType';

export class EmailMessageTypeServiceImpl implements EmailMessageTypeService {

	private repository : EmailMessageTypeRepository = new EmailMessageTypeRepositoryImpl();

	public async findOne(slug : string) : Promise<EmailMessageType | null> {

		return this.repository.findOne(slug);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<EmailMessageType[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<EmailMessageType> {

		return this.repository.addOne();
	} 

	public async save(entry : EmailMessageType) : Promise<EmailMessageType | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<EmailMessageType | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : EmailMessageType) : Promise<EmailMessageType | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : EmailMessageType) : Promise<EmailMessageType | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<EmailMessageType | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<EmailMessageType | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<EmailMessageType[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<EmailMessageType[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<EmailMessageType[]> {

		return this.repository.findAndDeleteAll();
	}

}
