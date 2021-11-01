import { ParsedQs } from 'qs';

export interface EntityQueryConfig {

	init(variables : ParsedQs) : EntityQueryConfig;

	existsParameter(porameter : string) : boolean;

	getParameter(parameter : string) : string | null;

	getParameters(parameter : string) : string[] | null;

}