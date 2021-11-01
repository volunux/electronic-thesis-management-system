import { RouteOptionsConfig } from './RouteOptionsConfig';
import { RouteSearchCriteria } from './RouteSearchCriteria';

export class LevelRouteConfig {

	public static search_criteria : RouteSearchCriteria[] = [

	new RouteSearchCriteria('name' , 'Name') ,
	new RouteSearchCriteria('abbreviation' , 'Abbreviation'),
	new RouteSearchCriteria('status' , 'Status')];

	public static getInstance() : RouteOptionsConfig {

	return new RouteOptionsConfig('Level' , 'Level' , 'level' , 'level' , 'Level' , 'level' , 'Level' ,

		['student' , 'departmentPresident' , 'facultyPresident'] ,	['moderator' , 'administrator' , 'superAdministrator'] , ['hod' , 'dean'] , this.search_criteria);

	}

}