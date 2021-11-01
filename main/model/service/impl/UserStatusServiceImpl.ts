import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { UserStatusRepository } from '../../repository/UserStatusRepository';
import { UserStatusRepositoryImpl } from '../../repository/impl/UserStatusRepositoryImpl';
import { UserStatusService } from '../UserStatusService';
import { UserStatus } from '../../../entity/UserStatus';

export class UserStatusServiceImpl implements UserStatusService {

	private repository : UserStatusRepository = new UserStatusRepositoryImpl();

	public async findOne(slug : string) : Promise<UserStatus | null> {

		return this.repository.findOne(slug);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<UserStatus[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<UserStatus> {

		return this.repository.addOne();
	} 

	public async save(entry : UserStatus) : Promise<UserStatus | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<UserStatus | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : UserStatus) : Promise<UserStatus | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : UserStatus) : Promise<UserStatus | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<UserStatus | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<UserStatus | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<UserStatus[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<UserStatus[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<UserStatus[]> {

		return this.repository.findAndDeleteAll();
	}

}
