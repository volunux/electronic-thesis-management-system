import { RouteOptionsConfig } from './RouteOptionsConfig';
import { RouteSearchCriteria } from './RouteSearchCriteria';

export class FacultyRouteConfig {

	public static search_criteria : RouteSearchCriteria[] = [

	new RouteSearchCriteria('name' , 'Name') ,
	new RouteSearchCriteria('abbreviation' , 'Abbreviation'),
	new RouteSearchCriteria('status' , 'Status')];

	public static getInstance() : RouteOptionsConfig {

	return new RouteOptionsConfig('Faculty' , 'Faculty' , 'faculty' , 'faculty' , 'Faculty' , 'faculty' , 'Faculty' ,

		['student' , 'departmentPresident' , 'facultyPresident'] ,	['moderator' , 'administrator' , 'superAdministrator'] , ['hod' , 'dean'] , this.search_criteria);

	}

}