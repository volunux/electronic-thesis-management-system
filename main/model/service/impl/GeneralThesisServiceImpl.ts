import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { GeneralThesisRepository } from '../../repository/GeneralThesisRepository';
import { GeneralThesisRepositoryImpl } from '../../repository/impl/GeneralThesisRepositoryImpl';
import { GeneralThesisService } from '../GeneralThesisService';
import { Thesis } from '../../../entity/Thesis';
import { ThesisCoverImage } from '../../../entity/ThesisCoverImage';
import { ThesisDocument } from '../../../entity/ThesisDocument';

export class GeneralThesisServiceImpl implements GeneralThesisService {

	private repository : GeneralThesisRepository = new GeneralThesisRepositoryImpl();

	public async findOne(slug : string) : Promise<Thesis | null> {

		return this.repository.findOne(slug);
	} 

	public async entryExists(slug : string) : Promise<Thesis | null> {

		return this.repository.entryExists(slug);
	} 

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public getEntryId(slug : string) : Promise<number> {

		return this.repository.getEntryId(slug);
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

	public async addOne() : Promise<Thesis> {

		return this.repository.addOne();
	} 

	public async save(entry : Thesis) : Promise<Thesis | null> {

		return this.repository.save(entry);
	}

	public async saveThesisCoverImage(entry : ThesisCoverImage) : Promise<ThesisCoverImage | null> {

		return this.repository.saveThesisCoverImage(entry);
	}

	public async saveThesisDocument(entry : ThesisDocument) : Promise<ThesisDocument | null> {

		return this.repository.saveThesisDocument(entry);
	}

	public updateThesisCoverImage(slug : string , coverImageId : number | string) : Promise<void> {

		return this.repository.updateThesisCoverImage(slug , coverImageId);
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

	public async deleteMany(entries : string) : Promise<Thesis[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<Thesis[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<Thesis[]> {

		return this.repository.findAndDeleteAll();
	}

}
