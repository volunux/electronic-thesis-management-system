import { QueryResult , QueryResultRow } from 'pg';
import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { OrderStatusRepository } from '../OrderStatusRepository';
import { OrderStatusQuery } from '../../query/OrderStatusQuery';
import { OrderStatus } from '../../../entity/OrderStatus';

export class OrderStatusRepositoryImpl implements OrderStatusRepository {

	private queryTemplate : QueryTemplate<OrderStatus> = new SimpleQueryTemplate<OrderStatus>();

	public async findOne(slug : string) : Promise<OrderStatus | null> {

		let plan : DynamicQuery = OrderStatusQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , OrderStatus);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = OrderStatusQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<OrderStatus[]> {

		let plan : DynamicQuery = OrderStatusQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , OrderStatus);
	} 

	public async addOne() : Promise<OrderStatus> {

		let orderStatus : OrderStatus = new OrderStatus({});

		await this.relatedEntities(orderStatus);

		return orderStatus;
	} 

	public async save(entry : OrderStatus) : Promise<OrderStatus | null> {

		let plan : DynamicQuery = OrderStatusQuery.save(<OrderStatus>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , OrderStatus);
	}

	public async updateOne(slug : string) : Promise<OrderStatus | null> {

		let plan : DynamicQuery = OrderStatusQuery.updateOne(slug);

		let orderStatus : OrderStatus | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , OrderStatus);

		await this.relatedEntities(<OrderStatus>orderStatus);

		return orderStatus;
	}

	public async update(slug : string , entry : OrderStatus) : Promise<OrderStatus | null> {

		let plan : DynamicQuery = OrderStatusQuery.update(slug , <OrderStatus>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , OrderStatus);
	}

	public async deleteOne(slug : string) : Promise<OrderStatus | null> {

		let plan : DynamicQuery = OrderStatusQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , OrderStatus);
	} 

	public async remove(slug : string) : Promise<OrderStatus | null> {

		let plan : DynamicQuery = OrderStatusQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , OrderStatus);
	} 

	public async deleteMany(entries : string) : Promise<OrderStatus[]> {

		let plan : DynamicQuery = OrderStatusQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , OrderStatus);
	}

	public async deleteAll() : Promise<OrderStatus[]> {

		let plan : DynamicQuery = OrderStatusQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , OrderStatus);
	}

	public async findAndDeleteAll() : Promise<OrderStatus[]> {

		let plan : DynamicQuery = OrderStatusQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , OrderStatus);
	}

	public async relatedEntities(entry : OrderStatus) : Promise<OrderStatus | null> {

		return entry;
	} 


}
