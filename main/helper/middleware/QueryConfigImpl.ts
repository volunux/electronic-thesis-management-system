import { Request , Response , NextFunction } from 'express';
import { ParsedQs } from 'qs';
import { EntityQueryConfig } from '../../model/query/util/EntityQueryConfig';

export class QueryConfigImpl implements EntityQueryConfig {

	public parameterList : Map<string , string | string[]> = new Map<string , string | string[]>();

	public init(parameters : ParsedQs) : EntityQueryConfig {

			for (let key in parameters) {

				let value : string | string[] = parameters[key] as string | string[];

				this.parameterList.set(key , value);
			}

			return this;
	}

	public existsParameter(parameter : string) : boolean {

		let requestParam : string | string[] | undefined = this.parameterList.get(parameter);

		if (requestParam !== null && requestParam !== undefined) { return true; }

		else { return false; }

	}

	public getParameter(parameter : string) : string | null {

		let requestParam : string | string[] | undefined = this.parameterList.get(parameter);

		if (requestParam !== null && requestParam !== undefined) { 

			if (typeof requestParam == 'object') { return (<string[]>requestParam)[0]; }

			else { return requestParam; }
	}

		else { return null; }
	}

	public getParameters(parameter : string) : string[] | null {

		let requestParam : string | string[] | undefined = this.parameterList.get(parameter);

		if (requestParam !== null && requestParam !== undefined) { return <string[]>requestParam; }

		else { return null; }
	}

	public static createQueryConfigImpl(req : Request , res : Response , next : NextFunction) : void {

		let queryConfigImpl : EntityQueryConfig = new QueryConfigImpl();

		req.query = { ...req.query , ...req.body };

		req.queryConfig = queryConfigImpl.init(req.query);

		return next();
	}

}