import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { Status } from '../../../entity/Status';
import { PaymentMethodRepository } from '../PaymentMethodRepository';
import { PaymentMethodQuery } from '../../query/PaymentMethodQuery';
import { PaymentMethod } from '../../../entity/PaymentMethod';

export class PaymentMethodRepositoryImpl implements PaymentMethodRepository {

	private queryTemplate : QueryTemplate<PaymentMethod> = new SimpleQueryTemplate<PaymentMethod>();

	public async findOne(slug : string) : Promise<PaymentMethod | null> {

		let plan : DynamicQuery = PaymentMethodQuery.findOne(slug);

		return await this.queryTemplate.findOne(plan.getText() , plan.getValues() , PaymentMethod);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		let plan : DynamicQuery = PaymentMethodQuery.existsOne(slug);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<PaymentMethod[]> {

		let plan : DynamicQuery = PaymentMethodQuery.findAll(eqp);

		return await this.queryTemplate.findAll(plan.getText() , plan.getValues() , PaymentMethod);
	} 

	public async addOne() : Promise<PaymentMethod> {

		let paymentMethod : PaymentMethod = new PaymentMethod({});

		await this.relatedEntities(paymentMethod);

		return paymentMethod;
	} 

	public async save(entry : PaymentMethod) : Promise<PaymentMethod | null> {

		let plan : DynamicQuery = PaymentMethodQuery.save(<PaymentMethod>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , PaymentMethod);
	}

	public async updateOne(slug : string) : Promise<PaymentMethod | null> {

		let plan : DynamicQuery = PaymentMethodQuery.updateOne(slug);

		let paymentMethod : PaymentMethod | null = await this.queryTemplate.updateOne(plan.getText() , plan.getValues() , PaymentMethod);

		await this.relatedEntities(<PaymentMethod>paymentMethod);

		return paymentMethod;
	}

	public async update(slug : string , entry : PaymentMethod) : Promise<PaymentMethod | null> {

		let plan : DynamicQuery = PaymentMethodQuery.update(slug , <PaymentMethod>entry);

		return await this.queryTemplate.update(plan.getText() , plan.getValues() , PaymentMethod);
	}

	public async deleteOne(slug : string) : Promise<PaymentMethod | null> {

		let plan : DynamicQuery = PaymentMethodQuery.deleteOne(slug);

		return await this.queryTemplate.deleteOne(plan.getText() , plan.getValues() , PaymentMethod);
	} 

	public async remove(slug : string) : Promise<PaymentMethod | null> {

		let plan : DynamicQuery = PaymentMethodQuery.remove(slug);

		return await this.queryTemplate.delete(plan.getText() , plan.getValues() , PaymentMethod);
	} 

	public async deleteMany(entries : string) : Promise<PaymentMethod[]> {

		let plan : DynamicQuery = PaymentMethodQuery.deleteMany(entries);

		return await this.queryTemplate.deleteMany(plan.getText() , plan.getValues() , PaymentMethod);
	}

	public async deleteAll() : Promise<PaymentMethod[]> {

		let plan : DynamicQuery = PaymentMethodQuery.deleteAll();

		return await this.queryTemplate.deleteAll(plan.getText() , plan.getValues() , PaymentMethod);
	}

	public async findAndDeleteAll() : Promise<PaymentMethod[]> {

		let plan : DynamicQuery = PaymentMethodQuery.findAndDeleteAll();

		return await this.queryTemplate.findAndDeleteAll(plan.getText() , plan.getValues() , PaymentMethod);
	}

	public async relatedEntities(entry : PaymentMethod) : Promise<PaymentMethod | null> {

		let plan : DynamicQuery = PaymentMethodQuery.relatedEntities();

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