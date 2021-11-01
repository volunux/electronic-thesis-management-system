import { RouteOptionsConfig } from './RouteOptionsConfig';
import { RouteSearchCriteria } from './RouteSearchCriteria';

export class ThesisReplyRouteConfig {

	public static search_criteria : RouteSearchCriteria[] = [];

	public static getInstance() : RouteOptionsConfig {

	return new RouteOptionsConfig('ThesisReply' , 'Thesis Reply' , 'thesis-reply' , 'thesisReply' , 'ThesisReply' , 'thesis-reply' , 'Thesis Reply' ,

		['student' , 'departmentPresident' , 'facultyPresident'] ,	['moderator' , 'administrator' , 'superAdministrator'] , ['hod' , 'dean'] , this.search_criteria);

	}

}