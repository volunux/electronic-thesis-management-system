import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { EmailMessageTemplateSearch } from '../../helper/search/EmailMessageTemplateSearch';
import { EmailMessageTemplate } from '../../entity/EmailMessageTemplate';

export class EmailMessageTemplateQuery {

	private static search : EmailMessageTemplateSearch = EmailMessageTemplateSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT emt.email_message_template_id AS _id , emt.title , emt.message , emt.updated_on , emt.slug , emtyp.title AS message_type , gs.word AS status

		FROM EMAIL_MESSAGE_TEMPLATE AS emt

		LEFT JOIN STATUS AS gs ON gs._id = emt.status_id

		LEFT JOIN EMAIL_MESSAGE_TYPE AS emtyp ON emtyp.email_message_type_id = emt.email_message_type_id

		WHERE emt.slug = $1

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

			if (q.getParameter('type') === 'status') { $sq = EmailMessageTemplateQuery.search.status(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'title') { $sq = EmailMessageTemplateQuery.search.title(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'type') { $sq = EmailMessageTemplateQuery.search.messageType(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = EmailMessageTemplateQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = EmailMessageTemplateQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT emt.title , emt.message , emt.updated_on , emt.email_message_template_no AS num , emt.slug , emtyp.title AS message_type , gs.word AS status

			FROM EMAIL_MESSAGE_TEMPLATE AS emt

			INNER JOIN STATUS AS gs ON gs._id = emt.status_id

			INNER JOIN EMAIL_MESSAGE_TYPE AS emtyp ON emtyp.email_message_type_id = emt.email_message_type_id

			${joinResult} ${conditionResult}

			ORDER BY emt.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : EmailMessageTemplate) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO EMAIL_MESSAGE_TEMPLATE (title , message , email_message_type_id , email_message_template_no , slug , user_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , $6 , (SELECT status_id AS _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													RETURNING email_message_template_id AS _id , title , slug

												`;

		let values : any[] = [entry.getTitle() , entry.getMessage() , entry.getMessageType() , c , s , entry.getUserId()];

		return DynamicQuery.create(text , values);

	}

	public static relatedEntities() : DynamicQuery {

		let text : string = `

		SELECT json_build_object(

			'Status' , (SELECT json_agg(row_to_json(gs)) 

									FROM (SELECT status_id AS _id , word 

										FROM STATUS) AS gs ) ,

			'EmailMessageType' , (SELECT json_agg(row_to_json(emtyp)) 

									FROM (SELECT email_message_type_id AS _id , title

										FROM EMAIL_MESSAGE_TYPE) AS emtyp )

									) AS result
		`;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static update(slug : string , entry : EmailMessageTemplate) : DynamicQuery {

		let text : string = `UPDATE EMAIL_MESSAGE_TEMPLATE 

													SET title = $1 , message = $2 , email_message_type_id = $3 , status_id = $4 , user_id = $5 , updated_on = $7

													WHERE slug = $6

													RETURNING email_message_template_id AS _id , title , slug

												`;

		let values : any[] = [entry.getTitle() , entry.getMessage() , entry.getMessageType() , entry.getStatus() , entry.getUserId() , slug , 'NOW()'];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT emt.slug , emt.title , emtyp.title AS message_type , gs.word AS status

		FROM EMAIL_MESSAGE_TEMPLATE AS emt

		LEFT JOIN STATUS AS gs ON gs._id = emt.status_id

		LEFT JOIN EMAIL_MESSAGE_TYPE AS emtyp ON emtyp.email_message_type_id = emt.email_message_type_id

		WHERE emt.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM EMAIL_MESSAGE_TEMPLATE

		WHERE slug = $1 

		RETURNING email_message_template_id AS _id , title

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM EMAIL_MESSAGE_TEMPLATE

		WHERE email_message_template_no IN (${entries})

		RETURNING email_message_template_id AS _id , title

		`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM EMAIL_MESSAGE_TEMPLATE

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM EMAIL_MESSAGE_TEMPLATE

		RETURNING email_message_template_id AS _id , title

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT title , true AS exists 

		FROM EMAIL_MESSAGE_TEMPLATE

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT emt.title , emt.message , emt.email_message_type_id , emt.slug , emt.status_id AS status

		FROM EMAIL_MESSAGE_TEMPLATE AS emt

		WHERE emt.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

}