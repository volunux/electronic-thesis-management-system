import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { AttachmentSearch } from '../../helper/search/AttachmentSearch';
import { UserSignature } from '../../entity/UserSignature';

export class UserSignatureQuery {

	private static search : AttachmentSearch = AttachmentSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

			SELECT usig._id , usig.location , usig.mimetype , usig.size , usig.updated_on , usig.slug , usr.first_name || ' ' || usr.last_name AS author_name , gs.word AS status

			FROM USER_SIGNATURE AS usig

			LEFT JOIN STATUS AS gs ON gs._id = usig.status_id

			INNER JOIN USERS AS usr ON usr.user_id = usig.user_id

			WHERE usig.slug = $1

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

			if (q.getParameter('type') === 'status') { $sq = UserSignatureQuery.search.status(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'username') { $sq = UserSignatureQuery.search.username(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'email_address') { $sq = UserSignatureQuery.search.emailAddress(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = UserSignatureQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = UserSignatureQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT usig.location , usig.key , usig.mimetype , usig.size , usig._id AS num , usig.slug , usr.first_name || ' ' || usr.last_name AS author_name , gs.word AS status

			FROM USER_SIGNATURE AS usig

			INNER JOIN STATUS AS gs ON gs._id = usig.status_id

			INNER JOIN USERS AS usr ON usr.user_id = usig.user_id

			${joinResult} ${conditionResult}

			ORDER BY usig.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static addOne() : DynamicQuery {

		let text : string = ` `;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : UserSignature) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = ` `;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = ` `;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static updateII(slug : string) : DynamicQuery {

		let text : string = ``;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static update(slug : string , entry : UserSignature) : DynamicQuery {

		let text : string = ` `;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

			SELECT usig.slug , usig.location , usig.size , usr.first_name || ' ' || usr.last_name AS author_name , gs.word AS status

			FROM USER_SIGNATURE AS usig

			LEFT JOIN STATUS AS gs ON gs._id = usig.status_id

			INNER JOIN USERS AS usr ON usr.user_id = usig.user_id

			WHERE usig.slug = $1

			LIMIT 1

			`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

			DELETE FROM USER_SIGNATURE

			WHERE slug = $1 

			RETURNING _id , key , location , size , mimetype , slug

			`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

			DELETE FROM USER_SIGNATURE

			WHERE _id IN (${entries})

			RETURNING _id , key , size , mimetype , slug

			`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

			SELECT slug FROM USER_SIGNATURE

			WHERE slug IS NOT NULL

			LIMIT 1

			`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

			DELETE FROM USER_SIGNATURE

			RETURNING _id , key , size , mimetype , slug

			`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT key , true AS exists 

		FROM USER_SIGNATURE

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

}