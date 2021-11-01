import { QueryResult , QueryResultRow } from 'pg';
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

	public async findOne(slug : string) : Promise<Thesis | null> {

		let plan : DynamicQuery = ThesisQuery.findOne(slug);

		let thesis : Thesis | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				thesis = new Thesis(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return thesis;
	}

	public async entryExists(slug : string) : Promise<Thesis | null> {

		let plan : DynamicQuery = ThesisQuery.entryExists(slug);

		let thesis : Thesis | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				thesis = new Thesis(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return thesis;
	} 

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = ThesisQuery.existsOne(slug);

		let thesis : Thesis | null = null;

		let exists : boolean = false;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				thesis = new Thesis(singleResult);

				exists = true;
			}

		} catch(err : any) { console.log('An error has occured'); }

		return exists;
	} 

	public async existsThesisCoverImage(thesisId : string) : Promise<ThesisCoverImage | null> {

		let plan : DynamicQuery = ThesisQuery.existsThesisCoverImage(thesisId);

		let thesisCoverImage : ThesisCoverImage | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				thesisCoverImage = new ThesisCoverImage(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return thesisCoverImage;
	} 

	public async existsThesisDocument(thesisId : string) : Promise<ThesisDocument | null> {

		let plan : DynamicQuery = ThesisQuery.existsThesisDocument(thesisId);

		let thesisDocument : ThesisDocument | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				thesisDocument = new ThesisDocument(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return thesisDocument;
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Thesis[]> {

		let plan : DynamicQuery = ThesisQuery.findAll(eqp);

		let theses : Thesis[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				theses = ServiceHelper.rowsToObjectMapper<Thesis>(listResult , Thesis);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return theses;
	} 

	public async findAllSubmission(eqp : EntityQueryConfig) : Promise<Thesis[]> {

		let plan : DynamicQuery = ThesisQuery.findAllSubmission(eqp);

		let theses : Thesis[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				theses = ServiceHelper.rowsToObjectMapper<Thesis>(listResult , Thesis);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return theses;
	} 

	public async addOne() : Promise<Thesis> {

		let plan : DynamicQuery = ThesisQuery.relatedEntities();

		let thesis : Thesis = new Thesis({});
		
		try {

			await this.relatedEntities(thesis);

		} catch(err : any) { console.log('An error has occured'); }

		return thesis;
	} 

	public async save(entry : Thesis) : Promise<Thesis | null> {

		let plan : DynamicQuery = ThesisQuery.save(<Thesis>entry);

		let thesis : Thesis | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				thesis = new Thesis(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return thesis;
	}

	public async saveThesisCoverImage(entry : ThesisCoverImage) : Promise<ThesisCoverImage | null> {

		let plan : DynamicQuery = ThesisQuery.saveThesisCoverImage(<ThesisCoverImage>entry);

		let thesisCoverImage : ThesisCoverImage | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				thesisCoverImage = new ThesisCoverImage(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return thesisCoverImage;
	}

	public async updateThesisCoverImage(slug : string , coverImageId : number | string) : Promise<ThesisCoverImage | null> {

		let plan : DynamicQuery = ThesisQuery.existsOne(slug);

		let thesisCoverImage : ThesisCoverImage | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				thesisCoverImage = new ThesisCoverImage(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return thesisCoverImage;
	}

	public async saveThesisDocument(entry : ThesisDocument) : Promise<ThesisDocument | null> {

		let plan : DynamicQuery = ThesisQuery.saveThesisDocument(<ThesisDocument>entry);

		let thesisDocument : ThesisDocument | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				thesisDocument = new ThesisDocument(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return thesisDocument;
	}

	public async updateThesisDocument(slug : string , documentId : number | string) : Promise<ThesisDocument | null> {

		let plan : DynamicQuery = ThesisQuery.existsOne(slug);

		let thesisDocument : ThesisDocument | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				thesisDocument = new ThesisDocument(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return thesisDocument;
	}

	public async updateOne(slug : string) : Promise<Thesis | null> {

		let plan : DynamicQuery = ThesisQuery.updateOne(slug);

		let thesis : Thesis | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				thesis = new Thesis(singleResult);

				await this.relatedEntities(thesis);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return thesis;
	} 

	public async relatedEntities(entry : Thesis) : Promise<Thesis | null> {

		let plan : DynamicQuery = ThesisQuery.relatedEntities();

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let thesisGrades : ThesisGrade[] = [];

		let publishers : Publisher[] = [];

		let thesisStatuses : ThesisStatus[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = (<QueryResultRow>result.rows[0]).result.Faculty;

				let listResult2 : QueryResultRow[] = (<QueryResultRow>result.rows[0]).result.Department;

				let listResult3 : QueryResultRow[] = (<QueryResultRow>result.rows[0]).result.ThesisGrade;

				let listResult4 : QueryResultRow[] = (<QueryResultRow>result.rows[0]).result.Publisher;

				let listResult5 : QueryResultRow[] = (<QueryResultRow>result.rows[0]).result.ThesisStatus;

				faculties = ServiceHelper.rowsToObjectMapper<Faculty>(listResult , Faculty);

				departments = ServiceHelper.rowsToObjectMapper<Department>(listResult2 , Department);

				thesisGrades = ServiceHelper.rowsToObjectMapper<ThesisGrade>(listResult3 , ThesisGrade);

				publishers = ServiceHelper.rowsToObjectMapper<Publisher>(listResult4 , Publisher);

				thesisStatuses = ServiceHelper.rowsToObjectMapper<ThesisStatus>(listResult5 , ThesisStatus);

				entry.setFaculties(faculties);

				entry.setDepartments(departments);

				entry.setThesisGrades(thesisGrades);

				entry.setPublishers(publishers);

				entry.setThesisStatuses(thesisStatuses);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return entry;
	} 

	public async update(slug : string , entry : Thesis) : Promise<Thesis | null> {

		let plan : DynamicQuery = ThesisQuery.update(slug , <Thesis>entry);

		let thesis : Thesis | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				thesis = new Thesis(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return thesis;
	}

	public async updateStatus(slug : string , status : string) : Promise<boolean> {

		let plan : DynamicQuery = ThesisQuery.updateStatus(slug , status);

		let entryUpdated : boolean = false;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				entryUpdated = true;
			}

		} catch(err : any) { console.log('An error has occured'); }

		return entryUpdated;
	}

	public async findAllStatus() : Promise<ThesisStatus[]> {

		let plan : DynamicQuery = ThesisQuery.findAllStatus();

		let thesisStatuses : ThesisStatus[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				thesisStatuses = ServiceHelper.rowsToObjectMapper<ThesisStatus>(listResult , ThesisStatus);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return thesisStatuses;
	} 

	public async deleteOne(slug : string) : Promise<Thesis | null> {

		let plan : DynamicQuery = ThesisQuery.deleteOne(slug);

		let thesis : Thesis | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				thesis = new Thesis(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return thesis;
	} 

	public async remove(slug : string) : Promise<Thesis | null> {

		let plan : DynamicQuery = ThesisQuery.remove(slug);

		let thesis : Thesis | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				thesis = new Thesis(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return thesis;
	} 

	public async deleteThesisCoverImage(thesisId : string) : Promise<ThesisCoverImage | null> {

		let plan : DynamicQuery = ThesisQuery.deleteThesisCoverImage(thesisId);

		let thesisCoverImage : ThesisCoverImage | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				thesisCoverImage = new ThesisCoverImage(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return thesisCoverImage;
	} 

	public async deleteThesisDocument(thesisId : string) : Promise<ThesisDocument | null> {

		let plan : DynamicQuery = ThesisQuery.deleteThesisDocument(thesisId);

		let thesisDocument : ThesisDocument | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				thesisDocument = new ThesisDocument(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return thesisDocument;
	} 

	public async deleteMany(entries : string) : Promise<Thesis[]> {

		let plan : DynamicQuery = ThesisQuery.deleteMany(entries);

		let theses : Thesis[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				theses = ServiceHelper.rowsToObjectMapper<Thesis>(listResult , Thesis);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return theses;
	}

	public async deleteAll() : Promise<Thesis[]> {

		let plan : DynamicQuery = ThesisQuery.deleteAll();

		let theses : Thesis[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				theses = ServiceHelper.rowsToObjectMapper<Thesis>(listResult , Thesis);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return theses;
	}

	public async findAndDeleteAll() : Promise<Thesis[]> {

		let plan : DynamicQuery = ThesisQuery.findAndDeleteAll();

		let theses : Thesis[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				theses = ServiceHelper.rowsToObjectMapper<Thesis>(listResult , Thesis);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return theses;
	}

}
