import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { Status } from '../../../entity/Status';
import { ThesisReviewRepository } from '../../repository/ThesisReviewRepository';
import { ThesisReviewRepositoryImpl } from '../../repository/impl/ThesisReviewRepositoryImpl';
import { ThesisReviewService } from '../ThesisReviewService';
import { ThesisReview } from '../../../entity/ThesisReview';

export class ThesisReviewServiceImpl implements ThesisReviewService {

	private repository : ThesisReviewRepository = new ThesisReviewRepositoryImpl();

	public async findOne(slug : string) : Promise<ThesisReview | null> {

		return this.repository.findOne(slug);
	} 

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<ThesisReview[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<ThesisReview> {

		return this.repository.addOne();
	} 

	public async save(entry : ThesisReview) : Promise<ThesisReview | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<ThesisReview | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : ThesisReview) : Promise<ThesisReview | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : ThesisReview) : Promise<ThesisReview | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<ThesisReview | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<ThesisReview | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<ThesisReview[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<ThesisReview[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<ThesisReview[]> {

		return this.repository.findAndDeleteAll();
	}

}
