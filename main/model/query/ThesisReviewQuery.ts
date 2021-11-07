import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { ThesisReviewSearch } from '../../helper/search/ThesisReviewSearch';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { ThesisReview } from '../../entity/ThesisReview';
import { DynamicQuery } from './util/DynamicQuery';

export class ThesisReviewQuery {

	private static search : ThesisReviewSearch = ThesisReviewSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

			SELECT threv._id , threv.text , threv.updated_on , threv.slug , threv.description , gs.word AS status

			FROM THESIS_REVIEW AS threv

			LEFT JOIN STATUS AS gs ON gs._id = threv.status_id

			WHERE threv.slug = $1

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

			if (q.getParameter('type') === 'status') { $sq = ThesisReviewQuery.search.status(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = ThesisReviewQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = ThesisReviewQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT threv.text , threv.updated_on , threv._id AS num , threv.slug , gs.word AS status

			FROM THESIS_REVIEW AS threv

			INNER JOIN STATUS AS gs ON gs._id = threv.status_id

			${joinResult} ${conditionResult}

			ORDER BY threv.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : ThesisReview) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO THESIS_REVIEW (text , slug , user_id , status_id)

													VALUES ($1 , $2 , $3 , (SELECT _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													RETURNING _id , slug

												`;

		let values : any[] = [entry.getText() , s , entry.getUserId()];

		return DynamicQuery.create(text , values);

	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

			SELECT threv.text , threv.slug , threv.status_id AS status

			FROM THESIS_REVIEW AS threv

			WHERE threv.slug = $1

			LIMIT 1

			`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static relatedEntities() : DynamicQuery {

		let text : string = `SELECT json_build_object(

			'Status' , (SELECT json_agg(row_to_json(gs)) 

									FROM (SELECT _id , word 

									FROM STATUS) AS gs )

		) AS result`;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static update(slug : string , entry : ThesisReview) : DynamicQuery {

		let text : string = `UPDATE THESIS_REVIEW 

													SET text = $1 , status_id = $2 , user_id = $3

													WHERE slug = $4

													RETURNING text , slug

												`;

		let values : any[] = [entry.getText() , entry.getStatus() , entry.getUserId() , slug];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT threv.slug , threv.text , gs.word AS status

		FROM THESIS_REVIEW AS threv

		LEFT JOIN STATUS AS gs ON gs._id = threv.status_id

		WHERE threv.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM THESIS_REVIEW

		WHERE slug = $1 

		RETURNING text , slug

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM THESIS_REVIEW

		WHERE _id IN (${entries})

		RETURNING _id , text , word , slug

		`;

		return DynamicQuery.create(text , []);
	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM THESIS_REVIEW

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM THESIS_REVIEW

		RETURNING _id , text , word , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT text , true AS exists 

		FROM THESIS_REVIEW

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , []);

	}

}