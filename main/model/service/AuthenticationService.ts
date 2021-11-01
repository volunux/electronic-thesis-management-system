import { User } from '../../entity/User';
import { Role } from '../../entity/Role';

export interface AuthenticationService {

	addAccount() : Promise<User>;

	userExists(userId : number) : Promise<boolean>; 

	addAccount() : Promise<User>; 

	save(entry : User) : Promise<User | null>; 

	saveRole(entry : User) : Promise<User | null>; 

	findRole(userId : number) : Promise<Role[]>; 

	findUserStatus(userId : number) : Promise<string | null>; 

	relatedEntities(entry : User) : Promise<User | null>; 

	existsEmailAddress(emailAddress : string) : Promise<boolean>; 

	existsUsername(username : string) : Promise<boolean>; 

	existsLoginDetails(emailAddress : string) : Promise<User | null>;

	createForgotPasswordToken(emailAddress : string , token : string , tokenExpiryDate : string) : Promise<User | null>;

	validateResetPasswordToken(token : string) : Promise<User | null>;

	saveNewPassword(entry : User) : Promise<User | null>;

}
