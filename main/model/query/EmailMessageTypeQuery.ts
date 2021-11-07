import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { EmailMessageTypeSearch } from '../../helper/search/EmailMessageTypeSearch';
import { EmailMessageType } from '../../entity/EmailMessageType';

export class EmailMessageTypeQuery {

	private static search : EmailMessageTypeSearch = EmailMessageTypeSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT emt._id , emt.title , emt.description , emt.updated_on , emt.slug , gs.word AS status

		FROM EMAIL_MESSAGE_TYPE AS emt

		LEFT JOIN STATUS AS gs ON gs._id = emt.status_id

		WHERE emt.slug = $1

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

			if (q.getParameter('type') === 'status') { $sq = EmailMessageTypeQuery.search.status(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'title') { $sq = EmailMessageTypeQuery.search.title(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = EmailMessageTypeQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = EmailMessageTypeQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT emt.title , emt.updated_on , emt._id AS num , emt.slug , gs.word AS status

			FROM EMAIL_MESSAGE_TYPE AS emt

			INNER JOIN STATUS AS gs ON gs._id = emt.status_id

			${joinResult} ${conditionResult}

			ORDER BY emt.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : EmailMessageType) : DynamicQuery {

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO EMAIL_MESSAGE_TYPE (title , description , slug , user_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , (SELECT _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													RETURNING _id , title , slug

												`;

		let values : any[] = [entry.getTitle() , entry.getDescription() , s , entry.getUserId()];

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

	public static update(slug : string , entry : EmailMessageType) : DynamicQuery {

		let text : string = `UPDATE EMAIL_MESSAGE_TYPE 

													SET title = $1 , description = $2 , status_id = $3 , user_id = $4 , updated_on = $6

													WHERE slug = $5

													RETURNING _id , title , description , slug

												`;

		let values : any[] = [entry.getTitle() , entry.getDescription() , entry.getStatus() , entry.getUserId() , slug , 'NOW()'];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT emt.slug , emt.title , emt.description , gs.word AS status

		FROM EMAIL_MESSAGE_TYPE AS emt

		LEFT JOIN STATUS AS gs ON gs._id = emt.status_id

		WHERE emt.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM EMAIL_MESSAGE_TYPE

		WHERE slug = $1 

		RETURNING _id , title

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM EMAIL_MESSAGE_TYPE

		WHERE _id IN (${entries})

		RETURNING _id , title

		`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM EMAIL_MESSAGE_TYPE

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM EMAIL_MESSAGE_TYPE

		RETURNING _id , title

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT title , true AS exists 

		FROM EMAIL_MESSAGE_TYPE

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT emt.title , emt.description , emt.slug , emt.status_id AS status

		FROM EMAIL_MESSAGE_TYPE AS emt

		WHERE emt.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

}