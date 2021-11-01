import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { DeliveryMethodRepository } from '../../repository/DeliveryMethodRepository';
import { DeliveryMethodRepositoryImpl } from '../../repository/impl/DeliveryMethodRepositoryImpl';
import { DeliveryMethodService } from '../DeliveryMethodService';
import { DeliveryMethod } from '../../../entity/DeliveryMethod';

export class DeliveryMethodServiceImpl implements DeliveryMethodService {

	private repository : DeliveryMethodRepository = new DeliveryMethodRepositoryImpl();

	public async findOne(slug : string) : Promise<DeliveryMethod | null> {

		return this.repository.findOne(slug);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<DeliveryMethod[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<DeliveryMethod> {

		return this.repository.addOne();
	} 

	public async save(entry : DeliveryMethod) : Promise<DeliveryMethod | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<DeliveryMethod | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : DeliveryMethod) : Promise<DeliveryMethod | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : DeliveryMethod) : Promise<DeliveryMethod | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<DeliveryMethod | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<DeliveryMethod | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<DeliveryMethod[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<DeliveryMethod[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<DeliveryMethod[]> {

		return this.repository.findAndDeleteAll();
	}

}
