import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ThesisRepository } from '../../repository/ThesisRepository';
import { ThesisRepositoryImpl } from '../../repository/impl/ThesisRepositoryImpl';
import { ThesisService } from '../ThesisService';
import { Thesis } from '../../../entity/Thesis';
import { ThesisCoverImage } from '../../../entity/ThesisCoverImage';
import { ThesisDocument } from '../../../entity/ThesisDocument';
import { ThesisStatus } from '../../../entity/ThesisStatus';

export class ThesisServiceImpl implements ThesisService {

	private repository : ThesisRepository = new ThesisRepositoryImpl();

	public async findOne(slug : string) : Promise<Thesis | null> {

		let thesis : Thesis | null = await this.repository.findOne(slug);

		if (thesis === null) return thesis;

		let thesisStatuses : ThesisStatus[] = await this.repository.findAllStatus();

		thesis.setThesisStatuses(thesisStatuses);

		return thesis;
	}

	public async entryExists(slug : string) : Promise<Thesis | null> {

		return this.repository.entryExists(slug);
	} 

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async existsThesisCoverImage(thesisId : string) : Promise<ThesisCoverImage | null> {

		return this.repository.existsThesisCoverImage(thesisId);
	} 

	public async existsThesisDocument(thesisId : string) : Promise<ThesisDocument | null> {

		return this.repository.existsThesisDocument(thesisId);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Thesis[]> {

		return this.repository.findAll(eqp);
	} 

	public async findAllSubmission(eqp : EntityQueryConfig) : Promise<Thesis[]> {

		return this.repository.findAllSubmission(eqp);
	} 

	public async addOne() : Promise<Thesis> {

		return this.repository.addOne();
	} 

	public async save(entry : Thesis) : Promise<Thesis | null> {

		return this.repository.save(entry);
	}

	public async saveThesisCoverImage(entry : ThesisCoverImage) : Promise<ThesisCoverImage | null> {

		return this.repository.saveThesisCoverImage(entry);
	}

	public async updateThesisCoverImage(slug : string , coverImageId : number | string) : Promise<ThesisCoverImage | null> {

		return this.repository.updateThesisCoverImage(slug , coverImageId);
	}

	public async saveThesisDocument(entry : ThesisDocument) : Promise<ThesisDocument | null> {

		return this.repository.saveThesisDocument(entry);
	}

	public async updateThesisDocument(slug : string , documentId : number | string) : Promise<ThesisDocument | null> {

		return this.repository.updateThesisDocument(slug , documentId);
	}

	public async updateOne(slug : string) : Promise<Thesis | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : Thesis) : Promise<Thesis | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : Thesis) : Promise<Thesis | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<Thesis | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<Thesis | null> {

		return this.repository.remove(slug);
	} 

	public async deleteThesisCoverImage(thesisId : string) : Promise<ThesisCoverImage | null> {

		return this.repository.deleteThesisCoverImage(thesisId);
	} 

	public async deleteThesisDocument(thesisId : string) : Promise<ThesisDocument | null> {

		return this.repository.deleteThesisDocument(thesisId);
	} 

	public async deleteMany(entries : string) : Promise<Thesis[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<Thesis[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<Thesis[]> {

		return this.repository.findAndDeleteAll();
	}

	public async updateStatus(slug : string , status : string) : Promise<boolean> {

		return this.repository.updateStatus(slug , status);
	}

	public async findAllStatus() : Promise<ThesisStatus[]> {

		return this.repository.findAllStatus();
	}

}
