import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { SendMailRepository } from '../../repository/SendMailRepository';
import { SendMailRepositoryImpl } from '../../repository/impl/SendMailRepositoryImpl';
import { SendMailService } from '../SendMailService';
import { SendMail } from '../../../entity/SendMail';

export class SendMailServiceImpl implements SendMailService {

	private repository : SendMailRepository = new SendMailRepositoryImpl();

	public async findOne(slug : string) : Promise<SendMail | null> {

		return this.repository.findOne(slug);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<SendMail[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<SendMail> {

		return this.repository.addOne();
	} 

	public async save(entry : SendMail) : Promise<SendMail | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<SendMail | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : SendMail) : Promise<SendMail | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : SendMail) : Promise<SendMail | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<SendMail | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<SendMail | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<SendMail[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<SendMail[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<SendMail[]> {

		return this.repository.findAndDeleteAll();
	}

}
