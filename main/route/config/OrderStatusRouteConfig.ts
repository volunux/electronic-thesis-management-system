import { RouteOptionsConfig } from './RouteOptionsConfig';
import { RouteSearchCriteria } from './RouteSearchCriteria';

export class OrderStatusRouteConfig {

	public static search_criteria : RouteSearchCriteria[] = [];

	public static getInstance() : RouteOptionsConfig {

	return new RouteOptionsConfig('OrderStatus' , 'Order Status' , 'order-status' , 'orderReply' , 'OrderStatus' , 'order-status' , 'Order Status' ,

		['student' , 'departmentPresident' , 'facultyPresident'] ,	['moderator' , 'administrator' , 'superAdministrator'] , ['hod' , 'dean'] , this.search_criteria);

	}

}