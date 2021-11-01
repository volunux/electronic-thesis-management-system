import { RouteOptionsConfig } from './RouteOptionsConfig';
import { RouteSearchCriteria } from './RouteSearchCriteria';

export class EmailMessageTemplateRouteConfig {

	public static search_criteria : RouteSearchCriteria[] = [

	new RouteSearchCriteria('title' , 'Title') ,
	new RouteSearchCriteria('type' , 'Message Type')];

	public static getInstance() : RouteOptionsConfig {

	return new RouteOptionsConfig('EmailMessageTemplate' , 'Email Message Template' , 'email-message-template' , 'emailMessageTemplate' , 'EmailMessageTemplate' , 'email-message-template' , 'Email Message Template' ,

		['student' , 'departmentPresident' , 'facultyPresident'] ,	['moderator' , 'administrator' , 'superAdministrator'] , ['hod' , 'dean'] , this.search_criteria);

	}

}