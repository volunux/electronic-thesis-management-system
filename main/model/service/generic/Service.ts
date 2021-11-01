import { QueryResult } from 'pg';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';

export interface CrudService<T> {

	findAll(eqp : EntityQueryConfig) : Promise<T[]>;
	findOne(slug : string) : Promise<T | null>;
	remove(slug : string) : Promise<T | null>;
	update(slug : string , entry : T) : Promise<T | null>;
	save(entry : T) : Promise<T | null>;
	existsOne(slug : string) : Promise<boolean>;
}