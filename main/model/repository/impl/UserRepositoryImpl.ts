import { QueryResult , PoolClient } from 'pg';
import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
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

	private queryTemplate : QueryTemplate<User> = new SimpleQueryTemplate<User>();

	public async findOne(slug : string) : Promise<User | null> {

		let plan : DynamicQuery = UserQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , User);
} 

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = UserQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<User[]> {

		let plan : DynamicQuery = UserQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , User);
	} 

	public async addOne() : Promise<User> {

		let user : User = new User({});

		await this.relatedEntities(user);

		return user;
	} 

	public async save(entry : User) : Promise<User | null> {

		let plan : DynamicQuery = UserQuery.save(<User>entry);

		let user : User | null = await this.queryTemplate.save(plan.getText() , plan.getValues() , User);

		(<User>user).setPassword(entry.getPassword());

		return user;
	}

	public async updateOne(slug : string) : Promise<User | null> {

		let plan : DynamicQuery = UserQuery.updateOne(slug);

		let user : User | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , User);

		await this.relatedEntities(<User>user);

		return user;
	} 

	public async relatedEntities(entry : User) : Promise<User | null> {

		let plan : DynamicQuery = UserQuery.relatedEntities();

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let levels : Level[] = [];

		let countries : Country[] = [];

		let userStatuses : UserStatus[] = [];

		let result : Object | null = await this.queryTemplate.relatedEntities(plan.getText() , plan.getValues());

			if (result !== null && entry !== null) {

				let listResult : Object[] = (<any>result).Faculty;

				let listResult2 : Object[] = (<any>result).Department;

				let listResult3 : Object[] = (<any>result).Level;

				let listResult4 : Object[] = (<any>result).Country;

				let listResult5 : Object[] = (<any>result).UserStatus;

				faculties = ServiceHelper.rowsToObjectMapper<Faculty>(listResult , Faculty);

				departments = ServiceHelper.rowsToObjectMapper<Department>(listResult2 , Department);

				levels = ServiceHelper.rowsToObjectMapper<Level>(listResult3 , Level);

				countries = ServiceHelper.rowsToObjectMapper<Country>(listResult4 , Country);

				userStatuses = ServiceHelper.rowsToObjectMapper<UserStatus>(listResult5 , UserStatus);

				entry.setFaculties(faculties);

				entry.setDepartments(departments);

				entry.setLevels(levels);

				entry.setCountries(countries);

				entry.setUserStatuses(userStatuses); }

		return entry;
	} 

	public async update(slug : string , entry : User) : Promise<User | null> {

		let plan : DynamicQuery = UserQuery.update(slug , <User>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , User);
	}

	public async updateOneRole(slug : string) : Promise<User | null> {

		let plan : DynamicQuery = UserQuery.updateOneRole(slug);

		let plan2 : DynamicQuery = UserQuery.roleRelatedEntries();

		let user : User | null = null;

		let roles : Role[] = [];

		let entry : Object | null = await this.queryTemplate.executePlain(plan.getText() , plan.getValues());

		if (entry !== null) {

			user = new User(entry);

			user.setRole(UserHelper.jsonArrayFlattenerInt((<any>entry).role , '_id'));

			await this.roleRelatedEntries(user); }

		return user;
	} 

	public async roleRelatedEntries(entry : User) : Promise<User | null> {

		let plan : DynamicQuery = UserQuery.roleRelatedEntries();

		let roles : Role[] = [];

		let newEntry : Object | null = await this.queryTemplate.executePlain(plan.getText() , plan.getValues());

		if (newEntry !== null) {

			let listResult : Object[] = (<any>newEntry).result.Role;

			roles = ServiceHelper.rowsToObjectMapper<Role>(listResult , Role);

			entry.setRoles(roles); }

		return entry;
	}

	public async updateRole(slug : string , user : User) : Promise<boolean> {

		let plan : DynamicQuery = UserQuery.updateRole(user.getUserRoleId() , user.getRole()[0]);

		return await this.queryTemplate.updateAndReturnBool(plan.getText() , plan.getValues());
	} 

	public async deleteOne(slug : string) : Promise<User | null> {

		let plan : DynamicQuery = UserQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , User);
	} 

	public async deleteRole(slug : string , user : User) : Promise<boolean> {

		let plan : DynamicQuery = UserQuery.deleteRole(slug , user);

		return await this.queryTemplate.execute(plan.getText() , plan.getValues());
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

					let result : QueryResult = await client.query(plan.getText() , plan.getValues()); } 

			}

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

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , User);
	} 

	public async deleteMany(entries : string) : Promise<User[]> {

		let plan : DynamicQuery = UserQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , User);
	}

	public async deleteAll() : Promise<User[]> {

		let plan : DynamicQuery = UserQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , User);
	}

	public async findAndDeleteAll() : Promise<User[]> {

		let plan : DynamicQuery = UserQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , User);
	}

	public async checkUsername(username : string) : Promise<boolean> {

	let plan : DynamicQuery = UserQuery.verifyUsername(username);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	}

	public async checkEmailAddress(emailAddress : string) : Promise<boolean> {

	let plan : DynamicQuery = UserQuery.verifyEmail(emailAddress);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());	
	}

}