import { RouteOptionsConfig } from './RouteOptionsConfig';
import { RouteSearchCriteria } from './RouteSearchCriteria';

export class RoleRouteConfig {

	public static search_criteria : RouteSearchCriteria[] = [

	new RouteSearchCriteria('name' , 'Name') ,
	new RouteSearchCriteria('word' , 'Word'),
	new RouteSearchCriteria('status' , 'Status')];

	public static getInstance() : RouteOptionsConfig {

	return new RouteOptionsConfig('Role' , 'Role' , 'role' , 'role' , 'Role' , 'role' , 'Role' ,

		['student' , 'departmentPresident' , 'facultyPresident'] ,	['moderator' , 'administrator' , 'superAdministrator'] , ['hod' , 'dean'] , this.search_criteria);

	}

}