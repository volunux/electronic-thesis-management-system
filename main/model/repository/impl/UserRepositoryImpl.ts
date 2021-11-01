import { QueryResult , QueryResultRow , PoolClient } from 'pg';
import { Query } from '../../query/util/Query';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { UserQuery } from '../../query/UserQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { UserHelper } from '../../../helper/entry/UserHelper';
import { Faculty } from '../../../entity/Faculty';
import { Department } from '../../../entity/Department';
import { Level } from '../../../entity/Level';
import { Country } from '../../../entity/Country';
import { Role } from '../../../entity/Role';
import { UserStatus } from '../../../entity/UserStatus';
import { UserRepository } from '../UserRepository';
import { User } from '../../../entity/User';

export class UserRepositoryImpl implements UserRepository {

	public async findOne(slug : string) : Promise<User | null> {

		let plan : DynamicQuery = UserQuery.findOne(slug);

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

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = UserQuery.existsOne(slug);

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

	public async findAll(eqp : EntityQueryConfig) : Promise<User[]> {

		let plan : DynamicQuery = UserQuery.findAll(eqp);

		let users : User[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				users = ServiceHelper.rowsToObjectMapper<User>(listResult , User);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return users;
	} 

	public async addOne() : Promise<User> {

		let user : User = new User({});

		try {

			await this.relatedEntities(user);

		} catch(err : any) { console.log('An error has occured'); }

		return user;
	} 

	public async save(entry : User) : Promise<User | null> {

		let plan : DynamicQuery = UserQuery.save(<User>entry);

		let user : User | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);

				user.setPassword(entry.getPassword());
			}

		} catch(err : any) { console.log('An error has occured'); }

