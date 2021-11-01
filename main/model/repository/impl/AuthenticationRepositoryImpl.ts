import { QueryResult , QueryResultRow } from 'pg';
import { Query } from '../../query/util/Query';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Country } from '../../../entity/Country';
import { User } from '../../../entity/User';
import { Role } from '../../../entity/Role';
import { AuthenticationRepository } from '../AuthenticationRepository';
import { AuthenticationQuery } from '../../query/AuthenticationQuery';

export class AuthenticationRepositoryImpl implements AuthenticationRepository {

	public async userExists(userId : number) : Promise<boolean> {

		let plan : DynamicQuery = AuthenticationQuery.userExists(userId);

		let user : User | null = null;

		let exists : boolean = false;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);

				exists = true;
			}

		} catch(err : any) { console.log('An error has occured'); }

		return exists;
	} 

	public async addAccount() : Promise<User> {

		let plan : DynamicQuery = AuthenticationQuery.addAccount();

		let user : User | null = new User({});

		let countries : Country[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = (<QueryResultRow>result.rows[0]).result.result.Country;

				countries = ServiceHelper.rowsToObjectMapper<Country>(listResult , Country);

				user.setCountries(countries);

			}

		} catch(err : any) { console.log('An error has occured'); }

		return user;
	} 

	public async save(entry : User) : Promise<User | null> {

		let plan : DynamicQuery = AuthenticationQuery.save(<User>entry);

		let user : User | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return user;
	} 

	public async saveRole(entry : User) : Promise<User | null> {

		let plan : DynamicQuery = AuthenticationQuery.saveRole(<User>entry);

		let user : User | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return user;
	} 

	public async findRole(userId : number) : Promise<Role[]> {

		let plan : DynamicQuery = AuthenticationQuery.findRole(userId);

		let roles : Role[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				roles = ServiceHelper.rowsToObjectMapper<Role>(listResult , Role);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return roles;
	} 

	public async findUserStatus(userId : number) : Promise<string | null> {

		let plan : DynamicQuery = AuthenticationQuery.findStatus(userId);

		let userStatus : string | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				userStatus = singleResult.status;

			}

		} catch(err : any) { console.log('An error has occured'); }

		return userStatus;
	} 

	public async relatedEntities(entry : User) : Promise<User | null> {

		return null;
	} 

	public async existsEmailAddress(emailAddress : string) : Promise<boolean> {

		let plan : DynamicQuery = AuthenticationQuery.existsEmailAddress(emailAddress);

		let user : User | null = null;

		let exists : boolean = false;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);

				exists = true;
			}

		} catch(err : any) { console.log('An error has occured'); }

		return exists;
	} 

	public async existsUsername(username : string) : Promise<boolean> {

		let plan : DynamicQuery = AuthenticationQuery.existsUsername(username);

		let user : User | null = null;

		let exists : boolean = false;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);

				exists = true;
			}

		} catch(err : any) { console.log('An error has occured'); }

		return exists;
	} 

	public async existsLoginDetails(emailAddress : string) : Promise<User | null> {

		let plan : DynamicQuery = AuthenticationQuery.existsLoginDetails(emailAddress);

		let user : User | null = null;

		let roles : Role[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);

				let listResult : QueryResultRow[] = (<QueryResultRow>result.rows[0]).result.result.role;

				roles = ServiceHelper.rowsToObjectMapper<Role>(listResult , Role);

				user.setRoles(roles);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return user;
	}

	public async createForgotPasswordToken(emailAddress : string , token : string , tokenExpiryDate : string) : Promise<User | null> {

		let plan : DynamicQuery = AuthenticationQuery.createForgotPasswordToken(emailAddress , token , tokenExpiryDate);

		let user : User | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return user;
	}

	public async validateResetPasswordToken(token : string) : Promise<User | null> {

		let plan : DynamicQuery = AuthenticationQuery.validateResetPasswordToken(token);

		let user : User | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return user;
	}

	public async saveNewPassword(entry : User) : Promise<User | null> {

		let plan : DynamicQuery = AuthenticationQuery.saveNewPassword(entry);

		let user : User | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return user;
	}

}
