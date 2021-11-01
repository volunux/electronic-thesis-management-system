import { RouteOptionsConfig } from './RouteOptionsConfig';
import { RouteSearchCriteria } from './RouteSearchCriteria';

export class OrderRouteConfig {

	public static search_criteria : RouteSearchCriteria[] = [

	new RouteSearchCriteria('amount' , 'Amount') ,
	new RouteSearchCriteria('unit_price' , 'Price'),
	new RouteSearchCriteria('quantity' , 'Quantity')];

	public static getInstance() : RouteOptionsConfig {

	return new RouteOptionsConfig('Order' , 'Order' , 'order' , 'order' , 'Order' , 'order' , 'Order' ,

		['student' , 'departmentPresident' , 'facultyPresident'] ,	['moderator' , 'administrator' , 'superAdministrator'] , ['hod' , 'dean'] , this.search_criteria);

	}

}