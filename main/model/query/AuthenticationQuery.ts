import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { UserSearch } from '../../helper/search/UserSearch';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { User } from '../../entity/User';
import { DynamicQuery } from './util/DynamicQuery';

export class AuthenticationQuery {

	public static userExists(userId : number) : DynamicQuery {

		let text : string = `SELECT usr.user AS _id , usr.slug , true AS exists 

								FROM USERS AS usr

								WHERE usr.user_id = $1

								LIMIT 1

								`;
	
		let values : any[] = [userId];

		return DynamicQuery.create(text , values);

	}

	public static existsEmailAddress(emailAddress : string) : DynamicQuery {

		let text : string = `

		SELECT usr.user_id AS _id , true AS exists 

		FROM USERS AS usr

		WHERE usr.email_address = $1

		LIMIT 1

		`;

		let values : any[] = [emailAddress];

		return DynamicQuery.create(text , values);

	}

	public static existsUsername(username : string) : DynamicQuery {

		let text : string = `

		SELECT usr.user_id AS _id , true AS exists 

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

		RETURNING usr.email_address , usr.username , usr.user_id AS _id

		`;

		let values : any = [token , emailAddress , tokenExpiryDate];

		return DynamicQuery.create(text , values);

	}

	public static validateResetPasswordToken(token : string) : DynamicQuery {

		let expiryDate : string = Date.now().toString();

		let text : string = `

									SELECT u.user_id AS _id , u.email_address

									FROM USERS AS u

									WHERE u.reset_password_token = $1 AND u.reset_password_expires > $2

									LIMIT 1

								`;

		let values : any[] = [token , expiryDate];

		return DynamicQuery.create(text , values);

	}

	public static saveNewPassword(user : User) : DynamicQuery {

		let text : string = `

									UPDATE USERS AS u

									SET reset_password_token = null , reset_password_expires = null , hash = $2 , salt = $3

									WHERE u.email_address = $1

									RETURNING u.email_address , u.user_id AS _id

								`;

		let values : any = [user.getEmailAddress() , user.getHash() , user.getSalt()];

		return DynamicQuery.create(text , values);
	}

	public static existsLoginDetails(emailAddress : string) : DynamicQuery {

		let text = `SELECT usr.user_id AS _id , usr.email_address , usr.username , usr.department_id AS department , usr.faculty_id AS faculty , usr.salt , usr.hash , us.name AS status ,

								(SELECT json_agg(row_to_json(rl)) 

									FROM (SELECT rl.name

									FROM USER_ROLE AS usrrl
							
									LEFT JOIN ROLE AS rl ON rl.role_id = usrrl.role_id

									WHERE usrrl.user_id = usr.user_id) AS rl) AS role 

									FROM USERS AS usr

									INNER JOIN USER_STATUS AS us ON us.user_status_id = usr.user_status_id

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

										FROM (SELECT country_id AS _id , name 

											FROM COUNTRY) AS ct )
			) AS result

		`;

		return DynamicQuery.create(text , []);
	}

	public static save(user : User) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO USERS (first_name , last_name , email_address , username , country_id , user_no , slug , salt , hash , user_status_id , department_id , faculty_id , level_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 ,

													(SELECT user_status_id AS _id FROM USER_STATUS AS us WHERE us.word = 'Active' LIMIT 1) ,

													(SELECT department_id AS _id FROM DEPARTMENT AS dt WHERE dt.department_id = 1 LIMIT 1) ,

													(SELECT faculty_id AS _id FROM FACULTY AS ft WHERE ft.faculty_id = 1 LIMIT 1) ,

													(SELECT level_id AS _id FROM LEVEL AS ll where ll.level_id = 1 LIMIT 1) )

													RETURNING user_id AS _id , first_name , last_name , email_address , username , hash , salt , department_id AS department_id , faculty AS faculty_id , level_id AS level , slug

												`;

		let values : any[] = [user.getFirstName() , user.getLastName() , user.getEmailAddress() , user.getUsername() , user.getCountry() , c , s , user.getSalt() , user.getHash()];

		return DynamicQuery.create(text , values);

	}

	public static saveRole(user : User) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO USER_ROLE (user_id , user_role_no , slug , role_id , status_id)

													VALUES ($1 , $2 , $3 ,

													(SELECT role_id AS _id FROM ROLE AS rl WHERE rl.word = 'Student' LIMIT 1) ,

													(SELECT status_id AS _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1) )

													RETURNING user_id , slug

												`;

		let values : any[] = [user.getUserId() , c , s];

		return DynamicQuery.create(text , values);

	}

	public static findRole(userId : number) : DynamicQuery {

		let text : string = `

		SELECT rl.name

		FROM USER_ROLE AS usrrl

		INNER JOIN ROLE AS rl ON rl.role_id = usrrl.role_id

		WHERE usrrl.user_id = $1

		`;

		let values : any[] = [userId];

		return DynamicQuery.create(text , values);

	}

	public static findStatus(userId : number) : DynamicQuery {

		let text : string = `

		SELECT us.name AS status

		FROM USER_STATUS AS us

		WHERE us.user_status_id = $1

		`;

		let values : any[] = [userId];

		return DynamicQuery.create(text , values);

	}

}