import { RouteOptionsConfig } from './RouteOptionsConfig';
import { RouteSearchCriteria } from './RouteSearchCriteria';

export class UserRouteConfig {

	public static search_criteria : RouteSearchCriteria[] = [];

	public static getInstance() : RouteOptionsConfig {

	return new RouteOptionsConfig('User' , 'User' , 'user' , 'user' , 'User' , 'user' , 'User' ,

		['student' , 'departmentPresident' , 'facultyPresident'] ,	['moderator' , 'administrator' , 'superAdministrator'] , ['hod' , 'dean'] , this.search_criteria);

	}

}