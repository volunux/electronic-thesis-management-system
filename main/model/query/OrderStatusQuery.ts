import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { OrderStatusSearch } from '../../helper/search/OrderStatusSearch';
import { OrderStatus } from '../../entity/OrderStatus';

export class OrderStatusQuery {

	private static search : OrderStatusSearch = OrderStatusSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT os.order_status_id AS _id , os.title , os.updated_on , os.slug , os.description

		FROM ORDER_STATUS AS os

		WHERE os.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static findAll(q : EntityQueryConfig) : DynamicQuery {

		let $sq : SearchQueryOptions = new SearchQueryOptions();

		let p : number = +(<string>q.getParameter('page'));

		if (q != null && q != undefined) { 

			p = p > 0 ? p * 10 : 0;

			if (q.getParameter('type') === 'title') { $sq = OrderStatusQuery.search.label(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = OrderStatusQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = OrderStatusQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT os.title , os.updated_on , os.order_status_no AS num , os.slug

			FROM ORDER_STATUS AS os

			${joinResult} ${conditionResult}

			ORDER BY os.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : OrderStatus) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO ORDER_STATUS (title , description , order_status_no , slug , user_id)

													VALUES ($1 , $2 , $3 , $4 , $5)

													RETURNING order_status_id AS _id , title , slug

												`;

		let values : any[] = [entry.getTitle() , entry.getDescription() , c , s , entry.getUserId()];

		return DynamicQuery.create(text , values);

	}

	public static relatedEntities() : DynamicQuery {

		let text : string = `NOW() `;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static update(slug : string , entry : OrderStatus) : DynamicQuery {

		let text : string = `UPDATE ORDER_STATUS 

													SET title = $1 , description = $2 , user_id = $3 , updated_on = $4

													WHERE slug = $5

													RETURNING order_status_id AS _id , title , slug

												`;

		let values : any[] = [entry.getTitle() , entry.getDescription() , entry.getUserId() , 'NOW()' , slug];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT os.slug , os.title

		FROM ORDER_STATUS AS os

		WHERE os.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM ORDER_STATUS

		WHERE slug = $1 

		RETURNING order_status_id AS _id , title , slug

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM ORDER_STATUS

		WHERE order_status_no IN (${entries})

		RETURNING order_status_id AS _id , title , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM ORDER_STATUS

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM ORDER_STATUS

		RETURNING order_status_id AS _id , title , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT title , true AS exists 

		FROM ORDER_STATUS

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT os.title , os.description , os.slug , os.order_status_id AS status

		FROM ORDER_STATUS AS os

		WHERE os.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

}