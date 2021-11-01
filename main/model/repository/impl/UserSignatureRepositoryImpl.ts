import { QueryResult , QueryResultRow } from 'pg';
import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { UserSignatureQuery } from '../../query/UserSignatureQuery';
import { UserSignatureRepository } from '../UserSignatureRepository';
import { UserSignature } from '../../../entity/UserSignature';

export class UserSignatureRepositoryImpl implements UserSignatureRepository {

	private queryTemplate : QueryTemplate<UserSignature> = new SimpleQueryTemplate<UserSignature>();

	public async findOne(slug : string) : Promise<UserSignature | null> {

		let plan : DynamicQuery = UserSignatureQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , UserSignature);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = UserSignatureQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<UserSignature[]> {

		let plan : DynamicQuery = UserSignatureQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , UserSignature);
	} 

	public async addOne() : Promise<UserSignature> {

		return new UserSignature({});
	} 

	public async save(entry : UserSignature) : Promise<UserSignature | null> {

		return null;
	}

	public async updateOne(slug : string) : Promise<UserSignature | null> {

		return null;
	}

	public async update(slug : string , entry : UserSignature) : Promise<UserSignature | null> {

		return null;
	}

	public async deleteOne(slug : string) : Promise<UserSignature | null> {

		let plan : DynamicQuery = UserSignatureQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , UserSignature);
	} 

	public async remove(slug : string) : Promise<UserSignature | null> {

		let plan : DynamicQuery = UserSignatureQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , UserSignature);
	} 

	public async deleteMany(entries : string) : Promise<UserSignature[]> {

		let plan : DynamicQuery = UserSignatureQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , UserSignature);
	}

	public async deleteAll() : Promise<UserSignature[]> {

		let plan : DynamicQuery = UserSignatureQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , UserSignature);
	}

	public async findAndDeleteAll() : Promise<UserSignature[]> {

		let plan : DynamicQuery = UserSignatureQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , UserSignature);
	}

	public async relatedEntities(entry : UserSignature) : Promise<UserSignature | null> {

		return null;
	} 

}
