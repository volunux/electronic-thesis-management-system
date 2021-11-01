import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { UserSignatureRepository } from '../../repository/UserSignatureRepository';
import { UserSignatureRepositoryImpl } from '../../repository/impl/UserSignatureRepositoryImpl';
import { UserSignatureService } from '../UserSignatureService';
import { UserSignature } from '../../../entity/UserSignature';

export class UserSignatureServiceImpl implements UserSignatureService {

	private repository : UserSignatureRepository = new UserSignatureRepositoryImpl();

	public async findOne(slug : string) : Promise<UserSignature | null> {

		return this.repository.findOne(slug);
	} 

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<UserSignature[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<UserSignature> {

		return this.repository.addOne();
	} 

	public async save(entry : UserSignature) : Promise<UserSignature | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<UserSignature | null> {

		return this.repository.updateOne(slug);
	} 

	public async relatedEntities(entry : UserSignature) : Promise<UserSignature | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : UserSignature) : Promise<UserSignature | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<UserSignature | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<UserSignature | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<UserSignature[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<UserSignature[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<UserSignature[]> {

		return this.repository.findAndDeleteAll();
	}

}
