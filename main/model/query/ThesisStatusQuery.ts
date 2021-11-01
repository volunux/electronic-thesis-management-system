import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { ThesisStatusSearch } from '../../helper/search/ThesisStatusSearch';
import { ThesisStatus } from '../../entity/ThesisStatus';

export class ThesisStatusQuery {

	private static search : ThesisStatusSearch = ThesisStatusSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT ths._id , ths.name , ths.word , ths.updated_on , ths.slug , ths.description

		FROM THESIS_STATUS AS ths

		WHERE ths.slug = $1

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

			if (q.getParameter('type') === 'name') { $sq = ThesisStatusQuery.search.label(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'word') { $sq = ThesisStatusQuery.search.word(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = ThesisStatusQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = ThesisStatusQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT ths.name , ths.word , ths.updated_on , ths._id AS num , ths.slug

			FROM THESIS_STATUS AS ths

			${joinResult} ${conditionResult}

			ORDER BY ths.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : ThesisStatus) : DynamicQuery {

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO THESIS_STATUS (name , word , description , slug , user_id)

													VALUES ($1 , $2 , $3 , $4 , $5)

													RETURNING _id , name , word , slug

												`;

		let values : any[] = [entry.getName() , entry.getWord() , entry.getDescription() , s , entry.getUserId()];

		return DynamicQuery.create(text , values);

	}

	public static relatedEntities() : DynamicQuery {

		let text : string = `NOW() `;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static update(slug : string , entry : ThesisStatus) : DynamicQuery {

		let text : string = `UPDATE THESIS_STATUS 

													SET name = $1 , word = $2 , description = $3 , user_id = $4 , updated_on = $5

													WHERE slug = $6

													RETURNING _id , name , word , slug

												`;

		let values : any[] = [entry.getName() , entry.getWord() , entry.getDescription() , entry.getUserId() , 'NOW()' , slug];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT ths.slug , ths.name , ths.word

		FROM THESIS_STATUS AS ths

		WHERE ths.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM THESIS_STATUS

		WHERE slug = $1 

		RETURNING _id , name , word , slug

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM THESIS_STATUS

		WHERE _id IN (${entries})

		RETURNING _id , name , word , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM THESIS_STATUS

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM THESIS_STATUS

		RETURNING _id , name , word , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT name , true AS exists 

		FROM THESIS_STATUS

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT ths.name , ths.word , ths.description , ths.slug , ths._id AS status

		FROM THESIS_STATUS AS ths

		WHERE ths.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

}