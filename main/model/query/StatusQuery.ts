import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { StatusSearch } from '../../helper/search/StatusSearch';
import { Status } from '../../entity/Status';

export class StatusQuery {

	private static search : StatusSearch = StatusSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT gs._id , gs.name , gs.word , gs.updated_on , gs.slug , gs.description

		FROM STATUS AS gs

		WHERE gs.slug = $1

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

			if (q.getParameter('type') === 'word') { $sq = StatusQuery.search.word(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = StatusQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = StatusQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT gs.name , gs.word , gs.updated_on , gs._id AS num , gs.slug

			FROM STATUS AS gs

			${joinResult} ${conditionResult}

			ORDER BY gs.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : Status) : DynamicQuery {

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO STATUS (name , word , description , slug , user_id)

													VALUES ($1 , $2 , $3 , $4 , $5)

													RETURNING _id , name , word , slug

													`;

		let values : any[] = [entry.getName() , entry.getWord() , entry.getDescription() , s , entry.getUserId()];

		return DynamicQuery.create(text , values);

	}

	public static relatedEntities() : DynamicQuery {

		let text : string = `NOW()`;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static update(slug : string , entry : Status) : DynamicQuery {

		let text : string = `UPDATE STATUS 

													SET name = $1 , word = $2 , description = $3 , user_id = $4 , updated_on = $6

													WHERE slug = $5

													RETURNING _id , name , word , slug

													`;

		let values : any[] = [entry.getName() , entry.getWord() , entry.getDescription() , entry.getUserId() , slug , 'NOW()'];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT gs.slug , gs.name , gs.word

		FROM STATUS AS gs

		WHERE gs.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM STATUS

		WHERE slug = $1 

		RETURNING _id , name , word , slug

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM STATUS

		WHERE _id IN (${entries})

		RETURNING _id , name , word , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM STATUS

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM STATUS

		RETURNING _id , name , word , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT name , true AS exists 

		FROM STATUS

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT gs.name , gs.word , gs.description , gs.slug , gs._id AS status

		FROM STATUS AS gs

		WHERE gs.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

}