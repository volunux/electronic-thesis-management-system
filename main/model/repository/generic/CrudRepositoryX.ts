import { CrudRepository } from './Repository';
import { QueryResult } from 'pg';

export interface CrudRepositoryX<T> extends CrudRepository<T> {

	deleteMany(entries : string) : Promise<T[]>;
	deleteAll() : Promise<T[]>;
	updateOne(slug : string) : Promise<T | null>;
	relatedEntities(entry : T) : Promise<T | null>;
	addOne() : Promise<T>;
	deleteOne(slug : string) : Promise<T | null>;
	findAndDeleteAll() : Promise<T[]>;
}