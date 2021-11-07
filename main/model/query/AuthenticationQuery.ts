import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { UserSearch } from '../../helper/search/UserSearch';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { User } from '../../entity/User';
import { DynamicQuery } from './util/DynamicQuery';

export class AuthenticationQuery {

	public static userExists(userId : number) : DynamicQuery {

		let text : string = `SELECT usr._id , usr.slug , true AS exists 

								FROM USERS AS usr

								WHERE usr.user_id = $1

								LIMIT 1

								`;
	
		let values : any[] = [userId];

		return DynamicQuery.create(text , values);

	}

	public static existsEmailAddress(emailAddress : string) : DynamicQuery {

		let text : string = `

		SELECT usr._id , true AS exists 

		FROM USERS AS usr

		WHERE usr.email_address = $1

		LIMIT 1

		`;

		let values : any[] = [emailAddress];

		return DynamicQuery.create(text , values);

	}

	public static existsUsername(username : string) : DynamicQuery {

		let text : string = `

		SELECT usr._id , true AS exists 

		FROM USERS AS usr

		WHERE usr.username = $1

		LIMIT 1

		`;

		let values : any[] = [username];

		return DynamicQuery.create(text , values);

	}

	public static createForgotPasswordToken(emailAddress : string , token : string , tokenExpiryDate : string) : DynamicQuery {

		let text : string = `

		UPDATE USERS AS usr

		SET reset_password_token = $1 , reset_password_expires = $3

		FROM USER_STATUS AS us

		WHERE usr.email_address = $2

		RETURNING usr.email_address , usr.username , usr._id

		`;

		let values : any = [token , emailAddress , tokenExpiryDate];

		return DynamicQuery.create(text , values);

	}

	public static validateResetPasswordToken(token : string) : DynamicQuery {

		let expiryDate : string = Date.now().toString();

		let text : string = `

									SELECT usr._id , usr.email_address

									FROM USERS AS usr

									WHERE usr.reset_password_token = $1 AND usr.reset_password_expires > $2

									LIMIT 1

								`;

		let values : any[] = [token , expiryDate];

		return DynamicQuery.create(text , values);

	}

	public static saveNewPassword(user : User) : DynamicQuery {

		let text : string = `

									UPDATE USERS AS usr

									SET reset_password_token = null , reset_password_expires = null , hash = $2 , salt = $3

									WHERE usr.email_address = $1

									RETURNING usr.email_address , first_name , last_name , usr._id

								`;

		let values : any = [user.getEmailAddress() , user.getHash() , user.getSalt()];

		return DynamicQuery.create(text , values);
	}

	public static existsLoginDetails(emailAddress : string) : DynamicQuery {

		let text = `SELECT usr._id , usr.email_address , usr.username , usr.department_id AS department , usr.faculty_id AS faculty , usr.salt , usr.hash , us.word AS user_status ,

								(SELECT json_agg(row_to_json(rl)) 

									FROM (SELECT rl.word AS name

									FROM USER_ROLE AS usrrl
							
									LEFT JOIN ROLE AS rl ON rl._id = usrrl.role_id

									WHERE usrrl.user_id = usr._id) AS rl) AS role 

									FROM USERS AS usr

									INNER JOIN USER_STATUS AS us ON us._id = usr.user_status_id

									WHERE usr.email_address = $1

									LIMIT 1

								`;

		let values : any[] = [emailAddress];

		return DynamicQuery.create(text , values);

	}

	public static addAccount() : DynamicQuery {

		let text : string = `

		SELECT json_build_object(

			'Country' , (SELECT json_agg(row_to_json(ct)) 

										FROM (SELECT _id , name 

											FROM COUNTRY) AS ct )
			) AS result

		`;

		return DynamicQuery.create(text , []);
	}

	public static save(user : User) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO USERS (first_name , last_name , email_address , username , country_id , slug , salt , hash , user_status_id , department_id , faculty_id , level_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8 ,

													(SELECT _id FROM USER_STATUS AS us WHERE us.word = 'Active' LIMIT 1) ,

													(SELECT _id FROM DEPARTMENT AS dt WHERE dt._id = 1 LIMIT 1) ,

													(SELECT _id FROM FACULTY AS ft WHERE ft._id = 1 LIMIT 1) ,

													(SELECT _id FROM LEVEL AS ll where ll._id = 1 LIMIT 1) )

													RETURNING _id , first_name , last_name , email_address , username , hash , salt , department_id AS department , faculty_id AS faculty , level_id AS level , slug

												`;

		let values : any[] = [user.getFirstName() , user.getLastName() , user.getEmailAddress() , user.getUsername() , user.getCountry() , s , user.getSalt() , user.getHash()];

		return DynamicQuery.create(text , values);

	}

	public static saveRole(user : User) : DynamicQuery {

		let text : string = `INSERT INTO USER_ROLE (user_id , role_id)

													VALUES ($1 ,

													(SELECT _id FROM ROLE AS rl WHERE rl.word = 'Student' LIMIT 1) )

													RETURNING user_id

												`;

		let values : any[] = [user.getId()];

		return DynamicQuery.create(text , values);

	}

	public static findRole(userId : number) : DynamicQuery {

		let text : string = `

		SELECT rl.name

		FROM USER_ROLE AS usrrl

		INNER JOIN ROLE AS rl ON rl._id = usrrl.role_id

		WHERE usrrl.user_id = $1

		`;

		let values : any[] = [userId];

		return DynamicQuery.create(text , values);

	}

	public static findStatus(userId : number) : DynamicQuery {

		let text : string = `

		SELECT us.name AS status

		FROM USER_STATUS AS us

		WHERE us._id = $1

		`;

		let values : any[] = [userId];

		return DynamicQuery.create(text , values);

	}

}