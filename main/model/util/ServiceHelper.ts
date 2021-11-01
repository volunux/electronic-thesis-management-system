import { Newable } from '../../entity/interface/Newable';
import { EntityAll } from '../../entity/abstract/EntityAll';
import { QueryResultRow } from 'pg';

export class ServiceHelper {

	public static deleteMany(entries : string[]) : string {

		let entriesTransformed : string = entries.map((item : string) => { return `$$${item}$$`; }).join(' , ');

		return entriesTransformed;
	}

	public static rowsToObjectMapper<T extends Object>(rowsData : QueryResultRow[] , Entity : Newable<T>) : T[] {

		let entries : T[] = [];

		if (rowsData != null) {

			rowsData.forEach((record : QueryResultRow) => {

					let entry = new Entity(record);

					entries.push(entry);
			});

		}

			return entries;
	}
}