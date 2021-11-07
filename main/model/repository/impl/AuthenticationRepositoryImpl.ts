import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Country } from '../../../entity/Country';
import { User } from '../../../entity/User';
import { Role } from '../../../entity/Role';
import { AuthenticationRepository } from '../AuthenticationRepository';
import { AuthenticationQuery } from '../../query/AuthenticationQuery';

export class AuthenticationRepositoryImpl implements AuthenticationRepository {

	private queryTemplate : QueryTemplate<User> = new SimpleQueryTemplate<User>();

	public async userExists(userId : number) : Promise<boolean> {

		let plan : DynamicQuery = AuthenticationQuery.userExists(userId);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async addAccount() : Promise<User> {

		let plan : DynamicQuery = AuthenticationQuery.addAccount();

		let user : User | null = new User({});

		let countries : Country[] = [];

		let result : Object | null = await this.queryTemplate.relatedEntities(plan.getText() , plan.getValues());

		if (result !== null) {

				let listResult : Object[] = (<any>result).Country;

				countries = ServiceHelper.rowsToObjectMapper<Country>(listResult , Country);

				user.setCountries(countries);
		}

		return user;
	} 

	public async save(entry : User) : Promise<User | null> {

		let plan : DynamicQuery = AuthenticationQuery.save(<User>entry);

		let user : User | null = null;

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , User);
	} 

	public async saveRole(entry : User) : Promise<User | null> {

		let plan : DynamicQuery = AuthenticationQuery.saveRole(<User>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , User);
	} 

	public async findRole(userId : number) : Promise<Role[]> {

		let plan : DynamicQuery = AuthenticationQuery.findRole(userId);

		let roles : Role[] = [];

		let result : Object[] | null = await this.queryTemplate.executePlainList(plan.getText() , plan.getValues());

		if (result !== null) { roles = ServiceHelper.rowsToObjectMapper<Role>(result , Role); }

		return roles;
	} 

	public async findUserStatus(userId : number) : Promise<string | null> {

		let plan : DynamicQuery = AuthenticationQuery.findStatus(userId);

		let userStatus : string | null = null;

		let result : Object | null = await this.queryTemplate.executePlain(plan.getText() , plan.getValues());

		if (result !== null) { userStatus = (<any>result).status; }

		return userStatus;
	} 

	public async relatedEntities(entry : User) : Promise<User | null> {

		return null;
	} 

	public async existsEmailAddress(emailAddress : string) : Promise<boolean> {

		let plan : DynamicQuery = AuthenticationQuery.existsEmailAddress(emailAddress);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async existsUsername(username : string) : Promise<boolean> {

		let plan : DynamicQuery = AuthenticationQuery.existsUsername(username);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async existsLoginDetails(emailAddress : string) : Promise<User | null> {

		let plan : DynamicQuery = AuthenticationQuery.existsLoginDetails(emailAddress);

		let user : User | null = null;

		let roles : Role[] = [];

		let result : Object | null = await this.queryTemplate.executePlain(plan.getText() , plan.getValues());

		if (result !== null) {

				user = new User(result);

				let listResult : Object[] = (<any>result).role;

				roles = ServiceHelper.rowsToObjectMapper<Role>(listResult , Role);

				user.setRoles(roles);
		}

		return user;
	}

	public async createForgotPasswordToken(emailAddress : string , token : string , tokenExpiryDate : string) : Promise<User | null> {

		let plan : DynamicQuery = AuthenticationQuery.createForgotPasswordToken(emailAddress , token , tokenExpiryDate);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , User);
	}

	public async validateResetPasswordToken(token : string) : Promise<User | null> {

		let plan : DynamicQuery = AuthenticationQuery.validateResetPasswordToken(token);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , User);
	}

	public async saveNewPassword(entry : User) : Promise<User | null> {

		let plan : DynamicQuery = AuthenticationQuery.saveNewPassword(entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , User);
	}

}
