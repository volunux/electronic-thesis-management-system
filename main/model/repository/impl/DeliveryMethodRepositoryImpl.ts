import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Status } from '../../../entity/Status';
import { DeliveryMethodRepository } from '../DeliveryMethodRepository';
import { DeliveryMethodQuery } from '../../query/DeliveryMethodQuery';
import { DeliveryMethod } from '../../../entity/DeliveryMethod';

export class DeliveryMethodRepositoryImpl implements DeliveryMethodRepository {

	private queryTemplate : QueryTemplate<DeliveryMethod> = new SimpleQueryTemplate<DeliveryMethod>();

	public async findOne(slug : string) : Promise<DeliveryMethod | null> {

		let plan : DynamicQuery = DeliveryMethodQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , DeliveryMethod);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = DeliveryMethodQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<DeliveryMethod[]> {

		let plan : DynamicQuery = DeliveryMethodQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , DeliveryMethod);
	} 

	public async addOne() : Promise<DeliveryMethod> {

		let deliveryMethod : DeliveryMethod = new DeliveryMethod({});

		await this.relatedEntities(deliveryMethod);

		return deliveryMethod;
	} 

	public async save(entry : DeliveryMethod) : Promise<DeliveryMethod | null> {

		let plan : DynamicQuery = DeliveryMethodQuery.save(<DeliveryMethod>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , DeliveryMethod);
	}

	public async updateOne(slug : string) : Promise<DeliveryMethod | null> {

		let plan : DynamicQuery = DeliveryMethodQuery.updateOne(slug);

		let deliveryMethod : DeliveryMethod | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , DeliveryMethod);

		await this.relatedEntities(<DeliveryMethod>deliveryMethod);

		return deliveryMethod;
	}

	public async update(slug : string , entry : DeliveryMethod) : Promise<DeliveryMethod | null> {

		let plan : DynamicQuery = DeliveryMethodQuery.update(slug , <DeliveryMethod>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , DeliveryMethod);
	}

	public async deleteOne(slug : string) : Promise<DeliveryMethod | null> {

		let plan : DynamicQuery = DeliveryMethodQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , DeliveryMethod);
	} 

	public async remove(slug : string) : Promise<DeliveryMethod | null> {

		let plan : DynamicQuery = DeliveryMethodQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , DeliveryMethod);
	} 

	public async deleteMany(entries : string) : Promise<DeliveryMethod[]> {

		let plan : DynamicQuery = DeliveryMethodQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , DeliveryMethod);
	}

	public async deleteAll() : Promise<DeliveryMethod[]> {

		let plan : DynamicQuery = DeliveryMethodQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , DeliveryMethod);
	}

	public async findAndDeleteAll() : Promise<DeliveryMethod[]> {

		let plan : DynamicQuery = DeliveryMethodQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , DeliveryMethod);
	}

	public async relatedEntities(entry : DeliveryMethod) : Promise<DeliveryMethod | null> {

		let plan : DynamicQuery = DeliveryMethodQuery.relatedEntities();

		let statuses : Status[] = [];

		let result : Object | null = await this.queryTemplate.relatedEntities(plan.getText() , plan.getValues());

		if (result !== null && entry !== null) {

			let listResult : Object[] = (<any>result).Status;

			statuses = ServiceHelper.rowsToObjectMapper<Status>(listResult , Status);

			entry.setStatuses(statuses);
		}

		return entry;
	} 


}
