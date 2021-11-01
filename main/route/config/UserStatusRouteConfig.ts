import { RouteOptionsConfig } from './RouteOptionsConfig';
import { RouteSearchCriteria } from './RouteSearchCriteria';

export class UserStatusRouteConfig {

	public static search_criteria : RouteSearchCriteria[] = [

	new RouteSearchCriteria('name' , 'Name') ,
	new RouteSearchCriteria('word' , 'Word')];

	public static getInstance() : RouteOptionsConfig {

	return new RouteOptionsConfig('UserStatus' , 'User Status' , 'user-status' , 'userStatus' , 'UserStatus' , 'user-status' , 'User Status' ,

		['student' , 'departmentPresident' , 'facultyPresident'] ,	['moderator' , 'administrator' , 'superAdministrator'] , ['hod' , 'dean'] , this.search_criteria);

	}

}