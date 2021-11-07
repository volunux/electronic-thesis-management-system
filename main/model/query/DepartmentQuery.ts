import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { DepartmentSearch } from '../../helper/search/DepartmentSearch';
import { Department } from '../../entity/Department';

export class DepartmentQuery {

	private static search : DepartmentSearch = DepartmentSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT dt._id , dt.name , dt.abbreviation , dt.updated_on , dt.slug , dt.description , ft.name AS faculty , gs.word AS status

		FROM DEPARTMENT AS dt

		LEFT JOIN STATUS AS gs ON gs._id = dt.status_id

		LEFT JOIN FACULTY AS ft ON ft._id = dt.faculty_id

		WHERE dt.slug = $1

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

			if (q.getParameter('type') === 'status') { $sq = DepartmentQuery.search.status(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'name') { $sq = DepartmentQuery.search.label(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'abbreviation') { $sq = DepartmentQuery.search.abbreviation(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = DepartmentQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = DepartmentQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

		SELECT dt.name , dt.abbreviation , dt.updated_on , dt._id AS num , dt.slug , gs.word AS status

		FROM DEPARTMENT AS dt

		INNER JOIN STATUS AS gs ON gs._id = dt.status_id

		${joinResult} ${conditionResult}

		ORDER BY dt.updated_on DESC

		LIMIT 11 OFFSET ${p}

		`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : Department) : DynamicQuery {

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO DEPARTMENT (name , abbreviation , description , faculty_id , slug , user_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , $6 , (SELECT _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													RETURNING _id , name , abbreviation , slug

												`;

		let values : any[] = [entry.getName() , entry.getAbbreviation() , entry.getDescription() , entry.getFaculty() , s , entry.getUserId()];

		return DynamicQuery.create(text , values);

	}

	public static relatedEntities() : DynamicQuery {

		let text : string = 

		`SELECT json_build_object(

			'Status' , (SELECT json_agg(row_to_json(gs)) 

									FROM (SELECT _id , word 

									FROM STATUS) AS gs ) ,

			'Faculty' , (SELECT json_agg(row_to_json(ft))

									FROM (SELECT _id , name

									FROM FACULTY) AS ft )

									) AS result

									`;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static update(slug : string , entry : Department) : DynamicQuery {

		let text : string = `UPDATE DEPARTMENT 

													SET name = $1 , abbreviation = $2 , description = $3 , faculty_id = $4 , status_id = $5 , user_id = $6 , updated_on = $7

													WHERE slug = $8

													RETURNING _id , name , abbreviation , slug

												`;

		let values : any[] = [entry.getName() , entry.getAbbreviation() , entry.getDescription() , entry.getFaculty() , entry.getStatus() , entry.getUserId() , 'NOW()' , slug];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT dt.slug , dt.name , dt.abbreviation , ft.name AS faculty , gs.word AS status

		FROM DEPARTMENT AS dt

		LEFT JOIN STATUS AS gs ON gs._id = dt.status_id

		LEFT JOIN FACULTY AS ft ON ft._id = dt.faculty_id

		WHERE dt.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM DEPARTMENT

		WHERE slug = $1 

		RETURNING _id , name , abbreviation , slug

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM DEPARTMENT

		WHERE _id IN (${entries})

		RETURNING _id , name , abbreviation , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM DEPARTMENT

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM DEPARTMENT

		RETURNING _id , name , abbreviation , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT name , true AS exists 

		FROM DEPARTMENT

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT dt.name , dt.abbreviation , dt.description , dt.slug , dt.faculty_id AS faculty , dt.status_id AS status

		FROM DEPARTMENT AS dt

		WHERE dt.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

}