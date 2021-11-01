import { CrudRepositoryX } from './generic/CrudRepositoryX';
import { User } from '../../entity/User';

export interface UserRepository extends CrudRepositoryX<User> {

	updateOneRole(slug : string) : Promise<User | null>;
	updateRole(slug : string , entry : User) : Promise<boolean>;
	deleteRole(slug : string , entry : User) : Promise<boolean>;
	updateAndDeleteRole(slug : string , entry : User) : Promise<boolean>;
	roleRelatedEntries(entry : User) : Promise<User | null>;
	checkUsername(username : string) : Promise<boolean>;
	checkEmailAddress(emailAddress : string) : Promise<boolean>;
} 