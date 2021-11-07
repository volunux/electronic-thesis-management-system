import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Department } from '../../../entity/Department';
import { Faculty } from '../../../entity/Faculty';
import { Publisher } from '../../../entity/Publisher';
import { GeneralThesisQuery } from '../../query/GeneralThesisQuery';
import { GeneralThesisRepository } from '../../repository/GeneralThesisRepository';
import { Thesis } from '../../../entity/Thesis';
import { ThesisGrade } from '../../../entity/ThesisGrade';
import { ThesisCoverImage } from '../../../entity/ThesisCoverImage';
import { ThesisDocument } from '../../../entity/ThesisDocument';

export class GeneralThesisRepositoryImpl implements GeneralThesisRepository {

	private queryTemplate : QueryTemplate<Thesis> = new SimpleQueryTemplate<Thesis>();

	private queryTemplateImage : QueryTemplate<ThesisCoverImage> = new SimpleQueryTemplate<ThesisCoverImage>();

	private queryTemplateDocument : QueryTemplate<ThesisDocument> = new SimpleQueryTemplate<ThesisDocument>();

	public async findOne(slug : string) : Promise<Thesis | null> {

		let plan : DynamicQuery = GeneralThesisQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , Thesis);
	} 

	public async entryExists(slug : string) : Promise<Thesis | null> {

		let plan : DynamicQuery = GeneralThesisQuery.entryExists(slug);

		return await this.queryTemplate.entryExists(plan.getText() , plan.getValues() , Thesis);
	} 

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = GeneralThesisQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async getEntryId(slug : string) : Promise<number> {

		let plan : DynamicQuery = GeneralThesisQuery.entryId(slug);

		return await this.queryTemplate.findId(plan.getText() , plan.getValues() , '_id');
	} 

	public async existsThesisCoverImage(thesisId : string) : Promise<ThesisCoverImage | null> {

		let plan : DynamicQuery = GeneralThesisQuery.existsThesisCoverImage(thesisId);

		return await this.queryTemplateImage.entryExists(plan.getText() , plan.getValues() , ThesisCoverImage);
	} 

	public async existsThesisDocument(thesisId : string) : Promise<ThesisDocument | null> {

		let plan : DynamicQuery = GeneralThesisQuery.existsThesisDocument(thesisId);

		return await this.queryTemplateDocument.entryExists(plan.getText() , plan.getValues() , ThesisDocument);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Thesis[]> {

		let plan : DynamicQuery = GeneralThesisQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , Thesis);
	} 

	public async addOne() : Promise<Thesis> {

		let plan : DynamicQuery = GeneralThesisQuery.relatedEntities();

		let thesis : Thesis = new Thesis({});

		await this.relatedEntities(<Thesis>thesis);

		return thesis;
	} 

	public async save(entry : Thesis) : Promise<Thesis | null> {

		let plan : DynamicQuery = GeneralThesisQuery.save(<Thesis>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , Thesis);
	}

	public async saveThesisCoverImage(entry : ThesisCoverImage) : Promise<ThesisCoverImage | null> {

		let plan : DynamicQuery = GeneralThesisQuery.saveThesisCoverImage(<ThesisCoverImage>entry);

		return await this.queryTemplateImage.save(plan.getText() , plan.getValues() , ThesisCoverImage);
	}

	public async saveThesisDocument(entry : ThesisDocument) : Promise<ThesisDocument | null> {

		let plan : DynamicQuery = GeneralThesisQuery.saveThesisDocument(<ThesisDocument>entry);

		return await this.queryTemplateDocument.save(plan.getText() , plan.getValues() , ThesisDocument);
	}

	public async updateThesisCoverImage(slug : string , coverImageId : number | string) : Promise<void> {

		let plan : DynamicQuery = GeneralThesisQuery.updateOne(slug);

	}

	public async updateOne(slug : string) : Promise<Thesis | null> {

		let plan : DynamicQuery = GeneralThesisQuery.updateOne(slug);

		let thesis : Thesis | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , Thesis);

		await this.relatedEntities(<Thesis>thesis);

		return thesis;
	} 

	public async relatedEntities(entry : Thesis) : Promise<Thesis | null> {

		let plan : DynamicQuery = GeneralThesisQuery.relatedEntities();	

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let thesisGrades : ThesisGrade[] = [];

		let publishers : Publisher[] = [];

		let result : Object | null = await this.queryTemplate.relatedEntities(plan.getText() , plan.getValues());

		if (result !== null && entry !== null) {

				let listResult : Object[] = (<any>result).Faculty;

				let listResult2 : Object[] = (<any>result).Department;

				let listResult3 : Object[] = (<any>result).ThesisGrade;

				let listResult4 : Object[] = (<any>result).Publisher;

				let listResult5 : Object[] = (<any>result).ThesisStatus;

				faculties = ServiceHelper.rowsToObjectMapper<Faculty>(listResult , Faculty);

				departments = ServiceHelper.rowsToObjectMapper<Department>(listResult2 , Department);

				thesisGrades = ServiceHelper.rowsToObjectMapper<ThesisGrade>(listResult3 , ThesisGrade);

				publishers = ServiceHelper.rowsToObjectMapper<Publisher>(listResult4 , Publisher);

				entry.setFaculties(faculties);

				entry.setDepartments(departments);

				entry.setThesisGrades(thesisGrades);

				entry.setPublishers(publishers); }

		return entry;
	}

	public async update(slug : string , entry : Thesis) : Promise<Thesis | null> {

		let plan : DynamicQuery = GeneralThesisQuery.update(slug , <Thesis>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , Thesis);
	}

	public async deleteOne(slug : string) : Promise<Thesis | null> {

		let plan : DynamicQuery = GeneralThesisQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , Thesis);
	} 

	public async remove(slug : string) : Promise<Thesis | null> {

		let plan : DynamicQuery = GeneralThesisQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , Thesis);
	} 

	public async deleteThesisCoverImage(thesisId : string) : Promise<ThesisCoverImage | null> {

		let plan : DynamicQuery = GeneralThesisQuery.deleteThesisCoverImage(thesisId);

		return await this.queryTemplateImage.delete(plan.getText() , plan.getValues() , ThesisCoverImage);
	} 

	public async deleteMany(entries : string) : Promise<Thesis[]> {

		return [];
	}

	public async deleteAll() : Promise<Thesis[]> {

		return [];
	}

	public async findAndDeleteAll() : Promise<Thesis[]> {

		return [];
	}

}
