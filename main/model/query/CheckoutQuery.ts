import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { DynamicQuery } from './util/DynamicQuery';
import { User } from '../../entity/User';
import { Order } from '../../entity/Order';
import { OrderItem } from '../../entity/OrderItem';
import { PaymentDetail } from '../../entity/PaymentDetail';

export class CheckoutQuery {

	public static existsOrderItem(entry : OrderItem) : DynamicQuery {

		let text : string = `SELECT title , true AS exists 

													FROM THESIS

													WHERE _id = $1

													LIMIT 1`;

		let values : any[] = [entry.getItemId()];

		return DynamicQuery.create(text , values);
	}

	public static verifyOrderItemPrice(entry : OrderItem) : DynamicQuery {

		let text : string = `SELECT title , true AS exists 

													FROM THESIS

													WHERE _id = $1 AND price = $2

													LIMIT 1`;

		let values : any[] = [entry.getItemId() , entry.getUnitPrice()];

		return DynamicQuery.create(text , values);
	}

	public static retrieveUserDetails(user_id : number) : DynamicQuery {

		let text : string = `SELECT first_name , last_name , email_address , true AS exists 

													FROM USERS

													WHERE _id = $1

													LIMIT 1`;

		let values : any[] = [user_id];

		return DynamicQuery.create(text , values);
	}

	public static updateTransactionReference(reference : string , order_id : number) : DynamicQuery {

		let text : string = `UPDATE ORDERS SET order_reference = $1 

													WHERE order_id = $2

													LIMIT 1

													RETURNING order_id`;

		let values : any[] = [reference , order_id];

		return DynamicQuery.create(text , values);
	}

	public static updateTransactionStatusSuccess(reference : string) : DynamicQuery {

		let text : string = `UPDATE ORDERS SET order_status_id = os.order_status_id 

													FROM ORDER_STATUS AS os

													WHERE order_reference = $1 AND os.title = 'Completed'

													RETURNING order_id

													`;

		let values : any[] = [reference];

		return DynamicQuery.create(text , values);
	}

	public static updateTransactionStatusFailure(reference : string) : DynamicQuery {

		let text : string = `UPDATE ORDERS SET order_status_id = os.order_status_id 

													FROM ORDER_STATUS AS os

													WHERE order_reference = $1 AND os.title = 'Failed'

												`;

		let values : any[] = [reference];

		return DynamicQuery.create(text , values);
	}

	public static savePaymentDetail(entry : PaymentDetail , reference : string) : DynamicQuery {

		let text : string = `INSERT INTO PAYMENT_DETAIL(card_last_four_number , exp_month , exp_year , bank_name , card_type , order_id)

													VALUES($1 , $2 , $3 , $4 , $5 , (SELECT order_id FROM ORDERS AS ord WHERE ord.order_reference = $6 LIMIT 1))

													RETURNING order_id

													`;

		let values : any[] = [entry.getCardLastFourNumber() , entry.getExpMonth() , entry.getExpYear() , entry.getBankName() , entry.getCardType() , reference];

		return DynamicQuery.create(text , values);

	}

	public static relatedEntities() : DynamicQuery {

		let text : string = `SELECT json_build_object(

			'Country' , (SELECT json_agg(row_to_json(ct))

									FROM (SELECT _id , name

										FROM COUNTRY) AS ct ) ,

			'PaymentMethod' , (SELECT json_agg(row_to_json(pm))

											FROM (SELECT _id , title

												FROM PAYMENT_METHOD

												WHERE title ='Card' ) AS pm ) ,

			'DeliveryMethod' , (SELECT json_agg(row_to_json(dm)) 

											FROM (SELECT _id , title

												FROM DELIVERY_METHOD 

												WHERE title ='Pay before Delivery' ) AS dm )

								) AS result

		`;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static saveOrder(entry : Order) : DynamicQuery {

		let c = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO ORDERS(order_reference , quantity , amount , delivery_method_id , payment_method_id , user_id , contact_address , state , city , 

													zip , phone_number , country_id , order_no , slug , order_status_id)

													VALUES($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12 , $13 , $14 , (SELECT order_status_id AS _id FROM ORDER_STATUS AS os WHERE os.title = 'Pending' LIMIT 1))

													RETURNING order_id AS _id

												`;

		let values : any[] = [entry.getOrderReference() , entry.getQuantity() , entry.getAmount() , entry.getDeliveryMethodId() , entry.getPaymentMethodId() , entry.getUserId() , 

													entry.getShippingDetail()!.getContactAddress() , entry.getShippingDetail()!.getState() , entry.getShippingDetail()!.getCity() , entry.getShippingDetail()!.getZip() ,

													entry.getShippingDetail()!.getPhoneNumber() , entry.getShippingDetail()!.getCountry() , c , s ];

		return DynamicQuery.create(text , values);

	}

	public static saveOrderItem(entry : OrderItem) : DynamicQuery {

		let c = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO ORDER_ITEM(quantity , amount , unit_price , order_id , item_id)

													VALUES($1 , $2 , $3 , $4 , $5)`;

		let values : any[] = [entry.getQuantity() , entry.getAmount() , entry.getUnitPrice() , entry.getOrderId() , entry.getItemId()];

		return DynamicQuery.create(text , values);

	}

	public static saveAddress(entry : Order) : DynamicQuery {

		let s = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO USER_ADDRESS(contact_address , state , city , zip , phone_number , user_id , slug , status_id)

													VALUES($1 , $2 , $3 , $4 , $5 , $6 , $7 , (SELECT _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

												`;

		let values : any[] = [entry.getShippingDetail()!.getContactAddress() , entry.getShippingDetail()!.getState() , entry.getShippingDetail()!.getCity() , entry.getShippingDetail()!.getZip() ,

													entry.getShippingDetail()!.getPhoneNumber() , entry.getUserId() , s];

		return DynamicQuery.create(text , values);

	}

	public static findAll(q : EntityQueryConfig) : DynamicQuery {

		let text : string = "";

		let values : any[] = [];

		return DynamicQuery.create(text , values);
	}

	public static save(entry : Order) : DynamicQuery {

		let text : string = "";

		let values : any[] = [];

		return DynamicQuery.create(text , values);
	}

	public static update(slug : string , entry : Order) : DynamicQuery {

		let text : string = "";

		let values : any[] = [];

		return DynamicQuery.create(text , values);
	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = "";

		let values : any[] = [];

		return DynamicQuery.create(text , values);
	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = "";

		let values : any[] = [];

		return DynamicQuery.create(text , values);
	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = "";

		let values : any[] = [];

		return DynamicQuery.create(text , values);
	}

	public static deleteAll() : DynamicQuery {

		let text : string = "";

		let values : any[] = [];

		return DynamicQuery.create(text , values);
	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = "";

		let values : any[] = [];

		return DynamicQuery.create(text , values);
	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = "";

		let values : any[] = [];

		return DynamicQuery.create(text , values);
	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = "";

		let values : any[] = [];

		return DynamicQuery.create(text , values);
	}

}