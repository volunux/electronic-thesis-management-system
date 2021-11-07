import { QueryResultRow } from 'pg';
import { RowMapper } from './RowMapper';
import { Order } from '../../entity/Order';
import { ShippingDetail } from '../../entity/ShippingDetail';
import { OrderStatus } from '../../entity/OrderStatus';

export class OrderRowMapper implements RowMapper<Order> {

		process(rowsData : QueryResultRow[]) : Order[] {

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


}