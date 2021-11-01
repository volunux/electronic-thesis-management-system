import { CrudServiceX } from './generic/CrudServiceX';
import { EntityQueryConfig } from '../query/util/EntityQueryConfig';
import { User } from '../../entity/User';

export interface UserService extends CrudServiceX<User> {

	updateOneRole(slug : string) : Promise<User | null>; 
	roleRelatedEntries(entry : User) : Promise<User | null>;
	updateRole(slug : string , user : User) : Promise<boolean>; 
	deleteRole(slug : string , user : User) : Promise<boolean>; 
	updateAndDeleteRole(slug : string , user : User) : Promise<boolean>; 
	checkUsername(username : string) : Promise<boolean>;
	checkEmailAddress(emailAddress : string) : Promise<boolean>;

}