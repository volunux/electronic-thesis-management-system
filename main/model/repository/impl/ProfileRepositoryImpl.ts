import { QueryResult , QueryResultRow } from 'pg';
import { Query } from '../../query/util/Query';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Faculty } from '../../../entity/Faculty';
import { Department } from '../../../entity/Department';
import { Level } from '../../../entity/Level';
import { Country } from '../../../entity/Country';
import { UserProfilePhoto } from '../../../entity/UserProfilePhoto';
import { UserSignature } from '../../../entity/UserSignature';
import { User } from '../../../entity/User';
import { ProfileRepository } from '../ProfileRepository';
import { ProfileQuery } from '../../query/ProfileQuery';

export class ProfileRepositoryImpl implements ProfileRepository {

	public async findOne(userId : number) : Promise<User | null> {

		let plan : DynamicQuery = ProfileQuery.findOne(userId);

		let user : User | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return user;
	} 

	public async existsOne(userId : number) : Promise<boolean> {

		let plan : DynamicQuery = ProfileQuery.existsOne(userId);

		let user : User | null = null;

		let exists : boolean = false;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);

				exists = true;
			}

		} catch(err : any) { console.log('An error has occured'); }

		return exists;
	} 

	public async existsUserProfilePhoto(userId : number) : Promise<UserProfilePhoto | null> {

		let plan : DynamicQuery = ProfileQuery.existsUserProfilePhoto(userId);

		let userProfilePhoto : UserProfilePhoto | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				userProfilePhoto = new UserProfilePhoto(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return userProfilePhoto;
	} 

	public async existsUserSignature(userId : number) : Promise<UserSignature | null> {

		let plan : DynamicQuery = ProfileQuery.existsUserSignature(userId);

		let userSignature : UserSignature | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				userSignature = new UserSignature(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return userSignature;
	} 

	public async saveUserProfilePhoto(userId : number , entry : UserProfilePhoto) : Promise<UserProfilePhoto | null> {

		let plan : DynamicQuery = ProfileQuery.saveUserProfilePhoto(userId , <UserProfilePhoto>entry);

		let userProfilePhoto : UserProfilePhoto | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				userProfilePhoto = new UserProfilePhoto(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return userProfilePhoto;
	}

	public async saveUserSignature(userId : number , entry : UserSignature) : Promise<UserSignature | null> {

		let plan : DynamicQuery = ProfileQuery.saveUserSignature(userId , <UserSignature>entry);

		let userSignature : UserSignature | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				userSignature = new UserSignature(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return userSignature;
	}

	public async updateOne(userId : number) : Promise<User | null> {

		let plan : DynamicQuery = ProfileQuery.updateOne(userId);

		let user : User | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);

				await this.relatedEntities(user);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return user;
	} 

	public async relatedEntities(entry : User) : Promise<User | null> {

		let plan : DynamicQuery = ProfileQuery.relatedEntities();

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let levels : Level[] = [];

		let countries : Country[] = [];

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : QueryResultRow[] = (<QueryResultRow>result.rows[0]).result.Faculty;

				let listResult2 : QueryResultRow[] = (<QueryResultRow>result.rows[0]).result.Department;

				let listResult3 : QueryResultRow[] = (<QueryResultRow>result.rows[0]).result.Level;

				let listResult4 : QueryResultRow[] = (<QueryResultRow>result.rows[0]).result.Country;

				faculties = ServiceHelper.rowsToObjectMapper<Faculty>(listResult , Faculty);

				departments = ServiceHelper.rowsToObjectMapper<Department>(listResult2 , Department);

				levels = ServiceHelper.rowsToObjectMapper<Level>(listResult3 , Level);

				countries = ServiceHelper.rowsToObjectMapper<Country>(listResult4 , Country);

				entry.setFaculties(faculties);

				entry.setDepartments(departments);

				entry.setLevels(levels);

				entry.setCountries(countries);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return entry;
	} 

	public async update(userId : number , entry : User) : Promise<User | null> {

		let plan : DynamicQuery = ProfileQuery.update(userId , <User>entry);

		let user : User | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return user;
	}

	public async deleteProfilePhoto(userId : number) : Promise<UserProfilePhoto | null> {

		let plan : DynamicQuery = ProfileQuery.deleteProfilePhoto(userId);

		let userProfilePhoto : UserProfilePhoto | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				userProfilePhoto = new UserProfilePhoto(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return userProfilePhoto;
	} 

	public async deleteProfilePhotoByKey(key : string) : Promise<UserProfilePhoto | null> {

		let plan : DynamicQuery = ProfileQuery.deleteProfilePhotoByKey(key);

		let userProfilePhoto : UserProfilePhoto | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				userProfilePhoto = new UserProfilePhoto(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return userProfilePhoto;
	} 

	public async deleteSignatureByKey(key : string) : Promise<UserSignature | null> {

		let plan : DynamicQuery = ProfileQuery.deleteSignatureByKey(key);

		let userSignature : UserSignature | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				userSignature = new UserSignature(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return userSignature;
	} 

	public async deleteSignature(userId : number) : Promise<UserSignature | null> {

		let plan : DynamicQuery = ProfileQuery.deleteSignature(userId);

		let userSignature : UserSignature | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				userSignature = new UserSignature(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return userSignature;
	} 

	public async deactivateOne(userId : number) : Promise<User | null> {

		let plan : DynamicQuery = ProfileQuery.deactivateOne(userId);

		let user : User | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return user;
	} 

	public async deactivate(userId : number) : Promise<User | null> {

		let plan : DynamicQuery = ProfileQuery.deactivate(userId);

		let user : User | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return user;
	} 

	public async reactivateOne(userId : number) : Promise<User | null> {

		let plan : DynamicQuery = ProfileQuery.reactivateOne(userId);

		let user : User | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return user;
	} 

	public async reactivate(userId : number) : Promise<User | null> {

		let plan : DynamicQuery = ProfileQuery.reactivate(userId);

		let user : User | null = null;

		try {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let singleResult : QueryResultRow = result.rows[0];

				user = new User(singleResult);
			}

		} catch(err : any) { console.log('An error has occured'); }

		return user;
	} 

}