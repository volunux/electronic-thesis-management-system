import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { RoleSearch } from '../../helper/search/RoleSearch';
import { Role } from '../../entity/Role';

export class RoleQuery {

	private static search : RoleSearch = RoleSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT rl._id , rl.name , rl.word , rl.updated_on , rl.slug , rl.description , gs.word AS status

		FROM ROLE AS rl

		LEFT JOIN STATUS AS gs ON gs._id = rl.status_id

		WHERE rl.slug = $1

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

			if (q.getParameter('type') === 'status') { $sq = RoleQuery.search.status(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'name') { $sq = RoleQuery.search.label(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'word') { $sq = RoleQuery.search.word(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = RoleQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = RoleQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT rl.name , rl.word , rl.updated_on , rl._id AS num , rl.slug , gs.word AS status

			FROM ROLE AS rl

			INNER JOIN STATUS AS gs ON gs._id = rl.status_id

			${joinResult} ${conditionResult}

			ORDER BY rl.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : Role) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO ROLE (name , word , description , slug , user_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , (SELECT status_id AS _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													RETURNING _id , name , word , slug

												`;

		let values : any[] = [entry.getName() , entry.getWord() , entry.getDescription() , s , entry.getUserId()];

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

	public static update(slug : string , entry : Role) : DynamicQuery {

		let text : string = `UPDATE ROLE 

													SET name = $1 , word = $2 , description = $3 , status_id = $4 , user_id = $5 , updated_on = $7

													WHERE slug = $6

													RETURNING _id , name , word , slug

												`;

		let values : any[] = [entry.getName() , entry.getWord() , entry.getDescription() , entry.getStatus() , entry.getUserId() , slug , 'NOW()'];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT rl.slug , rl.name , rl.word , gs.word AS status

		FROM ROLE AS rl

		LEFT JOIN STATUS AS gs ON gs._id = rl.status_id

		WHERE rl.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM ROLE

		WHERE slug = $1 

		RETURNING _id , name , word , slug

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM ROLE

		WHERE _id IN (${entries})

		RETURNING _id , name , word , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM ROLE

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM ROLE

		RETURNING _id , name , word , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT name , true AS exists 

		FROM ROLE

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT rl.name , rl.word , rl.description , rl.slug , rl.status_id AS status

		FROM ROLE AS rl

		WHERE rl.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

}