import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
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

	private queryTemplate : QueryTemplate<User> = new SimpleQueryTemplate<User>();

	private queryTemplateDisplay : QueryTemplate<UserProfilePhoto> = new SimpleQueryTemplate<UserProfilePhoto>();

	private queryTemplateSignature : QueryTemplate<UserSignature> = new SimpleQueryTemplate<UserSignature>();

	public async findOne(userId : number) : Promise<User | null> {

		let plan : DynamicQuery = ProfileQuery.findOne(userId);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , User);
	} 

	public async existsOne(userId : number) : Promise<boolean> {

		let plan : DynamicQuery = ProfileQuery.existsOne(userId);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async existsUserProfilePhoto(userId : number) : Promise<UserProfilePhoto | null> {

		let plan : DynamicQuery = ProfileQuery.existsUserProfilePhoto(userId);

		return await this.queryTemplateDisplay.entryExists(plan.getText() , plan.getValues() , UserProfilePhoto);
	} 

	public async existsUserSignature(userId : number) : Promise<UserSignature | null> {

		let plan : DynamicQuery = ProfileQuery.existsUserSignature(userId);

		return await this.queryTemplateSignature.entryExists(plan.getText() , plan.getValues() , UserSignature);
	} 

	public async saveUserProfilePhoto(userId : number , entry : UserProfilePhoto) : Promise<UserProfilePhoto | null> {

		let plan : DynamicQuery = ProfileQuery.saveUserProfilePhoto(userId , <UserProfilePhoto>entry);

		return await this.queryTemplateDisplay.save(plan.getText() , plan.getValues() , UserProfilePhoto);
	}

	public async saveUserSignature(userId : number , entry : UserSignature) : Promise<UserSignature | null> {

		let plan : DynamicQuery = ProfileQuery.saveUserSignature(userId , <UserSignature>entry);

		return await this.queryTemplateSignature.save(plan.getText() , plan.getValues() , UserSignature);
	}

	public async updateOne(userId : number) : Promise<User | null> {

		let plan : DynamicQuery = ProfileQuery.updateOne(userId);

		let user : User | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , User);

		await this.relatedEntities(<User>user);

		return user;
	} 

	public async relatedEntities(entry : User) : Promise<User | null> {

		let plan : DynamicQuery = ProfileQuery.relatedEntities();

		let faculties : Faculty[] = [];

		let departments : Department[] = [];

		let levels : Level[] = [];

		let countries : Country[] = [];

		let result : Object | null = await this.queryTemplate.relatedEntities(plan.getText() , plan.getValues());

		if (result !== null && entry !== null) {

				let listResult : Object[] = (<any>result).result.Faculty;

				let listResult2 : Object[] = (<any>result).result.Department;

				let listResult3 : Object[] = (<any>result).result.Level;

				let listResult4 : Object[] = (<any>result).result.Country;

				faculties = ServiceHelper.rowsToObjectMapper<Faculty>(listResult , Faculty);

				departments = ServiceHelper.rowsToObjectMapper<Department>(listResult2 , Department);

				levels = ServiceHelper.rowsToObjectMapper<Level>(listResult3 , Level);

				countries = ServiceHelper.rowsToObjectMapper<Country>(listResult4 , Country);

				entry.setFaculties(faculties);

				entry.setDepartments(departments);

				entry.setLevels(levels);

				entry.setCountries(countries); }

		return entry;
	} 

	public async update(userId : number , entry : User) : Promise<User | null> {

		let plan : DynamicQuery = ProfileQuery.update(userId , <User>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , User);
	}

	public async deleteProfilePhoto(userId : number) : Promise<UserProfilePhoto | null> {

		let plan : DynamicQuery = ProfileQuery.deleteProfilePhoto(userId);

		return await this.queryTemplateDisplay.delete(plan.getText() , plan.getValues() , UserProfilePhoto);
	} 

	public async deleteProfilePhotoByKey(key : string) : Promise<UserProfilePhoto | null> {

		let plan : DynamicQuery = ProfileQuery.deleteProfilePhotoByKey(key);

		return await this.queryTemplateDisplay.delete(plan.getText() , plan.getValues() , UserProfilePhoto);
	} 

	public async deleteSignatureByKey(key : string) : Promise<UserSignature | null> {

		let plan : DynamicQuery = ProfileQuery.deleteSignatureByKey(key);

		return await this.queryTemplateSignature.delete(plan.getText() , plan.getValues() , UserSignature);
	} 

	public async deleteSignature(userId : number) : Promise<UserSignature | null> {

		let plan : DynamicQuery = ProfileQuery.deleteSignature(userId);

		return await this.queryTemplateSignature.delete(plan.getText() , plan.getValues() , UserSignature);
	} 

	public async deactivateOne(userId : number) : Promise<User | null> {

		let plan : DynamicQuery = ProfileQuery.deactivateOne(userId);

		return await this.queryTemplate.executeTyped(plan.getText() , plan.getValues() , User);
	} 

	public async deactivate(userId : number) : Promise<User | null> {

		let plan : DynamicQuery = ProfileQuery.deactivate(userId);

		return await this.queryTemplate.executeTyped(plan.getText() , plan.getValues() , User);
	} 

	public async reactivateOne(userId : number) : Promise<User | null> {

		let plan : DynamicQuery = ProfileQuery.reactivateOne(userId);

		return await this.queryTemplate.executeTyped(plan.getText() , plan.getValues() , User);
	} 

	public async reactivate(userId : number) : Promise<User | null> {

		let plan : DynamicQuery = ProfileQuery.reactivate(userId);

		return await this.queryTemplate.executeTyped(plan.getText() , plan.getValues() , User);
	} 

}