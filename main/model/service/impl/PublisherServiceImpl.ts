import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { PublisherRepository } from '../../repository/PublisherRepository';
import { PublisherRepositoryImpl } from '../../repository/impl/PublisherRepositoryImpl';
import { PublisherService } from '../PublisherService';
import { Publisher } from '../../../entity/Publisher';

export class PublisherServiceImpl implements PublisherService {

	private repository : PublisherRepository = new PublisherRepositoryImpl();

	public async findOne(slug : string) : Promise<Publisher | null> {

		return this.repository.findOne(slug);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Publisher[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<Publisher> {

		return this.repository.addOne();
	} 

	public async save(entry : Publisher) : Promise<Publisher | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<Publisher | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : Publisher) : Promise<Publisher | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : Publisher) : Promise<Publisher | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<Publisher | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<Publisher | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<Publisher[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<Publisher[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<Publisher[]> {

		return this.repository.findAndDeleteAll();
	}

}
