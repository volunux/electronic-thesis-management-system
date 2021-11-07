import { QueryResult , QueryResultRow } from 'pg';
import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { RowMapper } from '../../mapper/RowMapper';
import { OrderRowMapper } from '../../mapper/OrderRowMapper';
import { Query } from '../../query/util/Query';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Newable } from '../../../entity/interface/Newable';
import { ShippingDetail } from '../../../entity/ShippingDetail';
import { OrderStatus } from '../../../entity/OrderStatus';
import { OrderItem } from '../../../entity/OrderItem';
import { PaymentMethod } from '../../../entity/PaymentMethod';
import { DeliveryMethod } from '../../../entity/DeliveryMethod'
import { OrderRepository } from '../OrderRepository';
import { OrderQuery } from '../../query/OrderQuery';
import { Order } from '../../../entity/Order';

export class OrderRepositoryImpl implements OrderRepository {

	private queryTemplate : QueryTemplate<Order> = new SimpleQueryTemplate<Order>();

	public async findOne(slug : string) : Promise<Order | null> {

		let plan : DynamicQuery = OrderQuery.findOne(slug);

		let order : Order | null = null;

		let entry : Object | null = await this.queryTemplate.executePlain(plan.getText() , plan.getValues());

		if (entry !== null) {

				order = new Order(0 , 0 , 0 , 0 , 0 , new Date() , new Date());

				OrderRepositoryImpl.setOrder(entry , order);

				order.setOrderItems(await this.findOrderItems(order.getOrderId()));
		}

		return order;
	}

	public async findOrderItems(id : number) : Promise<OrderItem[]> {

		let plan : DynamicQuery = OrderQuery.findOrderItems(id);

		let result : Object[] = await this.queryTemplate.executePlainList(plan.getText() , plan.getValues());

		let entries : OrderItem[] = [];

		entries = OrderRepositoryImpl.mapOrderItems(result , id);

		return entries;
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = OrderQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Order[]> {

		let plan : DynamicQuery = OrderQuery.findAll(eqp);

		return await this.queryTemplate.findAllAndSetWithRowMapper(plan.getText() , plan.getValues() , new OrderRowMapper());
	} 

	public async addOne() : Promise<Order> {

		let order : Order = new Order(0 , 0 , 0 , 0 , 0 , new Date() , new Date());

		await this.relatedEntities(order);

		return order;
	} 

	public async save(entry : Order) : Promise<Order | null> {

		let plan : DynamicQuery = OrderQuery.save(<Order>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , <any>Order);
	}

	public async updateOne(slug : string) : Promise<Order | null> {

		let plan : DynamicQuery = OrderQuery.updateOne(slug);

		let order : Order | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , <any>Order);

		await this.relatedEntities(<Order>order);

		return order;
	}

	public async relatedEntities(entry : Order) : Promise<Order | null> {

		let plan : DynamicQuery = OrderQuery.relatedEntities();

		let orderStatuses : OrderStatus[] = [];

		let result : Object | null = await this.queryTemplate.relatedEntities(plan.getText() , plan.getValues());

			if (result !== null && entry !== null) {

				let listResult : QueryResultRow[] = (<any>result).OrderStatus;

				orderStatuses = ServiceHelper.rowsToObjectMapper<OrderStatus>(listResult , OrderStatus);

				entry.setStatuses(orderStatuses); }

		return entry;
	} 

	public async update(slug : string , entry : Order) : Promise<Order | null> {

		let plan : DynamicQuery = OrderQuery.update(slug , <Order>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , <any>Order);
	}

	public async deleteOne(slug : string) : Promise<Order | null> {

		let plan : DynamicQuery = OrderQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , <any>Order);
	} 

	public async remove(slug : string) : Promise<Order | null> {

		let plan : DynamicQuery = OrderQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , <any>Order);
	} 

	public async deleteMany(entries : string) : Promise<Order[]> {

		let plan : DynamicQuery = OrderQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , <any>Order);
	}

	public async deleteAll() : Promise<Order[]> {

		let plan : DynamicQuery = OrderQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , <any>Order);
	}

	public async findAndDeleteAll() : Promise<Order[]> {

		let plan : DynamicQuery = OrderQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , <any>Order);
	}

	private static setOrder(record : QueryResultRow , entry : Order) : void {

		let shippingDetail : ShippingDetail = new ShippingDetail({});
		let orderStatus : OrderStatus = new OrderStatus({});
		let paymentMethod : PaymentMethod = new PaymentMethod({});
		let deliveryMethod : DeliveryMethod = new DeliveryMethod({});

		entry.setShippingDetail(shippingDetail);
		entry.setOrderStatus(orderStatus);

		entry.setAmount(record.amount);
		entry.setQuantity(record.quantity);
		entry.setOrderId(record._id);
		entry.setOrderNo(record.num);
		entry.setSlug(record.slug);
		entry.setFullName(record.full_name);
		entry.setOrderReference(record.order_reference);

		entry.setCreatedOn(<Date>record.created_on);
		entry.setUpdatedOn(<Date>record.updated_on);

		shippingDetail.setCity(record.city);
		shippingDetail.setContactAddress(record.contact_address);
		shippingDetail.setState(record.state);
		shippingDetail.setPhoneNumber(record.phone_number);
		shippingDetail.setZip(record.zip);
		shippingDetail.setCountry(record.country);

		paymentMethod.setTitle(record.payment_method);
		deliveryMethod.setTitle(record.delivery_method);
		
		orderStatus.setTitle(record.status);
	}

	private static mapOrderItems(rowsData : QueryResultRow[] , id : number) : OrderItem[] {

		let entries : OrderItem[] = [];

		if (rowsData != null) {

			rowsData.forEach((record : QueryResultRow) => {

				let entry : OrderItem = new OrderItem(0  , "" , 0 , 0);

				entry.setOrderId(id);
				entry.setItemId(record.item_id);
				entry.setTitle(record.title);
				entry.setAmount(record.amount);
				entry.setQty(record.quantity);
				entry.setUnitPrice(record.unit_price);

				entries.push(entry); }); }

		return entries;
	}


}

