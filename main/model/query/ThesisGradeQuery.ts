import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { ThesisGradeSearch } from '../../helper/search/ThesisGradeSearch';
import { ThesisGrade } from '../../entity/ThesisGrade';

export class ThesisGradeQuery {

	private static search : ThesisGradeSearch = ThesisGradeSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT thgrd._id , thgrd.name , thgrd.word , thgrd.updated_on , thgrd.slug , thgrd.description , gs.word AS status

		FROM THESIS_GRADE AS thgrd

		LEFT JOIN STATUS AS gs ON gs._id = thgrd.status_id

		WHERE thgrd.slug = $1

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

			if (q.getParameter('type') === 'status') { $sq = ThesisGradeQuery.search.status(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'name') { $sq = ThesisGradeQuery.search.label(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'word') { $sq = ThesisGradeQuery.search.word(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = ThesisGradeQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = ThesisGradeQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT thgrd.name , thgrd.word , thgrd.updated_on , thgrd._id AS num , thgrd.slug , gs.word AS status

			FROM THESIS_GRADE AS thgrd

			INNER JOIN STATUS AS gs ON gs._id = thgrd.status_id

			${joinResult} ${conditionResult}

			ORDER BY thgrd.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : ThesisGrade) : DynamicQuery {

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO THESIS_GRADE (name , word , description , slug , user_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , (SELECT _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

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

	public static update(slug : string , entry : ThesisGrade) : DynamicQuery {

		let text : string = `UPDATE THESIS_GRADE 

													SET name = $1 , word = $2 , description = $3 , status_id = $4 , user_id = $5 , updated_on = $6

													WHERE slug = $7

													RETURNING _id , name , word , slug

												`;

		let values : any[] = [entry.getName() , entry.getWord() , entry.getDescription() , entry.getStatus() , entry.getUserId() , 'NOW()' , slug];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT thgrd.slug , thgrd.name , thgrd.word , gs.word AS status

		FROM THESIS_GRADE AS thgrd

		LEFT JOIN STATUS AS gs ON gs._id = thgrd.status_id

		WHERE thgrd.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM THESIS_GRADE

		WHERE slug = $1 

		RETURNING _id , name , word , slug

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM THESIS_GRADE

		WHERE _id IN (${entries})

		RETURNING _id , name , word , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM THESIS_GRADE

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM THESIS_GRADE

		RETURNING _id , name , word , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT name , true AS exists 

		FROM THESIS_GRADE

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT thgrd.name , thgrd.word , thgrd.description , thgrd.slug , thgrd.status_id AS status

		FROM THESIS_GRADE AS thgrd

		WHERE thgrd.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

}