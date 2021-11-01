import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { CountryRepository } from '../../repository/CountryRepository';
import { CountryRepositoryImpl } from '../../repository/impl/CountryRepositoryImpl';
import { CountryService } from '../CountryService';
import { Country } from '../../../entity/Country';

export class CountryServiceImpl implements CountryService {

	private repository : CountryRepository = new CountryRepositoryImpl();

	public async findOne(slug : string) : Promise<Country | null> {

		return this.repository.findOne(slug);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Country[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<Country> {

		return this.repository.addOne();
	} 

	public async save(entry : Country) : Promise<Country | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<Country | null> {

		return this.repository.updateOne(slug);
	}

	public async relatedEntities(entry : Country) : Promise<Country | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : Country) : Promise<Country | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<Country | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<Country | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<Country[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<Country[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<Country[]> {

		return this.repository.findAndDeleteAll();
	}

}
