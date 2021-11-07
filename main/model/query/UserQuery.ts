import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { UserSearch } from '../../helper/search/UserSearch';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { User } from '../../entity/User';
import { DynamicQuery } from './util/DynamicQuery';

export class UserQuery {

	private static search : UserSearch = UserSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT usr._id , usr.first_name , usr.last_name , usr.username , usr.email_address ,

		usr.about , usr.matriculation_number , usr.updated_on , usr.created_on , dt.name AS department , ft.name AS faculty ,

		ct.name AS country , ll.name AS level , us.word AS status , upp.location AS profile_photo , usig.location AS signature ,

		(SELECT json_agg(row_to_json(rl))

			FROM (SELECT rl.word AS name

			FROM USER_ROLE AS usrrl
	
			LEFT JOIN ROLE AS rl ON rl._id = usrrl.role_id

			WHERE usrrl.user_id = usr._id) AS rl) AS role 

		FROM USERS AS usr

		LEFT JOIN DEPARTMENT AS dt ON dt._id = usr.department_id

		LEFT JOIN FACULTY AS ft ON ft._id = usr.faculty_id

		LEFT JOIN COUNTRY AS ct ON ct._id = usr.country_id

		LEFT JOIN LEVEL AS ll ON ll._id = usr.level_id 

		LEFT JOIN USER_PROFILE_PHOTO AS upp ON upp.user_id = usr._id

		LEFT JOIN USER_SIGNATURE AS usig ON usig.user_id = usr._id

		LEFT JOIN USER_STATUS AS us ON us._id = usr.user_status_id

		WHERE usr.slug = $1

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

