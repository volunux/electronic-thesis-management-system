import { RouteOptionsConfig } from './RouteOptionsConfig';
import { RouteSearchCriteria } from './RouteSearchCriteria';

export class ThesisReviewRouteConfig {

	public static search_criteria : RouteSearchCriteria[] = [];

	public static getInstance() : RouteOptionsConfig {

	return new RouteOptionsConfig('ThesisReview' , 'Thesis Review' , 'thesis-review' , 'thesisReview' , 'ThesisReview' , 'thesis-review' , 'Thesis Review' ,

		['student' , 'departmentPresident' , 'facultyPresident'] ,	['moderator' , 'administrator' , 'superAdministrator'] , ['hod' , 'dean'] , this.search_criteria);

	}

}