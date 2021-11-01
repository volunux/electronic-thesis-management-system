import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { OrderStatusRepository } from '../../repository/OrderStatusRepository';
import { OrderStatusRepositoryImpl } from '../../repository/impl/OrderStatusRepositoryImpl';
import { OrderStatusService } from '../OrderStatusService';
import { OrderStatus } from '../../../entity/OrderStatus';

export class OrderStatusServiceImpl implements OrderStatusService {

	private repository : OrderStatusRepository = new OrderStatusRepositoryImpl();

	public async findOne(slug : string) : Promise<OrderStatus | null> {

		return this.repository.findOne(slug);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<OrderStatus[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<OrderStatus> {

		return this.repository.addOne();
	} 

	public async save(entry : OrderStatus) : Promise<OrderStatus | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<OrderStatus | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : OrderStatus) : Promise<OrderStatus | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : OrderStatus) : Promise<OrderStatus | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<OrderStatus | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<OrderStatus | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<OrderStatus[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<OrderStatus[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<OrderStatus[]> {

		return this.repository.findAndDeleteAll();
	}

}
