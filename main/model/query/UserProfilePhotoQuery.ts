import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { AttachmentSearch } from '../../helper/search/AttachmentSearch';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { UserProfilePhoto } from '../../entity/UserProfilePhoto';
import { DynamicQuery } from './util/DynamicQuery';

export class UserProfilePhotoQuery {

	private static search : AttachmentSearch = AttachmentSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

			SELECT upp._id , upp.location , upp.mimetype , upp.size , upp.updated_on , upp.slug , usr.first_name || ' ' || usr.last_name AS author_name , gs.word AS status

			FROM USER_PROFILE_PHOTO AS upp

			LEFT JOIN STATUS AS gs ON gs._id = upp.status_id

			INNER JOIN USERS AS usr ON usr.user_id = upp.user_id

			WHERE upp.slug = $1

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

			if (q.getParameter('type') === 'status') { $sq = UserProfilePhotoQuery.search.status(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'username') { $sq = UserProfilePhotoQuery.search.username(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'email_address') { $sq = UserProfilePhotoQuery.search.emailAddress(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = UserProfilePhotoQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = UserProfilePhotoQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT upp.location , upp.key , upp.mimetype , upp.size , upp._id AS num , upp.slug , usr.first_name || ' ' || usr.last_name AS author_name , gs.word AS status

			FROM USER_PROFILE_PHOTO AS upp

			INNER JOIN STATUS AS gs ON gs._id = upp.status_id

			INNER JOIN USERS AS usr ON usr.user_id = upp.user_id

			${joinResult} ${conditionResult}

			ORDER BY upp.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static addOne() : DynamicQuery {

		let text : string = ` `;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : UserProfilePhoto) : DynamicQuery {

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

	public static update(slug : string , entry : UserProfilePhoto) : DynamicQuery {

		let text : string = ` `;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

			SELECT upp.slug , upp.location , upp.size , usr.first_name || ' ' || usr.last_name AS author_name , gs.word AS status

			FROM USER_PROFILE_PHOTO AS upp

			LEFT JOIN STATUS AS gs ON gs._id = upp.status_id

			INNER JOIN USERS AS usr ON usr.user_id = upp.user_id

			WHERE upp.slug = $1

			LIMIT 1

			`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

			DELETE FROM USER_PROFILE_PHOTO

			WHERE slug = $1 

			RETURNING _id , key , location , size , mimetype , slug

			`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

			DELETE FROM USER_PROFILE_PHOTO

			WHERE _id IN (${entries})

			RETURNING _id , key , size , mimetype , slug

			`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

			SELECT slug FROM USER_PROFILE_PHOTO

			WHERE slug IS NOT NULL

			LIMIT 1

			`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

			DELETE FROM USER_PROFILE_PHOTO

			RETURNING _id , key , size , mimetype , slug

			`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT key , true AS exists 

		FROM USER_PROFILE_PHOTO

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

}