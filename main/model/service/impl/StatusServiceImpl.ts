import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { StatusRepository } from '../../repository/StatusRepository';
import { StatusRepositoryImpl } from '../../repository/impl/StatusRepositoryImpl';
import { StatusService } from '../StatusService';
import { Status } from '../../../entity/Status';

export class StatusServiceImpl implements StatusService {

	private repository : StatusRepository = new StatusRepositoryImpl();

	public async findOne(slug : string) : Promise<Status | null> {

		return this.repository.findOne(slug);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Status[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<Status> {

		return this.repository.addOne();
	} 

	public async save(entry : Status) : Promise<Status | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<Status | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : Status) : Promise<Status | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : Status) : Promise<Status | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<Status | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<Status | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<Status[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<Status[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<Status[]> {

		return this.repository.findAndDeleteAll();
	}

}
