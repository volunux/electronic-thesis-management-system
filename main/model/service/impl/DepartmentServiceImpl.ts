import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { DepartmentRepositoryImpl } from '../../repository/impl/DepartmentRepositoryImpl';
import { DepartmentRepository } from '../../repository/DepartmentRepository';
import { DepartmentService } from '../DepartmentService';
import { Department } from '../../../entity/Department';

export class DepartmentServiceImpl implements DepartmentService {

	private repository : DepartmentRepository = new DepartmentRepositoryImpl();

	public async findOne(slug : string) : Promise<Department | null> {

		return this.repository.findOne(slug);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Department[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<Department> {

		return this.repository.addOne();
	} 

	public async save(entry : Department) : Promise<Department | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<Department | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : Department) : Promise<Department | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : Department) : Promise<Department | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<Department | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<Department | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<Department[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<Department[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<Department[]> {

		return this.repository.findAndDeleteAll();
	}

}
