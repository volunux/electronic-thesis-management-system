import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Faculty } from '../../../entity/Faculty';
import { Department } from '../../../entity/Department';
import { Publisher } from '../../../entity/Publisher';
import { ThesisStatus } from '../../../entity/ThesisStatus';
import { Status } from '../../../entity/Status';
import { Query } from '../../query/util/Query';
import { ThesisRepository } from '../ThesisRepository';
import { ThesisQuery } from '../../query/ThesisQuery';
import { Thesis } from '../../../entity/Thesis';
import { ThesisCoverImage } from '../../../entity/ThesisCoverImage';
import { ThesisDocument } from '../../../entity/ThesisDocument';
import { ThesisGrade } from '../../../entity/ThesisGrade';

export class ThesisRepositoryImpl implements ThesisRepository {

	private queryTemplate : QueryTemplate<Thesis> = new SimpleQueryTemplate<Thesis>();

	private queryTemplateImage : QueryTemplate<ThesisCoverImage> = new SimpleQueryTemplate<ThesisCoverImage>();

	private queryTemplateDocument : QueryTemplate<ThesisDocument> = new SimpleQueryTemplate<ThesisDocument>();

	public async findOne(slug : string) : Promise<Thesis | null> {

		let plan : DynamicQuery = ThesisQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , Thesis);
	}

	public async entryExists(slug : string) : Promise<Thesis | null> {

		let plan : DynamicQuery = ThesisQuery.entryExists(slug);

		return await this.queryTemplate.entryExists(plan.getText() , plan.getValues() , Thesis);
	} 

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = ThesisQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async existsThesisCoverImage(thesisId : string) : Promise<ThesisCoverImage | null> {

		let plan : DynamicQuery = ThesisQuery.existsThesisCoverImage(thesisId);

		return await this.queryTemplateImage.entryExists(plan.getText() , plan.getValues() , ThesisCoverImage);
	} 

	public async existsThesisDocument(thesisId : string) : Promise<ThesisDocument | null> {

		let plan : DynamicQuery = ThesisQuery.existsThesisDocument(thesisId);

		return await this.queryTemplateDocument.entryExists(plan.getText() , plan.getValues() , ThesisDocument);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Thesis[]> {

		let plan : DynamicQuery = ThesisQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , Thesis);
	} 

	public async findAllSubmission(eqp : EntityQueryConfig) : Promise<Thesis[]> {

		let plan : DynamicQuery = ThesisQuery.findAllSubmission(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , Thesis);
	} 

	public async addOne() : Promise<Thesis> {

		let plan : DynamicQuery = ThesisQuery.relatedEntities();

		let thesis : Thesis = new Thesis({});
		
		await this.relatedEntities(<Thesis>thesis);

		return thesis;
	} 

	public async save(entry : Thesis) : Promise<Thesis | null> {

		let plan : DynamicQuery = ThesisQuery.save(<Thesis>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , Thesis);
	}

	public async saveThesisCoverImage(entry : ThesisCoverImage) : Promise<ThesisCoverImage | null> {

		let plan : DynamicQuery = ThesisQuery.saveThesisCoverImage(<ThesisCoverImage>entry);

		return await this.queryTemplateImage.save(plan.getText() , plan.getValues() , ThesisCoverImage);
	}

	public async updateThesisCoverImage(slug : string , coverImageId : number | string) : Promise<ThesisCoverImage | null> {

		let plan : DynamicQuery = ThesisQuery.existsOne(slug);

		return await this.queryTemplateImage.entryExists(plan.getText() , plan.getValues() , ThesisCoverImage);
	}

	public async saveThesisDocument(entry : ThesisDocument) : Promise<ThesisDocument | null> {

		let plan : DynamicQuery = ThesisQuery.saveThesisDocument(<ThesisDocument>entry);

		return await this.queryTemplateDocument.save(plan.getText() , plan.getValues() , ThesisDocument);
	}

	public async updateThesisDocument(slug : string , documentId : number | string) : Promise<ThesisDocument | null> {

		let plan : DynamicQuery = ThesisQuery.existsOne(slug);

		return await this.queryTemplateDocument.entryExists(plan.getText() , plan.getValues() , ThesisDocument);
	}

	public async updateOne(slug : string) : Promise<Thesis | null> {

		let plan : DynamicQuery = ThesisQuery.updateOne(slug);

		let thesis : Thesis | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , Thesis);

		await this.relatedEntities(<Thesis>thesis);

		return thesis;
	} 

	public async update(slug : string , entry : Thesis) : Promise<Thesis | null> {

		let plan : DynamicQuery = ThesisQuery.update(slug , <Thesis>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , Thesis);
	}

	public async updateStatus(slug : string , status : string) : Promise<boolean> {

		let plan : DynamicQuery = ThesisQuery.updateStatus(slug , status);

		return await this.queryTemplate.updateAndReturnBool(plan.getText() , plan.getValues());
	}

	public async findAllStatus() : Promise<ThesisStatus[]> {

		let queryTemplateStatus : QueryTemplate<ThesisStatus> = new SimpleQueryTemplate<ThesisStatus>();

		let plan : DynamicQuery = ThesisQuery.findAllStatus();

		return await queryTemplateStatus.findAll(plan.getText() , plan.getValues() , ThesisStatus);
	} 

	public async deleteOne(slug : string) : Promise<Thesis | null> {

		let plan : DynamicQuery = ThesisQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , Thesis);
	} 

	public async remove(slug : string) : Promise<Thesis | null> {

		let plan : DynamicQuery = ThesisQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , Thesis);
	} 

	public async deleteThesisCoverImage(thesisId : string) : Promise<ThesisCoverImage | null> {

		let plan : DynamicQuery = ThesisQuery.deleteThesisCoverImage(thesisId);

		return await this.queryTemplateImage.delete(plan.getText() , plan.getValues() , ThesisCoverImage);
	} 

	public async deleteThesisDocument(thesisId : string) : Promise<ThesisDocument | null> {

		let plan : DynamicQuery = ThesisQuery.deleteThesisDocument(thesisId);

		return await this.queryTemplateDocument.delete(plan.getText() , plan.getValues() , ThesisDocument);
	} 

	public async deleteMany(entries : string) : Promise<Thesis[]> {

		let plan : DynamicQuery = ThesisQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , Thesis);
	}

	public async deleteAll() : Promise<Thesis[]> {

		let plan : DynamicQuery = ThesisQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , Thesis);
	}

	public async findAndDeleteAll() : Promise<Thesis[]> {

		let plan : DynamicQuery = ThesisQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , Thesis);
	}

	public async relatedEntities(entry : Thesis) : Promise<Thesis | null> {

		let plan : DynamicQuery = ThesisQuery.relatedEntities();	

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let thesisGrades : ThesisGrade[] = [];

		let publishers : Publisher[] = [];

		let thesisStatuses : ThesisStatus[] = [];

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

				thesisStatuses = ServiceHelper.rowsToObjectMapper<ThesisStatus>(listResult5 , ThesisStatus);

				entry.setFaculties(faculties);

				entry.setDepartments(departments);

				entry.setThesisGrades(thesisGrades);

				entry.setPublishers(publishers); 

				entry.setThesisStatuses(thesisStatuses); }

		return entry;
	} 

}