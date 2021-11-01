import { QueryResult , QueryResultRow } from 'pg';
import { Query } from '../../query/util/Query';
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

	public async findOne(slug : string) : Promise<Thesis | null> {

		let plan : DynamicQuery = GeneralThesisQuery.findOne(slug);

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

		let plan : DynamicQuery = GeneralThesisQuery.entryExists(slug);

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

		let plan : DynamicQuery = GeneralThesisQuery.existsOne(slug);

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

	public async getEntryId(slug : string) : Promise<number> {

		let plan : DynamicQuery = GeneralThesisQuery.entryId(slug);

		let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

		let singleResult : QueryResultRow = result.rows[0];

		return singleResult._id;
	} 

	public async existsThesisCoverImage(thesisId : string) : Promise<ThesisCoverImage | null> {

		let plan : DynamicQuery = GeneralThesisQuery.existsThesisCoverImage(thesisId);

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

		let plan : DynamicQuery = GeneralThesisQuery.existsThesisDocument(thesisId);

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

		let plan : DynamicQuery = GeneralThesisQuery.findAll(eqp);

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

		let plan : DynamicQuery = GeneralThesisQuery.relatedEntities();

		let thesis : Thesis = new Thesis({});

		try {

			await this.relatedEntities(thesis);

		} catch(err : any) { console.log('An error has occured'); }

		return thesis;

	} 

	public async save(entry : Thesis) : Promise<Thesis | null> {

		let plan : DynamicQuery = GeneralThesisQuery.save(<Thesis>entry);

		let thesis : Thesis | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				thesis = new Thesis(singleResult);
			}

		} catch(err : any) { 

			console.log('An error has occured'); }

		return thesis;
	}

	public async saveThesisCoverImage(entry : ThesisCoverImage) : Promise<ThesisCoverImage | null> {

		let plan : DynamicQuery = GeneralThesisQuery.saveThesisCoverImage(<ThesisCoverImage>entry);

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

		let plan : DynamicQuery = GeneralThesisQuery.saveThesisDocument(<ThesisDocument>entry);

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

	public async updateThesisCoverImage(slug : string , coverImageId : number | string) : Promise<void> {

		let plan : DynamicQuery = GeneralThesisQuery.updateOne(slug);

		Query.execute(plan.getText() , plan.getValues());
	}

	public async updateOne(slug : string) : Promise<Thesis | null> {

		let plan : DynamicQuery = GeneralThesisQuery.updateOne(slug);

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

		let plan : DynamicQuery = GeneralThesisQuery.relatedEntities();

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let thesisGrades : ThesisGrade[] = [];

		let publishers : Publisher[] = [];

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

				entry.setFaculties(faculties);

				entry.setDepartments(departments);

				entry.setThesisGrades(thesisGrades);

				entry.setPublishers(publishers);

				console.log(entry);
			}

		} catch(err : any) { 

			console.log(err);

			console.log('An error has occured'); }

		return entry;
	} 

	public async update(slug : string , entry : Thesis) : Promise<Thesis | null> {

		let plan : DynamicQuery = GeneralThesisQuery.update(slug , <Thesis>entry);

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

	public async deleteOne(slug : string) : Promise<Thesis | null> {

		let plan : DynamicQuery = GeneralThesisQuery.deleteOne(slug);

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

		let plan : DynamicQuery = GeneralThesisQuery.remove(slug);

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

		let plan : DynamicQuery = GeneralThesisQuery.deleteThesisCoverImage(thesisId);

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
