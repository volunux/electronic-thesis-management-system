import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { FacultyRepositoryImpl } from '../../repository/impl/FacultyRepositoryImpl';
import { FacultyRepository } from '../../repository/FacultyRepository';
import { FacultyService } from '../FacultyService';
import { Faculty } from '../../../entity/Faculty';

export class FacultyServiceImpl implements FacultyService {

	private repository : FacultyRepository = new FacultyRepositoryImpl();

	public async findOne(slug : string) : Promise<Faculty | null> {

		return this.repository.findOne(slug);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Faculty[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<Faculty> {

		return this.repository.addOne();
	} 

	public async save(entry : Faculty) : Promise<Faculty | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<Faculty | null> {

		return this.repository.updateOne(slug);
	}

	public async relatedEntities(entry : Faculty) : Promise<Faculty | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : Faculty) : Promise<Faculty | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<Faculty | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<Faculty | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<Faculty[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<Faculty[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<Faculty[]> {

		return this.repository.findAndDeleteAll();
	}

}
