import { QueryResult , QueryResultRow } from 'pg';
import { Query } from '../../query/util/Query';
import { QueryTemplate } from './QueryTemplate';
import { Newable } from '../../../entity/interface/Newable';
import { ServiceHelper } from '../../util/ServiceHelper';

export class SimpleQueryTemplate<T> implements QueryTemplate<T> {

	private dataSource : Query = Query;

	public async findOne(text : string , params : any[] , Entity : Newable<T>) : Promise<T | null> {

		let entry : T | null = null;

		try {

			let result : QueryResult = await Query.execute(text , params);

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				entry = new Entity(singleResult);
			}

		} catch(err : any) { console.log(err); }

		return entry;
	}	

	public async executePlain(text : string , params : any[]) : Promise<Object | null> {

		let entry : Object | null = null;

		try {

			let result : QueryResult = await Query.execute(text , params);

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				entry = singleResult;
			}

		} catch(err : any) { console.log(err); }

		return entry;
	}	

	public async execute(text : string , params : any[]) : Promise<boolean> {

		let executed : boolean = false;

		try {

			let result : QueryResult = await Query.execute(text , params);

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				executed = true;
			}

		} catch(err : any) { console.log(err); }

		return executed;
	}

	public async existsOne(text : string , params : any[]) : Promise<boolean> {

		let exists : boolean = false;

		try {

			let result : QueryResult = await Query.execute(text , params);

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				exists = true;
			}

		} catch(err : any) { console.log(err); }

		return exists;
	}

	public async findAll(text : string , params : any[] , Entity : Newable<T>) : Promise<T[]> {

		let entries : T[] = [];

		try {

			let result : QueryResult = await Query.execute(text , params);

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				entries = ServiceHelper.rowsToObjectMapper<T>(listResult , Entity);
			}

		} catch(err : any) { console.log(err); }

		return entries;
	} 

	public async save(text : string , params : any[] , Entity : Newable<T>) : Promise<T | null> {

		let entry : T | null = null;

		try {

			let result : QueryResult = await Query.execute(text , params);

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				entry = new Entity(singleResult);
			}

		} catch(err : any) { console.log(err); }

		return entry;
	}

	public async updateOne(text : string , params : any[] , Entity : Newable<T>) : Promise<T | null> {

		let entry : T | null = null;

		try {

			let result : QueryResult = await Query.execute(text , params);

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				entry = new Entity(singleResult);
			}

		} catch(err : any) { console.log(err); }

		return entry;
	}

	public async update(text : string , params : any[] , Entity : Newable<T>) : Promise<T | null> {

		let entry : T | null = null;

		try {

			let result : QueryResult = await Query.execute(text , params);

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				entry = new Entity(singleResult);
			}

		} catch(err : any) { console.log(err); }

		return entry;
	}

	public async deleteOne(text : string , params : any[] , Entity : Newable<T>) : Promise<T | null> {

		let entry : T | null = null;

		try {

			let result : QueryResult = await Query.execute(text , params);

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				entry = new Entity(singleResult);
			}

		} catch(err : any) { console.log(err); }

		return entry;
	} 

	public async delete(text : string , params : any[] , Entity : Newable<T>) : Promise<T | null> {

		let entry : T | null = null;

		try {

			let result : QueryResult = await Query.execute(text , params);

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				entry = new Entity(singleResult);
			}

		} catch(err : any) { console.log(err); }

		return entry;
	}

	public async deleteMany(text : string , params : any[] , Entity : Newable<T>) : Promise<T[]> {

		let entries : T[] = [];

		try {

			let result : QueryResult = await Query.execute(text , params);

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				entries = ServiceHelper.rowsToObjectMapper<T>(listResult , Entity);
			}

		} catch(err : any) { console.log(err); }

		return entries;
	}

	public async deleteAll(text : string , params : any[] , Entity : Newable<T>) : Promise<T[]> {

		let entries : T[] = [];

		try {

			let result : QueryResult = await Query.execute(text , params);

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				entries = ServiceHelper.rowsToObjectMapper<T>(listResult , Entity);
			}

		} catch(err : any) { console.log(err); }

		return entries;
	}

	public async findAndDeleteAll(text : string , params : any[] , Entity : Newable<T>) : Promise<T[]> {

		let entries : T[] = [];

		try {

			let result : QueryResult = await Query.execute(text , params);

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = result.rows;

				entries = ServiceHelper.rowsToObjectMapper<T>(listResult , Entity);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return entries;
	}

	public async relatedEntities(text : string , params : any[]) : Promise<Object | null> {

		let entry : Object | null = null;

		try {

			let result : QueryResult = await Query.execute(text , params);

			if ((<QueryResultRow[]>result.rows).length > 0) {

				entry = (<QueryResultRow>result.rows[0]).result;

			}

		} catch(err : any) { console.log('An error has occured'); }

		return entry;
	} 

}