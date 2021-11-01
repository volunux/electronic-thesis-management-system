import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Status } from '../../../entity/Status';
import { CountryRepository } from '../CountryRepository';
import { CountryQuery } from '../../query/CountryQuery';
import { Country } from '../../../entity/Country';

export class CountryRepositoryImpl implements CountryRepository {

	private queryTemplate : QueryTemplate<Country> = new SimpleQueryTemplate<Country>();

	public async findOne(slug : string) : Promise<Country | null> {

		let plan : DynamicQuery = CountryQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , Country);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = CountryQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Country[]> {

		let plan : DynamicQuery = CountryQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , Country);
	} 

	public async addOne() : Promise<Country> {

		let country : Country = new Country({});

		await this.relatedEntities(country);

		return country;
	} 

	public async save(entry : Country) : Promise<Country | null> {

		let plan : DynamicQuery = CountryQuery.save(<Country>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , Country);
	}

	public async updateOne(slug : string) : Promise<Country | null> {

		let plan : DynamicQuery = CountryQuery.updateOne(slug);

		let country : Country | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , Country);

		await this.relatedEntities(<Country>country);

		return country;
	}

	public async update(slug : string , entry : Country) : Promise<Country | null> {

		let plan : DynamicQuery = CountryQuery.update(slug , <Country>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , Country);
	}

	public async deleteOne(slug : string) : Promise<Country | null> {

		let plan : DynamicQuery = CountryQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , Country);
	} 

	public async remove(slug : string) : Promise<Country | null> {

		let plan : DynamicQuery = CountryQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , Country);
	} 

	public async deleteMany(entries : string) : Promise<Country[]> {

		let plan : DynamicQuery = CountryQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , Country);
	}

	public async deleteAll() : Promise<Country[]> {

		let plan : DynamicQuery = CountryQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , Country);
	}

	public async findAndDeleteAll() : Promise<Country[]> {

		let plan : DynamicQuery = CountryQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , Country);
	}

	public async relatedEntities(entry : Country) : Promise<Country | null> {

		let plan : DynamicQuery = CountryQuery.relatedEntities();

		let statuses : Status[] = [];

		let result : Object | null = await this.queryTemplate.relatedEntities(plan.getText() , plan.getValues());

		if (result !== null && entry !== null) {

			let listResult : Object[] = (<any>result).Status;

			statuses = ServiceHelper.rowsToObjectMapper<Status>(listResult , Status);

			entry.setStatuses(statuses);
		}

		return entry;
	} 


}
