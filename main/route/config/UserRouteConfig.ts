import { RouteOptionsConfig } from './RouteOptionsConfig';
import { RouteSearchCriteria } from './RouteSearchCriteria';

export class UserRouteConfig {

	public static search_criteria : RouteSearchCriteria[] = [

	new RouteSearchCriteria('email_address' , 'Email Address') ,
	new RouteSearchCriteria('matriculation_number' , 'Matriculation Number')];

	public static getInstance() : RouteOptionsConfig {

	return new RouteOptionsConfig('User' , 'User' , 'user' , 'user' , 'User' , 'user' , 'User' ,

		['student' , 'departmentPresident' , 'facultyPresident'] ,	['moderator' , 'administrator' , 'superAdministrator'] , ['hod' , 'dean'] , this.search_criteria);

	}

}