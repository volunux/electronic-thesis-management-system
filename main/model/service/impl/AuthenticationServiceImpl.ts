import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { Country } from '../../../entity/Country';
import { User } from '../../../entity/User';
import { Role } from '../../../entity/Role';
import { AuthenticationRepository } from '../../repository/AuthenticationRepository';
import { AuthenticationRepositoryImpl } from '../../repository/impl/AuthenticationRepositoryImpl';
import { AuthenticationService } from '../AuthenticationService'
import { AuthenticationQuery } from '../../query/AuthenticationQuery';

export class AuthenticationServiceImpl implements AuthenticationService {

	private repository : AuthenticationRepository = new AuthenticationRepositoryImpl();

	public async userExists(userId : number) : Promise<boolean> {

		return this.repository.userExists(userId);
	} 

	public async addAccount() : Promise<User> {

		return this.repository.addAccount();
	} 

	public async save(entry : User) : Promise<User | null> {

		return this.repository.save(entry);
	} 

	public async saveRole(entry : User) : Promise<User | null> {

		return this.repository.saveRole(entry);
	} 

	public async findRole(userId : number) : Promise<Role[]> {

		return this.repository.findRole(userId);
	} 

	public async findUserStatus(userId : number) : Promise<string | null> {

		return this.repository.findUserStatus(userId);
	} 

	public async relatedEntities(entry : User) : Promise<User | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async existsEmailAddress(emailAddress : string) : Promise<boolean> {

		return this.repository.existsEmailAddress(emailAddress);
	} 

	public async existsUsername(username : string) : Promise<boolean> {

		return this.repository.existsUsername(username);
	} 

	public async existsLoginDetails(emailAddress : string) : Promise<User | null> {

		return this.repository.existsLoginDetails(emailAddress);
	}

	public async createForgotPasswordToken(emailAddress : string , token : string , tokenExpiryDate : string) : Promise<User | null> {

		return this.repository.createForgotPasswordToken(emailAddress , token , tokenExpiryDate);
	}

	public async validateResetPasswordToken(token : string) : Promise<User | null> {

		return this.repository.validateResetPasswordToken(token);
	}

	public async saveNewPassword(entry : User) : Promise<User | null> {

		return this.repository.saveNewPassword(entry);
	}

}
