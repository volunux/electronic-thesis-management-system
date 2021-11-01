import { RouteOptionsConfig } from './RouteOptionsConfig';
import { RouteSearchCriteria } from './RouteSearchCriteria';

export class UserProfilePhotoRouteConfig {

	public static search_criteria : RouteSearchCriteria[] = [

	new RouteSearchCriteria('email_address' , 'email_address') ,
	new RouteSearchCriteria('username' , 'username')];

	public static getInstance() : RouteOptionsConfig {

	return new RouteOptionsConfig('UserProfilePhoto' , 'User Profile Photo' , 'user-profile-photo' , 'thesisGrade' , 'UserProfilePhoto' , 'user-profile-photo' , 'User Profile Photo' ,
		['student' , 'departmentPresident' , 'facultyPresident'] ,	['moderator' , 'administrator' , 'superAdministrator'] , ['hod' , 'dean'] , this.search_criteria);

	}

}