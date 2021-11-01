import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { PaymentMethodSearch } from '../../helper/search/PaymentMethodSearch';
import { PaymentMethod } from '../../entity/PaymentMethod';

export class PaymentMethodQuery {

	private static search : PaymentMethodSearch = PaymentMethodSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT pm.payment_method_id AS _id , pm.description , pm.title , pm.updated_on , pm.slug , gs.word AS status

		FROM PAYMENT_METHOD AS pm

		LEFT JOIN STATUS AS gs ON gs._id = pm.status_id

		WHERE pm.slug = $1

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

			if (q.getParameter('type') === 'status') { $sq = PaymentMethodQuery.search.status(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'title') { $sq = PaymentMethodQuery.search.title(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = PaymentMethodQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = PaymentMethodQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT pm.title , pm.updated_on , pm.payment_method_no AS num , pm.slug , gs.word AS status

			FROM PAYMENT_METHOD AS pm

			INNER JOIN STATUS AS gs ON gs._id = pm.status_id

			${joinResult} ${conditionResult}

			ORDER BY pm.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : PaymentMethod) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO PAYMENT_METHOD (title , payment_method_no , slug , user_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , (SELECT status_id AS _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													RETURNING payment_method_id AS _id , title , slug

												`;

		let values : any[] = [entry.getTitle() , c , s , entry.getUserId()];

		return DynamicQuery.create(text , values);

	}

	public static relatedEntities() : DynamicQuery {

		let text : string = `

		SELECT json_build_object(

			'Status' , (SELECT json_agg(row_to_json(gs)) 

									FROM (SELECT status_id AS _id , word 

										FROM STATUS) AS gs )

									) AS result

		`;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static update(slug : string , entry : PaymentMethod) : DynamicQuery {

		let text : string = `UPDATE PAYMENT_METHOD 

													SET title = $1 , description = $2 , status_id = $3 , user_id = $4 , updated_on = $5

													WHERE slug = $6

													RETURNING payment_method_id AS _id , title , slug

													`;

		let values : any[] = [entry.getName() , entry.getDescription() , entry.getStatus() , entry.getUserId() , 'NOW()' , slug];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT pm.slug , pm.title , gs.word AS status

		FROM PAYMENT_METHOD AS pm

		LEFT JOIN STATUS AS gs ON gs._id = pm.status_id

		WHERE pm.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM PAYMENT_METHOD

		WHERE slug = $1 

		RETURNING payment_method_id AS _id , title , slug

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM PAYMENT_METHOD

		WHERE payment_method_no IN (${entries})

		RETURNING payment_method_id AS _id , title , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM PAYMENT_METHOD

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM PAYMENT_METHOD

		RETURNING payment_method_id AS _id , title , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT title , true AS exists 

		FROM PAYMENT_METHOD

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT pm.title , pm.slug , pm.status_id AS status

		FROM PAYMENT_METHOD AS pm

		WHERE pm.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

}