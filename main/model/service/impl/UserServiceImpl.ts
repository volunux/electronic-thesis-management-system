import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { UserHelper } from '../../../helper/entry/UserHelper';
import { Faculty } from '../../../entity/Faculty';
import { Department } from '../../../entity/Department';
import { Level } from '../../../entity/Level';
import { Country } from '../../../entity/Country';
import { Role } from '../../../entity/Role';
import { UserStatus } from '../../../entity/UserStatus';
import { UserRepository } from '../../repository/UserRepository';
import { UserRepositoryImpl } from '../../repository/impl/UserRepositoryImpl';
import { UserService } from '../UserService';
import { User } from '../../../entity/User';

export class UserServiceImpl implements UserService {

	private repository : UserRepository = new UserRepositoryImpl();

	public async findOne(slug : string) : Promise<User | null> {

		return this.repository.findOne(slug);
	} 

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<User[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<User> {

		return this.repository.addOne();
	} 

	public async save(entry : User) : Promise<User | null> {

	UserHelper.setPassword(<User>entry);

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<User | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : User) : Promise<User | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : User) : Promise<User | null> {

		return this.repository.update(slug , entry);
	}

	public async updateOneRole(slug : string) : Promise<User | null> {

		return this.repository.updateOneRole(slug);
	} 

	public async roleRelatedEntries(entry : User) : Promise<User | null> {

		return this.repository.roleRelatedEntries(entry);
	}

	public async updateRole(slug : string , user : User) : Promise<boolean> {

		return this.repository.updateRole(slug , user);
	} 

	public async deleteOne(slug : string) : Promise<User | null> {

		return this.repository.deleteOne(slug);
	} 

	public async deleteRole(slug : string , user : User) : Promise<boolean> {

		return this.repository.deleteRole(slug , user);
	} 

	public async updateAndDeleteRole(slug : string , user : User) : Promise<boolean> {

		return this.repository.updateAndDeleteRole(slug , user);
	} 

	public async remove(slug : string) : Promise<User | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<User[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<User[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<User[]> {

		return this.repository.findAndDeleteAll();
	}

	public async checkUsername(username : string) : Promise<boolean> {

		return this.repository.checkUsername(username);
	}

	public async checkEmailAddress(emailAddress : string) : Promise<boolean> {

		return this.repository.checkEmailAddress(emailAddress);
	}

}