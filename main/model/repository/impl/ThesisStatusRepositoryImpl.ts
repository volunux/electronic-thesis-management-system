import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Status } from '../../../entity/Status';
import { ThesisStatusRepository } from '../ThesisStatusRepository';
import { ThesisStatusQuery } from '../../query/ThesisStatusQuery';
import { ThesisStatus } from '../../../entity/ThesisStatus';

export class ThesisStatusRepositoryImpl implements ThesisStatusRepository {

	private queryTemplate : QueryTemplate<ThesisStatus> = new SimpleQueryTemplate<ThesisStatus>();

	public async findOne(slug : string) : Promise<ThesisStatus | null> {

		let plan : DynamicQuery = ThesisStatusQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , ThesisStatus);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = ThesisStatusQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<ThesisStatus[]> {

		let plan : DynamicQuery = ThesisStatusQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , ThesisStatus);
	} 

	public async addOne() : Promise<ThesisStatus> {

		let country : ThesisStatus = new ThesisStatus({});

		await this.relatedEntities(country);

		return country;
	} 

	public async save(entry : ThesisStatus) : Promise<ThesisStatus | null> {

		let plan : DynamicQuery = ThesisStatusQuery.save(<ThesisStatus>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , ThesisStatus);
	}

	public async updateOne(slug : string) : Promise<ThesisStatus | null> {

		let plan : DynamicQuery = ThesisStatusQuery.updateOne(slug);

		let country : ThesisStatus | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , ThesisStatus);

		await this.relatedEntities(<ThesisStatus>country);

		return country;
	}

	public async update(slug : string , entry : ThesisStatus) : Promise<ThesisStatus | null> {

		let plan : DynamicQuery = ThesisStatusQuery.update(slug , <ThesisStatus>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , ThesisStatus);
	}

	public async deleteOne(slug : string) : Promise<ThesisStatus | null> {

		let plan : DynamicQuery = ThesisStatusQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , ThesisStatus);
	} 

	public async remove(slug : string) : Promise<ThesisStatus | null> {

		let plan : DynamicQuery = ThesisStatusQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , ThesisStatus);
	} 

	public async deleteMany(entries : string) : Promise<ThesisStatus[]> {

		let plan : DynamicQuery = ThesisStatusQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , ThesisStatus);
	}

	public async deleteAll() : Promise<ThesisStatus[]> {

		let plan : DynamicQuery = ThesisStatusQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , ThesisStatus);
	}

	public async findAndDeleteAll() : Promise<ThesisStatus[]> {

		let plan : DynamicQuery = ThesisStatusQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , ThesisStatus);
	}

	public async relatedEntities(entry : ThesisStatus) : Promise<ThesisStatus | null> {

		return entry;
	} 


}
