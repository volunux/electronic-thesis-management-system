import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { PaymentMethodRepository } from '../../repository/PaymentMethodRepository';
import { PaymentMethodRepositoryImpl } from '../../repository/impl/PaymentMethodRepositoryImpl';
import { PaymentMethodService } from '../PaymentMethodService';
import { PaymentMethod } from '../../../entity/PaymentMethod';

export class PaymentMethodServiceImpl implements PaymentMethodService {

	private repository : PaymentMethodRepository = new PaymentMethodRepositoryImpl();

	public async findOne(slug : string) : Promise<PaymentMethod | null> {

		return this.repository.findOne(slug);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<PaymentMethod[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<PaymentMethod> {

		return this.repository.addOne();
	} 

	public async save(entry : PaymentMethod) : Promise<PaymentMethod | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<PaymentMethod | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : PaymentMethod) : Promise<PaymentMethod | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : PaymentMethod) : Promise<PaymentMethod | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<PaymentMethod | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<PaymentMethod | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<PaymentMethod[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<PaymentMethod[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<PaymentMethod[]> {

		return this.repository.findAndDeleteAll();
	}

}
