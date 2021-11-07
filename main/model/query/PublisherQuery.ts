import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { PublisherSearch } from '../../helper/search/PublisherSearch';
import { Publisher } from '../../entity/Publisher';

export class PublisherQuery {

	private static search : PublisherSearch = PublisherSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT pub._id , pub.name , pub.updated_on , pub.slug , gs.word AS status

		FROM PUBLISHER AS pub

		LEFT JOIN STATUS AS gs ON gs._id = pub.status_id

		WHERE pub.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static findAll(q : EntityQueryConfig) : DynamicQuery {

		let $sq : SearchQueryOptions = new SearchQueryOptions();

		let p : number = +(<string>q.getParameter('page'));

		if (q !== null && q !== undefined) { 
			
		p = p > 0 ? (p - 1) * 10 : 0;

			if (q.getParameter('type') === 'status') { $sq = PublisherQuery.search.status(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'name') { $sq = PublisherQuery.search.label(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = PublisherQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = PublisherQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT pub.name , pub.updated_on , pub._id AS num , pub.slug , gs.word AS status

			FROM PUBLISHER AS pub

			INNER JOIN STATUS AS gs ON gs._id = pub.status_id

			${joinResult} ${conditionResult}

			ORDER BY pub.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : Publisher) : DynamicQuery {

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO PUBLISHER (name , slug , user_id , status_id)

													VALUES ($1 , $2 , $3 , (SELECT _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													RETURNING _id , name , slug

												`;

		let values : any[] = [entry.getName() , s , entry.getUserId()];

		return DynamicQuery.create(text , values);

	}

	public static relatedEntities() : DynamicQuery {

		let text : string = `

		SELECT json_build_object(

			'Status' , (SELECT json_agg(row_to_json(gs)) 

									FROM (SELECT _id , word 

										FROM STATUS) AS gs )

									) AS result

		`;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static update(slug : string , entry : Publisher) : DynamicQuery {

		let text : string = `UPDATE PUBLISHER 

													SET name = $1 , status_id = $2 , user_id = $3 , updated_on = $5

													WHERE slug = $4

													RETURNING _id , name , slug

													`;

		let values : any[] = [entry.getName() , entry.getStatus() , entry.getUserId() , slug , 'NOW()'];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT pub.slug , pub.name , gs.word AS status

		FROM PUBLISHER AS pub

		LEFT JOIN STATUS AS gs ON gs._id = pub.status_id

		WHERE pub.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM PUBLISHER

		WHERE slug = $1 

		RETURNING _id , name , slug

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM PUBLISHER

		WHERE _id IN (${entries})

		RETURNING _id , name , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM PUBLISHER

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM PUBLISHER

		RETURNING _id , name , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT name , true AS exists 

		FROM PUBLISHER

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT pub.name , pub.slug , pub.status_id AS status

		FROM PUBLISHER AS pub

		WHERE pub.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

}