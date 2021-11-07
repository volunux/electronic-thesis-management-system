import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Faculty } from '../../../entity/Faculty';
import { Status } from '../../../entity/Status';
import { DepartmentRepository } from '../DepartmentRepository';
import { DepartmentQuery } from '../../query/DepartmentQuery';
import { Department } from '../../../entity/Department';

export class DepartmentRepositoryImpl implements DepartmentRepository {

	private queryTemplate : QueryTemplate<Department> = new SimpleQueryTemplate<Department>();

	public async findOne(slug : string) : Promise<Department | null> {

		let plan : DynamicQuery = DepartmentQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , Department);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = DepartmentQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Department[]> {

		let plan : DynamicQuery = DepartmentQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , Department);
	} 

	public async addOne() : Promise<Department> {

		let department : Department = new Department({});

		await this.relatedEntities(department);

		return department;
	} 

	public async save(entry : Department) : Promise<Department | null> {

		let plan : DynamicQuery = DepartmentQuery.save(<Department>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , Department);
	}

	public async updateOne(slug : string) : Promise<Department | null> {

		let plan : DynamicQuery = DepartmentQuery.updateOne(slug);

		let department : Department | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , Department);

		await this.relatedEntities(<Department>department);

		return department;
	}

	public async update(slug : string , entry : Department) : Promise<Department | null> {

		let plan : DynamicQuery = DepartmentQuery.update(slug , <Department>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , Department);
	}

	public async deleteOne(slug : string) : Promise<Department | null> {

		let plan : DynamicQuery = DepartmentQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , Department);
	} 

	public async remove(slug : string) : Promise<Department | null> {

		let plan : DynamicQuery = DepartmentQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , Department);
	} 

	public async deleteMany(entries : string) : Promise<Department[]> {

		let plan : DynamicQuery = DepartmentQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , Department);
	}

	public async deleteAll() : Promise<Department[]> {

		let plan : DynamicQuery = DepartmentQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , Department);
	}

	public async findAndDeleteAll() : Promise<Department[]> {

		let plan : DynamicQuery = DepartmentQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , Department);
	}

	public async relatedEntities(entry : Department) : Promise<Department | null> {

		let plan : DynamicQuery = DepartmentQuery.relatedEntities();

		let statuses : Status[] = [];

		let faculties : Faculty[] = [];

		let result : Object | null = await this.queryTemplate.relatedEntities(plan.getText() , plan.getValues());

		if (result !== null && entry !== null) {

				let listResult : Object[] = (<any>result).Status;

				let listResult2 : Object[] = (<any>result).Faculty;

				statuses = ServiceHelper.rowsToObjectMapper<Status>(listResult , Status);

				faculties = ServiceHelper.rowsToObjectMapper<Faculty>(listResult2 , Faculty);

				entry.setStatuses(statuses);

				entry.setFaculties(faculties);
		}

		return entry;
	} 

}