		return user;
	}

	public async updateOne(slug : string) : Promise<User | null> {

		let plan : DynamicQuery = UserQuery.updateOne(slug);

		let user : User | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);

				await this.relatedEntities(user);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return user;
	} 

	public async relatedEntities(entry : User) : Promise<User | null> {

		let plan : DynamicQuery = UserQuery.relatedEntities();

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let levels : Level[] = [];

		let countries : Country[] = [];

		let userStatuses : UserStatus[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = (<QueryResultRow>result.rows[0]).result.Faculty;

				let listResult2 : QueryResultRow[] = (<QueryResultRow>result.rows[0]).result.Department;

				let listResult3 : QueryResultRow[] = (<QueryResultRow>result.rows[0]).result.Level;

				let listResult4 : QueryResultRow[] = (<QueryResultRow>result.rows[0]).result.Country;

				let listResult5 : QueryResultRow[] = (<QueryResultRow>result.rows[0]).result.UserStatus;

				faculties = ServiceHelper.rowsToObjectMapper<Faculty>(listResult , Faculty);

				departments = ServiceHelper.rowsToObjectMapper<Department>(listResult2 , Department);

				levels = ServiceHelper.rowsToObjectMapper<Level>(listResult3 , Level);

				countries = ServiceHelper.rowsToObjectMapper<Country>(listResult4 , Country);

				userStatuses = ServiceHelper.rowsToObjectMapper<UserStatus>(listResult5 , UserStatus);

				entry.setFaculties(faculties);

				entry.setDepartments(departments);

				entry.setLevels(levels);

				entry.setCountries(countries);

				entry.setUserStatuses(userStatuses);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return entry;
	} 

	public async update(slug : string , entry : User) : Promise<User | null> {

		let plan : DynamicQuery = UserQuery.update(slug , <User>entry);

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

	public async updateOneRole(slug : string) : Promise<User | null> {

		let plan : DynamicQuery = UserQuery.updateOneRole(slug);

		let plan2 : DynamicQuery = UserQuery.roleRelatedEntries();

		let user : User | null = null;

		let roles : Role[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length < 1) { return user; }

			let singleResult : QueryResultRow = result.rows[0];

			user = new User(singleResult);

			console.log(singleResult);

			user.setRole(UserHelper.jsonArrayFlattenerInt(singleResult.role , '_id'));

			await this.roleRelatedEntries(user);

		} catch(err : any) { console.log('An error has occured'); }

		return user;
	} 

	public async roleRelatedEntries(entry : User) : Promise<User | null> {

		let plan : DynamicQuery = UserQuery.roleRelatedEntries();

		let roles : Role[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = (<QueryResultRow>result.rows[0]).result.Role;

				roles = ServiceHelper.rowsToObjectMapper<Role>(listResult , Role);

				entry.setRoles(roles); }

		} catch(err : any) { console.log('An error has occured'); }

		return entry;
	}

	public async updateRole(slug : string , user : User) : Promise<boolean> {

	let plan : DynamicQuery = UserQuery.updateRole(user.getUserRoleId() , user.getRole()[0]);

	let entryUpdated : boolean = false;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				entryUpdated = true;
			}

		} catch(err : any) { console.log('An error has occured'); }

		return entryUpdated;
	} 

	public async deleteOne(slug : string) : Promise<User | null> {

		let plan : DynamicQuery = UserQuery.deleteOne(slug);

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

	public async deleteRole(slug : string , user : User) : Promise<boolean> {

	let plan : DynamicQuery = UserQuery.deleteRole(slug , user);

	let entryDeleted : boolean = false;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				entryDeleted = true;
			}

		} catch(err : any) { console.log('An error has occured'); }

		return entryDeleted;
	} 

	public async updateAndDeleteRole(slug : string , user : User) : Promise<boolean> {

	let plan2 : DynamicQuery = UserQuery.deleteRole(slug , user);

	let entryUpdated : boolean = false;

	let client : PoolClient = await Query.getClient();

		try {

			await client.query('BEGIN');

		if (user.getRole() != null && user.getRole().length > 0) {

				for (let i = 0; i < user.getRole().length; i++) {

					let plan : DynamicQuery = UserQuery.updateRole(user.getUserRoleId() , user.getRole()[i]);

					let result : QueryResult = await client.query(plan.getText() , plan.getValues());

				} }

			let result2 : QueryResult = await client.query(plan2.getText() , plan2.getValues());

			await client.query('COMMIT');

			entryUpdated = true;

		} catch(err : any) { 

			await client.query('ROLLBACK');

			entryUpdated = false;

			console.log('An error has occured'); }

			finally {

				client.release();
			}

		return entryUpdated;
	} 

	public async remove(slug : string) : Promise<User | null> {

		let plan : DynamicQuery = UserQuery.remove(slug);

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

	public async deleteMany(entries : string) : Promise<User[]> {

		let plan : DynamicQuery = UserQuery.deleteMany(entries);

		let users : User[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				users = ServiceHelper.rowsToObjectMapper<User>(listResult , User);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return users;
	}

	public async deleteAll() : Promise<User[]> {

		let plan : DynamicQuery = UserQuery.deleteAll();

		let users : User[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				users = ServiceHelper.rowsToObjectMapper<User>(listResult , User);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return users;
	}

	public async findAndDeleteAll() : Promise<User[]> {

		let plan : DynamicQuery = UserQuery.findAndDeleteAll();

		let users : User[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				users = ServiceHelper.rowsToObjectMapper<User>(listResult , User);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return users;
	}

	public async checkUsername(username : string) : Promise<boolean> {

	let plan : DynamicQuery = UserQuery.verifyUsername(username);

	let entryExists : boolean = false;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				entryExists = true;
			}

		} catch(err : any) { console.log('An error has occured'); }

		return entryExists;
	}

	public async checkEmailAddress(emailAddress : string) : Promise<boolean> {

	let plan : DynamicQuery = UserQuery.verifyEmail(emailAddress);

	let entryExists : boolean = false;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				entryExists = true;
			}

		} catch(err : any) { console.log('An error has occured'); }

		return entryExists;
	}

}