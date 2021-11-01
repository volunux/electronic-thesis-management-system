import { Pool , PoolClient , QueryResult } from 'pg';
import { DBConnection } from '../../../config/db/DBConnection';

export class Query {

	private static getConn() : Pool {

	 return DBConnection.getPool(); }
	
	static send2(text : string , params : string[] , callback : Function) : void {

			const start = Date.now();

		return Query.getConn().query(text , params , (err : Error , result : QueryResult<any>) => {

       if (err) console.log(err);

      const duration = Date.now() - start

      	if (result) {

		      console.log('executed query', { text , duration , rows : result.rowCount })

      		console.log(result); }

      	callback(err , result);
		});

	}

	static execute(text : string, params : string[]) : Promise<QueryResult> {

		return Query.getConn().query(text , params);
	}

	static getClient() : Promise<PoolClient> {

		return Query.getConn().connect();
	}

	static try() : void {

		Query.getConn().query("" , [] , (err : Error , result : QueryResult<any>) => {

		});
	}
}