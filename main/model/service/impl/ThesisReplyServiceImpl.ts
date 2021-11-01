import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ThesisReplyRepository } from '../../repository/ThesisReplyRepository';
import { ThesisReplyRepositoryImpl } from '../../repository/impl/ThesisReplyRepositoryImpl';
import { ThesisReplyService } from '../ThesisReplyService';
import { ThesisReply } from '../../../entity/ThesisReply';

export class ThesisReplyServiceImpl implements ThesisReplyService {

	private repository : ThesisReplyRepository = new ThesisReplyRepositoryImpl();

	public async findOne(slug : string) : Promise<ThesisReply | null> {

		return this.repository.findOne(slug);
	} 

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<ThesisReply[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<ThesisReply> {

		return this.repository.addOne();
	} 

	public async save(entry : ThesisReply) : Promise<ThesisReply | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<ThesisReply | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : ThesisReply) : Promise<ThesisReply | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : ThesisReply) : Promise<ThesisReply | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<ThesisReply | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<ThesisReply | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<ThesisReply[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<ThesisReply[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<ThesisReply[]> {

		return this.repository.findAndDeleteAll();
	}

}
