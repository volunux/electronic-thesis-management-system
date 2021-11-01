import { RouteOptionsConfig } from './RouteOptionsConfig';
import { RouteSearchCriteria } from './RouteSearchCriteria';

export class ThesisRouteConfig {

	public static search_criteria : RouteSearchCriteria[] = [

	new RouteSearchCriteria('title' , 'Title') ,
	new RouteSearchCriteria('publication_year' , 'Publication Year') ,
	new RouteSearchCriteria('author' , 'Author')];

	public static getInstance() : RouteOptionsConfig {

	return new RouteOptionsConfig('Thesis' , 'Thesis' , 'thesis' , 'thesis' , 'Thesis' , 'thesis' , 'Thesis' ,

		['student' , 'departmentPresident' , 'facultyPresident'] ,	['moderator' , 'administrator' , 'superAdministrator'] , ['hod' , 'dean'] , this.search_criteria , );

	}

}