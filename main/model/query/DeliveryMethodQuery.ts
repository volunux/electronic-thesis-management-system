import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { DeliveryMethodSearch } from '../../helper/search/DeliveryMethodSearch';
import { DeliveryMethod } from '../../entity/DeliveryMethod';

export class DeliveryMethodQuery {

	private static search : DeliveryMethodSearch = DeliveryMethodSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT dm.delivery_method_id AS _id , dm.description , dm.title , dm.updated_on , dm.slug , gs.word AS status

		FROM DELIVERY_METHOD AS dm

		LEFT JOIN STATUS AS gs ON gs._id = dm.status_id

		WHERE dm.slug = $1

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

			if (q.getParameter('type') === 'status') { $sq = DeliveryMethodQuery.search.status(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'title') { $sq = DeliveryMethodQuery.search.title(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = DeliveryMethodQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = DeliveryMethodQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT dm.title , dm.updated_on , dm.delivery_method_no AS num , dm.slug , gs.word AS status

			FROM DELIVERY_METHOD AS dm

			INNER JOIN STATUS AS gs ON gs._id = dm.status_id

			${joinResult} ${conditionResult}

			ORDER BY dm.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : DeliveryMethod) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO DELIVERY_METHOD (title , delivery_method_no , slug , user_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , (SELECT status_id AS _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													RETURNING delivery_method_id AS _id , title , slug

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

	public static update(slug : string , entry : DeliveryMethod) : DynamicQuery {

		let text : string = `UPDATE DELIVERY_METHOD 

													SET title = $1 , description = $2 , status_id = $3 , user_id = $4 , updated_on = $5

													WHERE slug = $6

													RETURNING delivery_method_id AS _id , title , slug

													`;

		let values : any[] = [entry.getName() , entry.getDescription() , entry.getStatus() , entry.getUserId() , 'NOW()' , slug];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT dm.slug , dm.title , gs.word AS status

		FROM DELIVERY_METHOD AS dm

		LEFT JOIN STATUS AS gs ON gs._id = dm.status_id

		WHERE dm.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM DELIVERY_METHOD

		WHERE slug = $1 

		RETURNING delivery_method_id AS _id , title , slug

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM DELIVERY_METHOD

		WHERE delivery_method_no IN (${entries})

		RETURNING delivery_method_id AS _id , title , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM DELIVERY_METHOD

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM DELIVERY_METHOD

		RETURNING delivery_method_id AS _id , title , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT title , true AS exists 

		FROM DELIVERY_METHOD

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT dm.title , dm.slug , dm.status_id AS status

		FROM DELIVERY_METHOD AS dm

		WHERE dm.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

}