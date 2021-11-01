import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { OrderSearch } from '../../helper/search/OrderSearch';
import { Order } from '../../entity/Order';

export class OrderQuery {

	private static search : OrderSearch = OrderSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT ord.order_id AS _id , ord.order_reference , ord.amount , ord.quantity , ord.city , ord.state , ord.contact_address , ord.phone_number , ord.zip , ct.name AS country , pm.title AS payment_method ,

		dm.title AS delivery_method , ord.updated_on , ord.created_on , ord.order_no AS num , ord.slug , ord.user_id , usr.first_name || ' ' || usr.last_name AS full_name , os.title AS status 

		FROM ORDERS AS ord

		LEFT JOIN ORDER_STATUS AS os ON os.order_status_id = ord.order_status_id

		INNER JOIN USERS AS usr ON usr.user_id = ord.user_id

		INNER JOIN PAYMENT_METHOD AS pm ON pm.payment_method_id = ord.payment_method_id

		INNER JOIN DELIVERY_METHOD AS dm ON dm.delivery_method_id = ord.delivery_method_id

		INNER JOIN COUNTRY AS ct ON ct.country_id = ord.country_id

		WHERE ord.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static findOrderItems(id : number) : DynamicQuery {

		let text : string = `

		SELECT oi.order_id , oi.quantity , oi.amount , oi.unit_price , oi.item_id , th.title 

		FROM ORDER_ITEM AS oi

		INNER JOIN THESIS AS th ON th.thesis_id = oi.item_id

		WHERE oi.order_id = $1

		`;

		let values : any[] = [id];

		return DynamicQuery.create(text , values);

	}

	public static findAll(q : EntityQueryConfig) : DynamicQuery {

		let $sq : SearchQueryOptions = new SearchQueryOptions();

		let p : number = +(<string>q.getParameter('page'));

		if (q !== null && q !== undefined) {

			p = p > 0 ? p * 10 : 0;

			if (q.getParameter('type') === 'status') { $sq = OrderQuery.search.status(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'amount') { $sq = OrderQuery.search.label(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'quantity') { $sq = OrderQuery.search.abbreviation(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'unit_price') { $sq = OrderQuery.search.abbreviation(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = OrderQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = OrderQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT ord.order_id AS _id , ord.order_reference , ord.amount , ord.quantity , ord.city , ord.updated_on , ord.order_no AS num , ord.slug , os.title AS status

			FROM ORDERS AS ord

			INNER JOIN ORDER_STATUS AS os ON os.order_status_id = ord.order_status_id

			${joinResult} ${conditionResult}

			ORDER BY ord.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : Order) : DynamicQuery {

		let text : string = ``;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static relatedEntities() : DynamicQuery {

		let text : string = ` `;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static update(slug : string , entry : Order) : DynamicQuery {

		let text : string = `UPDATE ORDERS 

													SET order_status_id = $1 , updated_on = $2

													WHERE slug = $3

													RETURNING order_id AS _id

													`;

		let values : any[] = [entry.getOrderStatusId() , 'NOW()' , slug];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT ord.order_id AS _id , ord.contact_address , os.title AS status

		FROM ORDERS AS ord

		LEFT JOIN ORDER_STATUS AS os ON os.order_status_id = ord.order_status_id

		WHERE ord.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM ORDERS

		WHERE slug = $1 

		RETURNING order_id AS _id , contact_address , state , city

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM ORDERS

		WHERE order_no IN (${entries})

		RETURNING order_id AS _id , contact_address , state , city

		`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM ORDERS

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM ORDERS

		RETURNING order_id AS _id , state , city

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT order_id AS _id , true AS exists 

		FROM ORDERS

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT ord.order_id AS _id , ord.city , ord.state , ord.contact_address , ord.phone_number ,  ord.slug , ord.order_status_id AS status

		FROM ORDERS AS ord

		WHERE ord.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

}