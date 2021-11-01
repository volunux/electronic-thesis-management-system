import { RouteOptionsConfig } from './RouteOptionsConfig';
import { RouteSearchCriteria } from './RouteSearchCriteria';

export class ThesisCoverImageRouteConfig {

	public static search_criteria : RouteSearchCriteria[] = [];

	public static getInstance() : RouteOptionsConfig {

	return new RouteOptionsConfig('ThesisCoverImage' , 'Thesis Cover Image' , 'thesis-cover-image' , 'thesisReply' , 'ThesisCoverImage' , 'thesis-cover-image' , 'Thesis Cover Image' ,

		['student' , 'departmentPresident' , 'facultyPresident'] ,	['moderator' , 'administrator' , 'superAdministrator'] , ['hod' , 'dean'] , this.search_criteria);

	}

}