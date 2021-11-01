import { RouteSearchCriteria } from './RouteSearchCriteria';

export class RouteOptionsConfig {

	constructor(first : string , second : string , third : string , fourth : string , fifth : string ,
							query : string , word : string , nPrivilege : string[] , sPrivilege : string[] , lPrivilege : string[] , search_criteria? : RouteSearchCriteria[] , bucketName? : string) {

		this.first = first;
		this.second = second;
		this.third = third;
		this.fourth = fourth;
		this.fifth = fifth;
		this.query = query;
		this.word = word;
		this.nPrivilege = nPrivilege;
		this.sPrivilege = sPrivilege;
		this.lPrivilege = lPrivilege;
		this.search_criteria = search_criteria ? search_criteria : [];
		this.bucket_name = bucketName ? bucketName : "unknown";
	}

	private first : string;
	private second : string;
	private third : string;
	private fourth : string;
	private fifth : string;
	private query : string;
	private word : string;
	private nPrivilege : string[];
	private sPrivilege : string[];
	private lPrivilege : string[];
	private search_criteria : RouteSearchCriteria[];
	private bucket_name : string;

	public getFirst() : string {

		return this.first;
	}

	public getSecond() : string {

		return this.second;
	}

	public getThird() : string {

		return this.third;
	}

	public getFourth() : string {

		return this.fourth;
	}

	public getFifth() : string {

		return this.fifth;
	}

	public getQuery() : string {

		return this.query;
	}

	public getWord() : string {

		return this.word;
	}

	public getNPrivilege() : string[] {

		return this.nPrivilege;
	}

	public getSPrivilege() : string[] {

		return this.sPrivilege;
	}

	public getLPrivilege() : string[] {

		return this.lPrivilege;
	}

	public getRouteSearchCriteria() : RouteSearchCriteria[] {

		return this.search_criteria;
	}

	public getBucketName() : string {

		return this.bucket_name;
	}

}