			if (q.getParameter('type') === 'status') { $sq = UserQuery.search.status(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'email_address') { $sq = UserQuery.search.emailAddress(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'matriculation_number') { $sq = UserQuery.search.matriculationNumber(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = UserQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = UserQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT usr._id , usr.slug , usr.first_name , usr.last_name , usr._id AS num , usr.email_address , usr.updated_on ,

			dt.name AS department , ft.name AS faculty , ll.name AS level , us.word AS status

			FROM USERS AS usr

			INNER JOIN DEPARTMENT AS dt ON dt._id = usr.department_id

			INNER JOIN FACULTY AS ft ON ft._id = usr.faculty_id

			INNER JOIN LEVEL AS ll ON ll._id = usr.level_id

			INNER JOIN USER_STATUS AS us ON us._id = usr.user_status_id

			${joinResult} ${conditionResult}

			ORDER BY usr.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static save(user : User) : DynamicQuery {

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO USERS (first_name , last_name , email_address , username , about , matriculation_number , department_id , 

																						faculty_id , level_id , country_id , slug , salt , hash , user_status_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12 , $13 , 

																(SELECT us._id FROM USER_STATUS AS us WHERE us.word = 'Active' LIMIT 1))

													RETURNING _id , first_name , last_name , email_address , username , slug`;

		let values : any[] = [user.getFirstName() , user.getLastName() , user.getEmailAddress() , user.getUsername() , user.getAbout() , user.getMatriculationNumber() , user.getDepartment() , user.getFaculty() ,

													user.getLevel() , user.getCountry() , s , user.getSalt() , user.getHash()];

		return DynamicQuery.create(text , values);

	}

	public static relatedEntities() : DynamicQuery {

		let text : string = `

		SELECT json_build_object(

			'Level' , (SELECT json_agg(row_to_json(ll)) 

									FROM (SELECT _id , name

										FROM LEVEL) AS ll ) ,

			'Country' , (SELECT json_agg(row_to_json(ct)) 

										FROM (SELECT _id , name 

											FROM COUNTRY) AS ct ) ,

			'Faculty' , (SELECT json_agg(row_to_json(ft)) 

										FROM (SELECT _id , name 

											FROM FACULTY) AS ft ) ,

			'Department' , (SELECT json_agg(row_to_json(dt)) 

											FROM (SELECT _id , name 

												FROM DEPARTMENT) AS dt ) ,

			'UserStatus' , (SELECT json_agg(row_to_json(us)) 

											FROM (SELECT _id , word 

												FROM USER_STATUS) AS us )

			) AS result

			`;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static update(slug : string , entry : User) : DynamicQuery {

		let text : string = `UPDATE USERS 

													SET first_name = $1 , last_name = $2 , about = $3 , matriculation_number = $4 , department_id = $5 , 

													faculty_id = $6 , level_id = $7 , country_id = $8 , user_status_id = $9 , updated_on = $11

													WHERE slug = $10

													RETURNING _id , first_name , last_name , email_address , username , slug

												`;

		let values : any[] = [entry.getFirstName() , entry.getLastName() , entry.getAbout() , entry.getMatriculationNumber() , entry.getDepartment() , entry.getFaculty() , 

													entry.getLevel() , entry.getCountry() , entry.getUserStatus() , slug , 'NOW()'];

		return DynamicQuery.create(text , values);

	}	

	public static roleRelatedEntries() : DynamicQuery {

		let text : string = `

		SELECT json_build_object(

			'Role' , (SELECT json_agg(row_to_json(rl)) 

								FROM (SELECT _id , word as name

									FROM ROLE) AS rl )

							) AS result

			`;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static updateRole(user_id : number , role_id : number) : DynamicQuery {

		let text : string = `INSERT INTO USER_ROLE(user_id , role_id)

													VALUES ($1 , $2)

													ON CONFLICT(user_id , role_id)

													DO NOTHING

													RETURNING 1 AS true

													`;

		let values : any[] = [user_id , role_id];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

			SELECT usr.first_name , usr.last_name , usr.email_address , usr.matriculation_number

			FROM USERS AS usr

			WHERE usr.slug = $1

			LIMIT 1

			`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

public static deleteRole(slug : string , entry : User) : DynamicQuery {

		let role = entry.getRole().map((item : any) => `$$${item}$$`);

		let text : string = `

		DELETE FROM USER_ROLE 

		WHERE user_id = $1 AND role_id 

		NOT IN (${role})

		RETURNING 1 AS true`;

		let values : any[] = [entry.getUserRoleId()];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

			DELETE FROM USERS

			WHERE slug = $1

			RETURNING _id , first_name , last_name , email_address , username

			`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

			DELETE FROM USERS

			WHERE _id IN (${entries})

			RETURNING _id , first_name , last_name , email_address

			`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

			SELECT slug FROM USERS

			WHERE slug IS NOT NULL

			LIMIT 1

			`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

			DELETE FROM USERS

			RETURNING _id , first_name , last_name , email_address

			`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT email_address , true AS exists 

		FROM USERS

		WHERE slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static verifyEmail(emailAddress : string) : DynamicQuery {

		let text = `

		SELECT usr._id , true AS exists 

		FROM USERS AS usr

		WHERE usr.email_address = $1

		LIMIT 1

		`;

		let values : any[] = [emailAddress];

		return DynamicQuery.create(text , values);

	}

	public static verifyUsername(username : string) : DynamicQuery {

		let text = `

		SELECT usr._id , true AS exists 

		FROM USERS AS usr

		WHERE usr.username = $1

		LIMIT 1

		`;

		let values : any[] = [username];

		return DynamicQuery.create(text , values);

	} 

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT usr.first_name , usr.last_name , usr.about , usr.matriculation_number , usr.country_id AS country ,

		usr.level_id AS level , usr.department_id AS department , usr.faculty_id AS faculty , usr.user_status_id AS user_status

		FROM USERS AS usr

		WHERE usr.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

	public static updateOneRole(slug : string) : DynamicQuery {

		let text : string = `

		SELECT _id , usr.first_name , usr.last_name , usr.matriculation_number ,

			(SELECT json_agg(row_to_json(rl)) 

			FROM (SELECT role_id AS _id

			FROM USER_ROLE AS usrrl

			WHERE usrrl.user_id = usr._id) AS rl) AS role

			FROM USERS AS usr

			WHERE usr.slug = $1

			LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

}