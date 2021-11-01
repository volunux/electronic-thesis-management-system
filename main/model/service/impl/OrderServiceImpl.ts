import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { OrderRepository } from '../../repository/OrderRepository';
import { OrderRepositoryImpl } from '../../repository/impl/OrderRepositoryImpl';
import { OrderService } from '../OrderService';
import { Order } from '../../../entity/Order';

export class OrderServiceImpl implements OrderService {

	private repository : OrderRepository = new OrderRepositoryImpl();

	public async findOne(slug : string) : Promise<Order | null> {

		return this.repository.findOne(slug);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Order[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<Order> {

		return this.repository.addOne();
	} 

	public async save(entry : Order) : Promise<Order | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<Order | null> {

		return this.repository.updateOne(slug);
	}

	public async relatedEntities(entry : Order) : Promise<Order | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : Order) : Promise<Order | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<Order | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<Order | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<Order[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<Order[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<Order[]> {

		return this.repository.findAndDeleteAll();
	}

}
