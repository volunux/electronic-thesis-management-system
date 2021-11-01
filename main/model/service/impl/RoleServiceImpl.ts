import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { RoleRepository } from '../../repository/RoleRepository';
import { RoleRepositoryImpl } from '../../repository/impl/RoleRepositoryImpl';
import { RoleService } from '../RoleService';
import { Role } from '../../../entity/Role';

export class RoleServiceImpl implements RoleService {

	private repository : RoleRepository = new RoleRepositoryImpl();

	public async findOne(slug : string) : Promise<Role | null> {

		return this.repository.findOne(slug);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Role[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<Role> {

		return this.repository.addOne();
	} 

	public async save(entry : Role) : Promise<Role | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<Role | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : Role) : Promise<Role | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : Role) : Promise<Role | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<Role | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<Role | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<Role[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<Role[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<Role[]> {

		return this.repository.findAndDeleteAll();
	}

}
