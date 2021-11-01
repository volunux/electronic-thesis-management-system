import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { FacultySearch } from '../../helper/search/FacultySearch';
import { Faculty } from '../../entity/Faculty';

export class FacultyQuery {

	private static search : FacultySearch = FacultySearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT ft._id , ft.name , ft.abbreviation , ft.updated_on , ft.slug , ft.description , gs.word AS status

		FROM FACULTY AS ft

		LEFT JOIN STATUS AS gs ON gs._id = ft.status_id

		WHERE ft.slug = $1

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

			if (q.getParameter('type') === 'status') { $sq = FacultyQuery.search.status(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'name') { $sq = FacultyQuery.search.label(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'abbreviation') { $sq = FacultyQuery.search.abbreviation(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = FacultyQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = FacultyQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

		SELECT ft.name , ft.abbreviation , ft.updated_on , ft._id AS num , ft.slug , gs.word AS status

		FROM FACULTY AS ft

		INNER JOIN STATUS AS gs ON gs._id = ft.status_id

		${joinResult} ${conditionResult}

		ORDER BY ft.updated_on DESC

		LIMIT 11 OFFSET ${p}

		`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : Faculty) : DynamicQuery {

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO FACULTY (name , abbreviation , description , slug , user_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , (SELECT status_id AS _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													RETURNING _id , name , abbreviation , slug

												`;

		let values : any[] = [entry.getName() , entry.getAbbreviation() , entry.getDescription() , s , entry.getUserId()];

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

	public static update(slug : string , entry : Faculty) : DynamicQuery {

		let text : string = `UPDATE FACULTY 

													SET name = $1 , abbreviation = $2 , description = $3 , status_id = $4 , user_id = $5 , updated_on = $6

													WHERE slug = $7

													RETURNING _id , name , abbreviation , slug

												`;

		let values : any[] = [entry.getName() , entry.getAbbreviation() , entry.getDescription() , entry.getStatus() , entry.getUserId() , 'NOW()' , slug];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT ft.slug , ft.name , ft.abbreviation , gs.word AS status

		FROM FACULTY AS ft

		LEFT JOIN STATUS AS gs ON gs._id = ft.status_id

		WHERE ft.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM FACULTY

		WHERE slug = $1 

		RETURNING _id , name , abbreviation , slug

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM FACULTY

		WHERE _id IN (${entries})

		RETURNING _id , name , abbreviation , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM FACULTY

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM FACULTY

		RETURNING _id , name , abbreviation , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT name , true AS exists 

		FROM FACULTY

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT ft.name , ft.abbreviation , ft.description , ft.slug , ft.status_id AS status

		FROM FACULTY AS ft

		WHERE ft.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

}