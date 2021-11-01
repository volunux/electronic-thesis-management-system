import { RouteOptionsConfig } from './RouteOptionsConfig';
import { RouteSearchCriteria } from './RouteSearchCriteria';

export class DeliveryMethodRouteConfig {

	public static search_criteria : RouteSearchCriteria[] = [

	new RouteSearchCriteria('title' , 'Title')];

	public static getInstance() : RouteOptionsConfig {

	return new RouteOptionsConfig('DeliveryMethod' , 'Delivery Method' , 'delivery-method' , 'deliveryMethod' , 'DeliveryMethod' , 'delivery-method' , 'Delivery Method' ,

		['student' , 'departmentPresident' , 'facultyPresident'] ,	['moderator' , 'administrator' , 'superAdministrator'] , ['hod' , 'dean'] , this.search_criteria);

	}

}