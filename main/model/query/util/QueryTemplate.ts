import { Newable } from '../../../entity/interface/Newable';

export interface QueryTemplate<T extends Object> {

		findOne(text : string , params : any[] , entity : Newable<T>) : Promise<T | null>;
		executePlain(text : string , params : any[]) : Promise<Object | null>;
		existsOne(text : string , params : any[]) : Promise<boolean>;
		execute(text : string , params : any[]) : Promise<boolean>;
		findAll(text : string , params : any[] , entity : Newable<T>) : Promise<T[]>;
		save(text : string , params : any[] , entity : Newable<T>) : Promise<T | null>;
		updateOne(text : string , params : any[] , entity : Newable<T>) : Promise<T | null>;
		update(text : string , params : any[] , entity : Newable<T>) : Promise<T | null>;
		deleteOne(text : string , params : any[] , entity : Newable<T>) : Promise<T | null>;
		delete(text : string , params : any[] , entity : Newable<T>) : Promise<T | null>;
		deleteMany(text : string , params : any[] , entity : Newable<T>) : Promise<T[]>;
		deleteAll(text : string , params : any[] , Entity : Newable<T>) : Promise<T[]>;
		findAndDeleteAll(text : string , params : any[] , Entity : Newable<T>) : Promise<T[]>;
		relatedEntities(text : string , params : any[]) : Promise<Object | null>;
}