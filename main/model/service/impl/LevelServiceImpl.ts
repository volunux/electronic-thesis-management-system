import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { LevelRepository } from '../../repository/LevelRepository';
import { LevelRepositoryImpl } from '../../repository/impl/LevelRepositoryImpl';
import { LevelService } from '../LevelService';
import { Level } from '../../../entity/Level';

export class LevelServiceImpl implements LevelService {

	private repository : LevelRepository = new LevelRepositoryImpl();

	public async findOne(slug : string) : Promise<Level | null> {

		return this.repository.findOne(slug);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Level[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<Level> {

		return this.repository.addOne();
	} 

	public async save(entry : Level) : Promise<Level | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<Level | null> {

		return this.repository.updateOne(slug);
	}

	public async relatedEntities(entry : Level) : Promise<Level | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : Level) : Promise<Level | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<Level | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<Level | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<Level[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<Level[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<Level[]> {

		return this.repository.findAndDeleteAll();
	}

}
