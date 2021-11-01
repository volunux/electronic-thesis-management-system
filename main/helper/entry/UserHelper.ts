import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../../entity/User';
import { Role } from '../../entity/Role'
import { UserSession } from '../../entity/UserSession';

export class UserHelper {

	public static setPassword(user : User) : void {
	
		let salt : string = crypto.randomBytes(16).toString('hex');
	
		let hash : string = crypto
								
								.pbkdf2Sync(user.getPassword() , salt , 1000 , 64 , 'sha512')

								.toString('hex');

		user.setSalt(salt);

		user.setHash(hash);
	}

  public static jsonArrayFlattener(entryValue : any[] , key : string) : string[] {

    if (!(entryValue instanceof Array)) return [];

    else { return entryValue.map((item) => { return item[key]; }); }

  }

  public static jsonArrayFlattenerInt(entryValue : any[] , key : string) : number[] {

    if (!(entryValue instanceof Array)) return [];

    else { return entryValue.map((item) => { return +(item[key]); }); }

  }

	public static validPassword(password : any , user : UserSession) : boolean {
	
	 	let hash : string = crypto
							
							.pbkdf2Sync(password , user.getSalt() , 1000 , 64 , 'sha512')
							
							.toString('hex');

		return user.getHash() === hash;
	}

	public static getUserRoles(roles : Role[]) : string {

		let transformedRoles : string[] = roles.map(function(role : Role) : string {

			return role.getName(); });

		return transformedRoles.join(",");
	}

	public static generateJwt(user : User) : string {
	
		let expiry : Date = new Date();

		expiry.setDate(expiry.getDate() + 7);

		return jwt.sign({

			'_id' : user.getUserId() ,

			'email_address' : user.getEmailAddress() ,

			'username' : user.getUsername() ,

			'role' : user.getRole() , 

			'department' : user.getDepartment() ,

			'faculty' : user.getFaculty() ,

			'status' : user.getUserStatus() ,

			'exp' : expiry.getTime() / 1000 /*parseInt(Date.now() / 1000) + 1 * 60* 1 denote minute*/ ,

			} , (<any>process.env)['JWT_SECRET'] );
	
	}

}