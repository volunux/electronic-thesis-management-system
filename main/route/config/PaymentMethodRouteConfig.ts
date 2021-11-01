import { RouteOptionsConfig } from './RouteOptionsConfig';
import { RouteSearchCriteria } from './RouteSearchCriteria';

export class PaymentMethodRouteConfig {

	public static search_criteria : RouteSearchCriteria[] = [

	new RouteSearchCriteria('title' , 'Title')];

	public static getInstance() : RouteOptionsConfig {

	return new RouteOptionsConfig('PaymentMethod' , 'Payment Method' , 'payment-method' , 'paymentMethod' , 'PaymentMethod' , 'payment-method' , 'Payment Method' ,

		['student' , 'departmentPresident' , 'facultyPresident'] ,	['moderator' , 'administrator' , 'superAdministrator'] , ['hod' , 'dean'] , this.search_criteria);

	}

}