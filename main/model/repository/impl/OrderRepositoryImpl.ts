import { QueryResult , QueryResultRow } from 'pg';
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

	public async findOne(slug : string) : Promise<Order | null> {

		let plan : DynamicQuery = OrderQuery.findOne(slug);

		let order : Order | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				order = new Order(0 , 0 , 0 , 0 , 0 , new Date() , new Date());

				OrderRepositoryImpl.setOrder(singleResult , order);

				order.setOrderItems(await this.findOrderItems(order.getOrderId()));

		}

		} catch(err : any) { console.log('An error has occured'); }

		return order;
	}

	public async findOrderItems(id : number) : Promise<OrderItem[]> {

		let plan : DynamicQuery = OrderQuery.findOrderItems(id);

		let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

		let entries : OrderItem[] = [];

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				entries = OrderRepositoryImpl.mapOrderItems(listResult , id);
		} 

		return entries;
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = OrderQuery.existsOne(slug);

		let order : Order | null = null;

		let exists : boolean = false;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				order = new Order(0 , 0 , 0 , 0 , 0 , new Date() , new Date());

				exists = true;
			}

		} catch(err : any) { console.log('An error has occured'); }

		return exists;
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Order[]> {

		let plan : DynamicQuery = OrderQuery.findAll(eqp);

		let orders : Order[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				orders = OrderRepositoryImpl.rowToOrderMapper<Order>(listResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return orders;
	} 

	public async addOne() : Promise<Order> {

		let order : Order = new Order(0 , 0 , 0 , 0 , 0 , new Date() , new Date());

		try {

			await this.relatedEntities(order);

		} catch(err : any) { console.log('An error has occured'); }

		return order;
	} 

	public async save(entry : Order) : Promise<Order | null> {

		let plan : DynamicQuery = OrderQuery.save(<Order>entry);

		let order : Order | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				order = new Order(0 , 0 , 0 , 0 , 0 , new Date() , new Date());
			}

		} catch(err : any) { console.log('An error has occured'); }

		return order;
	}

	public async updateOne(slug : string) : Promise<Order | null> {

		let plan : DynamicQuery = OrderQuery.updateOne(slug);

		let order : Order | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				order = new Order(0 , 0 , 0 , 0 , 0 , new Date() , new Date());

				await this.relatedEntities(order);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return order;
	}

	public async relatedEntities(entry : Order) : Promise<Order | null> {

		let plan : DynamicQuery = OrderQuery.relatedEntities();

		let orderStatuses : OrderStatus[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = (<QueryResultRow>result.rows[0]).result.OrderStatus;

				orderStatuses = ServiceHelper.rowsToObjectMapper<OrderStatus>(listResult , OrderStatus);

				entry.setStatuses(orderStatuses);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return entry;
	} 

	public async update(slug : string , entry : Order) : Promise<Order | null> {

		let plan : DynamicQuery = OrderQuery.update(slug , <Order>entry);

		let order : Order | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				order = new Order(0  , 0 , 0 , 0 , 0 , new Date() , new Date());
			}

		} catch(err : any) { console.log('An error has occured'); }

		return order;
	}

	public async deleteOne(slug : string) : Promise<Order | null> {

		let plan : DynamicQuery = OrderQuery.deleteOne(slug);

		let order : Order | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				order = new Order(0  , 0 , 0 , 0 , 0 , new Date() , new Date());
			}

		} catch(err : any) { console.log('An error has occured'); }

		return order;
	} 

	public async remove(slug : string) : Promise<Order | null> {

		let plan : DynamicQuery = OrderQuery.remove(slug);

		let order : Order | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				order = new Order(0  , 0 , 0 , 0 , 0 , new Date() , new Date());
			}

		} catch(err : any) { console.log('An error has occured'); }

		return order;
	} 

	public async deleteMany(entries : string) : Promise<Order[]> {

		let plan : DynamicQuery = OrderQuery.deleteMany(entries);

		let orders : Order[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				orders = OrderRepositoryImpl.rowToOrderMapper<Order>(listResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return orders;
	}

	public async deleteAll() : Promise<Order[]> {

		let plan : DynamicQuery = OrderQuery.deleteAll();

		let orders : Order[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				orders = OrderRepositoryImpl.rowToOrderMapper<Order>(listResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return orders;
	}

	public async findAndDeleteAll() : Promise<Order[]> {

		let plan : DynamicQuery = OrderQuery.findAndDeleteAll();

		let orders : Order[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				orders = OrderRepositoryImpl.rowToOrderMapper<Order>(listResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return orders;
	}

	private static rowToOrderMapper<T extends Order>(rowsData : QueryResultRow[]) : Order[] {

		let entries : Order[] = [];

		if (rowsData != null) {

			rowsData.forEach((record : QueryResultRow) => {

				let entry : Order = new Order(0  , 0 , 0 , 0 , 0 , new Date() , new Date());
				let shippingDetail : ShippingDetail = new ShippingDetail({});
				let orderStatus : OrderStatus = new OrderStatus({});

				entry.setOrderId(record.order_id);
				entry.setShippingDetail(shippingDetail);
				entry.setOrderStatus(orderStatus);
				entry.setAmount(record.amount);
				entry.setQuantity(record.quantity);
				entry.setOrderId(record._id);
				entry.setSlug(record.slug);
				entry.setOrderNo(record.num);
				entry.setCreatedOn(<Date>record.created_on);
				entry.setUpdatedOn(<Date>record.updated_on);
				entry.setOrderReference(record.order_reference);
				shippingDetail.setCity(record.city);
				orderStatus.setTitle(record.status);

					entries.push(entry); }); }

			return entries;
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
