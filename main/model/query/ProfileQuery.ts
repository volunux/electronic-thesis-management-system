import crypto from 'crypto-random-string';
import { DynamicQuery } from './util/DynamicQuery';
import { User } from '../../entity/User';
import { UserProfilePhoto } from '../../entity/UserProfilePhoto';
import { UserSignature } from '../../entity/UserSignature';

export class ProfileQuery {

	public static findOne(entryId : number) : DynamicQuery {

		let text : string = `

		SELECT usr._id , usr.first_name , usr.last_name , usr.username , usr.email_address ,

		usr.about , usr.matriculation_number , usr.updated_on , usr.created_on , dt.name AS department , ft.name AS faculty ,

		ct.name AS country , ll.name AS level , us.word AS status , upp.location AS user_profile_photo , usig.location AS user_signature ,

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

		WHERE usr._id = $1

		LIMIT 1

		`;

		let values : any[] = [entryId];

		return DynamicQuery.create(text , values);

	}

	public static saveUserProfilePhoto(entryId : number , entry : UserProfilePhoto) : DynamicQuery {

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO USER_PROFILE_PHOTO (location , key , mimetype , size , slug , user_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , $6 , (SELECT _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													ON CONFLICT (user_id)

													DO UPDATE SET location = $1 , key = $2 , mimetype = $3 , size = $4 , user_id = $6

													RETURNING _id , slug , location , key

												`;

		let values : any[] = [entry.getLocation() , entry.getKey() , entry.getMimetype() , entry.getSize() , s , entryId];

		return DynamicQuery.create(text , values);

	}

	public static saveUserSignature(entryId : number , entry : UserSignature) : DynamicQuery {

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO USER_SIGNATURE (location , key , mimetype , size , slug , user_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , $6 , (SELECT _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													ON CONFLICT (user_id)

													DO UPDATE SET location = $1 , key = $2 , mimetype = $3 , size = $4 , user_id = $6

													RETURNING slug , location , key
												
												`;

		let values : any[] = [entry.getLocation() , entry.getKey() , entry.getMimetype() , entry.getSize() , s , entryId];

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

											FROM DEPARTMENT) AS dt )

			) AS result

			`;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static update(entryId : number , entry : User) : DynamicQuery {

		let text : string = `UPDATE USERS

													SET first_name = $1 , last_name = $2 , about = $3 , matriculation_number = $4 , department_id = $5 , faculty_id = $6 , level_id = $7 , country_id = $8 , updated_on = $10

													WHERE _id = $9

													RETURNING _id , first_name , last_name , slug

												`;

		let values : any[] = [entry.getFirstName() , entry.getLastName() , entry.getAbout() , entry.getMatriculationNumber() , entry.getDepartment() , entry.getFaculty() , 

													entry.getLevel() , entry.getCountry() , entryId , 'NOW()'];

		return DynamicQuery.create(text , values);

	}

	public static existsOne(entryId : number) : DynamicQuery {

		let text : string = `

		SELECT _id , true AS exists 

		FROM USERS

		WHERE _id = $1

		LIMIT 1

		`;

		let values : any[] = [entryId];

		return DynamicQuery.create(text , values);

	}

	public static deactivateOne(entryId : number) : DynamicQuery {

		let text : string = `

		SELECT usr._id , us.word AS status 

		FROM USERS AS usr

		INNER JOIN USER_STATUS AS us ON us._id = usr.user_status_id

		WHERE usr._id = $1

		LIMIT 1

		`;

		let values : any[] = [entryId];

		return DynamicQuery.create(text , values);

	}

	public static deactivate(entryId : number) : DynamicQuery {

		let text : string = `UPDATE USERS AS usr

													SET user_status_id = us._id

													FROM USER_STATUS AS us

													WHERE usr._id = $1 AND us.word = 'Deactivated'

													RETURNING usr._id , usr.email_address , us.word AS status

												`;

		let values : any[] = [entryId];

		return DynamicQuery.create(text , values);

	}	

	public static reactivateOne(entryId : number) : DynamicQuery {

		let text = `SELECT usr._id , us.word AS status 

									FROM USERS AS usr

									INNER JOIN USER_STATUS AS us ON us._id = usr.user_status_id

									WHERE usr._id = $1

									LIMIT 1

								`;

		let values : any[] = [entryId];

		return DynamicQuery.create(text , values);

	}

	public static reactivateUserII(entryId : number) : DynamicQuery {

		let text = `SELECT usr._id , usr.email_address , us.word AS status 

									FROM USERS AS usr

									INNER JOIN USER_STATUS AS us ON us._id = u.status_id

									WHERE usr._id = $1

									LIMIT 1

								`;

		let values : any[] = [entryId];

		return DynamicQuery.create(text , values);

	}

	public static reactivate(entryId : number) : DynamicQuery {

		let text = `UPDATE USERS AS usr

								SET user_status_id = us._id

								FROM USER_STATUS AS us

								WHERE usr._id = $1 AND us.word = 'Active'

								RETURNING usr._id , usr.email_address , us.word AS status

								`;

		let values : any[] = [entryId];

		return DynamicQuery.create(text , values);

	}

	public static existsUserProfilePhoto(entryId : number) : DynamicQuery {

		let text : string = `

			SELECT location , key , slug 

			FROM USER_PROFILE_PHOTO

			WHERE user_id = $1

			LIMIT 1

		`;

		let values : any[] = [entryId];

		return DynamicQuery.create(text , values);

	}

	public static existsUserSignature(entryId : number) : DynamicQuery {

		let text : string = `

			SELECT location , key , slug 

			FROM USER_SIGNATURE

			WHERE user_id = $1

			LIMIT 1

		`;

		let values : any[] = [entryId];

		return DynamicQuery.create(text , values);

	}

	public static deleteProfilePhoto(entryId : number) : DynamicQuery {

		let text : string = `

			DELETE

			FROM USER_PROFILE_PHOTO

			WHERE user_id = $1

  		RETURNING location , key , slug 

		`;

		let values : any[] = [entryId];

		return DynamicQuery.create(text , values);

	}

	public static deleteSignature(entryId : number) : DynamicQuery {

		let text : string = `

			DELETE

			FROM USER_SIGNATURE

			WHERE user_id = $1

  		RETURNING location , key , slug 

		`;

		let values : any[] = [entryId];

		return DynamicQuery.create(text , values);

	}

	public static deleteProfilePhotoByKey(key : string) : DynamicQuery {

		let text : string = `

			DELETE

			FROM USER_PROFILE_PHOTO

			WHERE key = $1

  		RETURNING location , key , slug 

		`;

		let values : any[] = [key];

		return DynamicQuery.create(text , values);

	}

	public static deleteSignatureByKey(key : string) : DynamicQuery {

		let text : string = `

			DELETE

			FROM USER_SIGNATURE

			WHERE key = $1

  		RETURNING location , key , slug 

		`;

		let values : any[] = [key];

		return DynamicQuery.create(text , values);

	}

	public static updateOne(userId : number) : DynamicQuery {

		let text : string = `

		SELECT usr.first_name , usr.last_name , usr.about , usr.matriculation_number , usr.country_id AS country , usr.level_id AS level , usr.department_id AS department , usr.faculty_id AS faculty

		FROM USERS AS usr

		WHERE usr._id = $1

		LIMIT 1

		`;

		let values : any[] = [userId];

		return DynamicQuery.create(text , values);
	}

}