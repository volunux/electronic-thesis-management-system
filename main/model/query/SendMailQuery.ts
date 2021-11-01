import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { SendMailSearch } from '../../helper/search/SendMailSearch';
import { SendMail } from '../../entity/SendMail';

export class SendMailQuery {

	private static search : SendMailSearch = SendMailSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT sm.send_mail_id AS _id , sm.title , sm.is_delivered , sm.updated_on , sm.slug , sm.description , gs.word AS status

		FROM SEND_MAIL AS sm

		LEFT JOIN STATUS AS gs ON gs._id = sm.status_id

		WHERE sm.slug = $1

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

			if (q.getParameter('type') === 'status') { $sq = SendMailQuery.search.status(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'name') { $sq = SendMailQuery.search.label(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'word') { $sq = SendMailQuery.search.word(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = SendMailQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = SendMailQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT sm.name , sm.word , sm.updated_on , sm.send_mail_no AS num , sm.slug , gs.word AS status

			FROM SEND_MAIL AS sm

			INNER JOIN STATUS AS gs ON gs._id = sm.status_id

			${joinResult} ${conditionResult}

			ORDER BY sm.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : SendMail) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO SEND_MAIL (name , word , description , send_mail_no , slug , user_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , $6 , (SELECT status_id AS _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													RETURNING send_mail_id AS _id , name , word , slug

												`;

		let values : any[] = [entry.getTitle() , entry.getMessage() , entry.getEmailAddress() , c , s , entry.getUserId()];

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

	public static update(slug : string , entry : SendMail) : DynamicQuery {

		let text : string = `UPDATE SEND_MAIL 

													SET name = $1 , word = $2 , description = $3 , status_id = $4 , user_id = $5 , updated_on = $7

													WHERE slug = $6

													RETURNING send_mail_id AS _id , name , word , slug

												`;

		let values : any[] = [entry.getTitle() , entry.getMessage() , entry.getEmailAddress() , entry.getStatus() , entry.getUserId() , slug , 'NOW()'];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT sm.slug , sm.name , sm.word , gs.word AS status

		FROM SEND_MAIL AS sm

		LEFT JOIN STATUS AS gs ON gs._id = sm.status_id

		WHERE sm.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM SEND_MAIL

		WHERE slug = $1 

		RETURNING send_mail_id AS _id , name , word , slug

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM SEND_MAIL

		WHERE send_mail_no IN (${entries})

		RETURNING send_mail_id AS _id , name , word , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM SEND_MAIL

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM SEND_MAIL

		RETURNING send_mail_id AS _id , name , word , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT name , true AS exists 

		FROM SEND_MAIL

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT sm.name , sm.word , sm.description , sm.slug , sm.status_id AS status

		FROM SEND_MAIL AS sm

		WHERE sm.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

}