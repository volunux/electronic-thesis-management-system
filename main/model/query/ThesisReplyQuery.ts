import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { ThesisReplySearch } from '../../helper/search/ThesisReplySearch';
import { ThesisReply } from '../../entity/ThesisReply';

export class ThesisReplyQuery {

	private static search : ThesisReplySearch = ThesisReplySearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

			SELECT thrpl.thesis_reply_id AS _id , thrpl.text , thrpl.comment_author_name , thrpl.comment_id AS review_id , thrpl.updated_on , thrpl.slug , thrpl.description , gs.word AS status

			FROM THESIS_REPLY AS thrpl

			LEFT JOIN STATUS AS gs ON gs._id = thrpl.status_id

			WHERE thrpl.slug = $1

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

			if (q.getParameter('type') === 'status') { $sq = ThesisReplyQuery.search.status(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = ThesisReplyQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = ThesisReplyQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT thrpl.text , thrpl.updated_on , thrpl.thesis_reply_no AS num , thrpl.slug , gs.word AS status

			FROM THESIS_REPLY AS thrpl

			INNER JOIN STATUS AS gs ON gs._id = thrpl.status_id

			${joinResult} ${conditionResult}

			ORDER BY thrpl.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : ThesisReply) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO THESIS_REPLY (text , comment_author_name , thesis_reply_no , slug , user_id , comment_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , $6 , (SELECT status_id AS _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													RETURNING thesis_reply_id AS _id , slug

												`;

		let values : any[] = [entry.getText() , entry.getCommentAuthorName() , c , s , entry.getUserId() , entry.getReviewId()];

		return DynamicQuery.create(text , values);

	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT thrpl.text , thrpl.comment_author_name , thrpl.slug , thrpl.status_id AS status

		FROM THESIS_REPLY AS thrpl

		WHERE thrpl.slug = $1

		LIMIT 1) AS et)

		) AS result

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static relatedEntities() : DynamicQuery {

		let text : string = `

			SELECT json_build_object(

			'Status' , (SELECT json_agg(row_to_json(gs)) 

									FROM (SELECT status_id AS _id , word 

									FROM STATUS) AS gs )

									) AS result

		`;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static update(slug : string , entry : ThesisReply) : DynamicQuery {

		let text : string = `UPDATE THESIS_REPLY 

													SET text = $1 , comment_author_name = $2 , status_id = $3 , user_id = $4

													WHERE slug = $5

													RETURNING text , slug

												`;

		let values : any[] = [entry.getText() , entry.getCommentAuthorName() , entry.getStatus() , entry.getUserId() , slug];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT thrpl.slug , thrpl.text , thrpl.comment_author_name , gs.word AS status

		FROM THESIS_REPLY AS thrpl

		LEFT JOIN STATUS AS gs ON gs._id = thrpl.status_id

		WHERE thrpl.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM THESIS_REPLY

		WHERE slug = $1 

		RETURNING text , slug

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM THESIS_REPLY

		WHERE thesis_reply_no IN (${entries})

		RETURNING thesis_reply_id AS _id , text , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM THESIS_REPLY

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM THESIS_REPLY

		RETURNING thesis_reply_id AS _id , text , comment_author_name , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT comment_author_name , true AS exists 

		FROM THESIS_REPLY

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , []);

	}

}