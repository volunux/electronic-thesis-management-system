import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { CountrySearch } from '../../helper/search/CountrySearch';
import { Country } from '../../entity/Country';

export class CountryQuery {

	private static search : CountrySearch = CountrySearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT ct._id , ct.name , ct.abbreviation , ct.updated_on , ct.slug , ct.description , gs.word AS status

		FROM COUNTRY AS ct

		LEFT JOIN STATUS AS gs ON gs._id = ct.status_id

		WHERE ct.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static findAll(q : EntityQueryConfig) : DynamicQuery {

		let $sq : SearchQueryOptions = new SearchQueryOptions();

		let p : number = +(<string>q.getParameter('page'));

		if (q !== null && q !== undefined) {

			p = p > 0 ? p * 10 : 0;

			if (q.getParameter('type') === 'status') { $sq = CountryQuery.search.status(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'name') { $sq = CountryQuery.search.label(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'abbreviation') { $sq = CountryQuery.search.abbreviation(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = CountryQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = CountryQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT ct.name , ct.abbreviation , ct.updated_on , ct._id AS num , ct.slug , gs.word AS status

			FROM COUNTRY AS ct

			INNER JOIN STATUS AS gs ON gs._id = ct.status_id

			${joinResult} ${conditionResult}

			ORDER BY ct.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : Country) : DynamicQuery {

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO COUNTRY (name , abbreviation , description , slug , user_id , status_id)

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

	public static update(slug : string , entry : Country) : DynamicQuery {

		let text : string = `UPDATE COUNTRY 

													SET name = $1 , abbreviation = $2 , description = $3 , status_id = $4 , user_id = $5 , updated_on = $6

													WHERE slug = $7

													RETURNING _id , name , abbreviation , slug

													`;

		let values : any[] = [entry.getName() , entry.getAbbreviation() , entry.getDescription() , entry.getStatus() , entry.getUserId() , 'NOW()' , slug];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT ct.slug , ct.name , ct.abbreviation , gs.word AS status

		FROM COUNTRY AS ct

		LEFT JOIN STATUS AS gs ON gs._id = ct.status_id

		WHERE ct.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM COUNTRY

		WHERE slug = $1 

		RETURNING _id , name , abbreviation , slug

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM COUNTRY

		WHERE _id IN (${entries})

		RETURNING _id , name , abbreviation , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM COUNTRY

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM COUNTRY

		RETURNING _id , name , abbreviation , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT name , true AS exists 

		FROM COUNTRY

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT ct.name , ct.abbreviation , ct.description , ct.slug , ct.status_id AS status

		FROM COUNTRY AS ct

		WHERE ct.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

}