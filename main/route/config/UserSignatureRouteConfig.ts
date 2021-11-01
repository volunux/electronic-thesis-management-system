import { RouteOptionsConfig } from './RouteOptionsConfig';
import { RouteSearchCriteria } from './RouteSearchCriteria';

export class UserSignatureRouteConfig {

	public static search_criteria : RouteSearchCriteria[] = [

	new RouteSearchCriteria('email_address' , 'email_address') ,
	new RouteSearchCriteria('username' , 'username')];

	public static getInstance() : RouteOptionsConfig {

	return new RouteOptionsConfig('UserSignature' , 'User Signature' , 'user-signature' , 'thesisGrade' , 'UserSignature' , 'user-signature' , 'User Signature' ,
		['student' , 'departmentPresident' , 'facultyPresident'] ,	['moderator' , 'administrator' , 'superAdministrator'] , ['hod' , 'dean'] , this.search_criteria);

	}

}