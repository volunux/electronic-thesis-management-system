import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ThesisGradeRepository } from '../../repository/ThesisGradeRepository';
import { ThesisGradeRepositoryImpl } from '../../repository/impl/ThesisGradeRepositoryImpl';
import { ThesisGradeService } from '../ThesisGradeService';
import { ThesisGrade } from '../../../entity/ThesisGrade';

export class ThesisGradeServiceImpl implements ThesisGradeService {

	private repository : ThesisGradeRepository = new ThesisGradeRepositoryImpl();

	public async findOne(slug : string) : Promise<ThesisGrade | null> {

		return this.repository.findOne(slug);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<ThesisGrade[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<ThesisGrade> {

		return this.repository.addOne();
	} 

	public async save(entry : ThesisGrade) : Promise<ThesisGrade | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<ThesisGrade | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : ThesisGrade) : Promise<ThesisGrade | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : ThesisGrade) : Promise<ThesisGrade | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<ThesisGrade | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<ThesisGrade | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<ThesisGrade[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<ThesisGrade[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<ThesisGrade[]> {

		return this.repository.findAndDeleteAll();
	}

}
