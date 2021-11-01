import { RouteOptionsConfig } from './RouteOptionsConfig';
import { RouteSearchCriteria } from './RouteSearchCriteria';

export class EmailMessageTypeRouteConfig {

	public static search_criteria : RouteSearchCriteria[] = [

	new RouteSearchCriteria('title' , 'Title')];

	public static getInstance() : RouteOptionsConfig {

	return new RouteOptionsConfig('EmailMessageType' , 'Email Message Type' , 'email-message-type' , 'emailMessageType' , 'EmailMessageType' , 'email-message-type' , 'Email Message Type' ,

		['student' , 'departmentPresident' , 'facultyPresident'] ,	['moderator' , 'administrator' , 'superAdministrator'] , ['hod' , 'dean'] , this.search_criteria);

	}

}