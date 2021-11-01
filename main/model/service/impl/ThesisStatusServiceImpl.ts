import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ThesisStatusRepository } from '../../repository/ThesisStatusRepository';
import { ThesisStatusRepositoryImpl } from '../../repository/impl/ThesisStatusRepositoryImpl';
import { ThesisStatusService } from '../ThesisStatusService';
import { ThesisStatus } from '../../../entity/ThesisStatus';

export class ThesisStatusServiceImpl implements ThesisStatusService {

	private repository : ThesisStatusRepository = new ThesisStatusRepositoryImpl();

	public async findOne(slug : string) : Promise<ThesisStatus | null> {

		return this.repository.findOne(slug);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<ThesisStatus[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<ThesisStatus> {

		return this.repository.addOne();
	} 

	public async save(entry : ThesisStatus) : Promise<ThesisStatus | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<ThesisStatus | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : ThesisStatus) : Promise<ThesisStatus | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : ThesisStatus) : Promise<ThesisStatus | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<ThesisStatus | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<ThesisStatus | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<ThesisStatus[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<ThesisStatus[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<ThesisStatus[]> {

		return this.repository.findAndDeleteAll();
	}

}
