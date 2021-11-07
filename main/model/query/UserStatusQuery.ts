import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { UserStatusSearch } from '../../helper/search/UserStatusSearch';
import { UserStatus } from '../../entity/UserStatus';

export class UserStatusQuery {

	private static search : UserStatusSearch = UserStatusSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT us._id , us.name , us.word , us.updated_on , us.slug , us.description

		FROM USER_STATUS AS us

		WHERE us.slug = $1

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

			if (q.getParameter('type') === 'name') { $sq = UserStatusQuery.search.label(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'word') { $sq = UserStatusQuery.search.word(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = UserStatusQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = UserStatusQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

		SELECT us.name , us.word , us.updated_on , us._id AS num , us.slug

		FROM USER_STATUS AS us

		${joinResult} ${conditionResult}

		ORDER BY us.updated_on DESC

		LIMIT 11 OFFSET ${p}

		`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : UserStatus) : DynamicQuery {

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO USER_STATUS (name , word , description , slug , user_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , $6)

													RETURNING _id , name , word , slug

												`;

		let values : any[] = [entry.getName() , entry.getWord() , entry.getDescription() , s , entry.getUserId()];

		return DynamicQuery.create(text , values);

	}

	public static relatedEntities() : DynamicQuery {

		let text : string = `NOW()`;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static update(slug : string , entry : UserStatus) : DynamicQuery {

		let text : string = `UPDATE USER_STATUS 

													SET name = $1 , word = $2 , description = $3 , user_id = $4 , updated_on = $5

													WHERE slug = $6

													RETURNING _id , name , word , slug

												`;

		let values : any[] = [entry.getName() , entry.getWord() , entry.getDescription() , entry.getUserId() , 'NOW()' , slug];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT us.slug , us.name , us.word

		FROM USER_STATUS AS us

		WHERE us.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM USER_STATUS

		WHERE slug = $1 

		RETURNING _id , name , word , slug

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM USER_STATUS

		WHERE _id IN (${entries})

		RETURNING _id , name , word , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM USER_STATUS

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM USER_STATUS

		RETURNING _id , name , word , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT name , true AS exists 

		FROM USER_STATUS

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT us.name , us.word , us.description , us.slug , us._id AS status

		FROM USER_STATUS AS us

		WHERE us.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

}