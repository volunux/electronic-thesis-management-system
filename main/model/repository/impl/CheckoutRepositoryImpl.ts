import { QueryResult , QueryResultRow , PoolClient } from 'pg';
import { Query } from '../../query/util/Query';
import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { ServiceHelper } from '../../util/ServiceHelper';
import { TransactionError } from '../../../entity/error/TransactionError';
import { User } from '../../../entity/User';
import { Status } from '../../../entity/Status';
import { Country } from '../../../entity/Country';
import { PaymentMethod } from '../../../entity/PaymentMethod';
import { DeliveryMethod } from '../../../entity/DeliveryMethod';
import { CheckoutRepository } from '../CheckoutRepository';
import { CheckoutQuery } from '../../query/CheckoutQuery';
import { Checkout } from '../../../entity/Checkout';
import { Order } from '../../../entity/Order';
import { OrderItem } from '../../../entity/OrderItem';
import { PaymentDetail } from '../../../entity/PaymentDetail';

export class CheckoutRepositoryImpl implements CheckoutRepository {

	private queryTemplate : QueryTemplate<Country> = new SimpleQueryTemplate<Country>();

	public async existsOrderItem(entry : OrderItem) : Promise<boolean> {

		let plan : DynamicQuery = CheckoutQuery.existsOrderItem(entry);

		return await this.queryTemplate.existsOne(plan.getText() , plan.getValues());
	}

	public async verifyOrderItemPrice(entry : OrderItem) : Promise<boolean> {

		let plan : DynamicQuery = CheckoutQuery.verifyOrderItemPrice(entry);

		return await this.queryTemplate.execute(plan.getText() , plan.getValues());
	}

	public async retrieveUserDetails(user_id : number) : Promise<User | null> {

		let plan : DynamicQuery = CheckoutQuery.retrieveUserDetails(user_id);

		let entry : Object | null = await this.queryTemplate.executePlain(plan.getText() , plan.getValues());

		let user : User | null = null;

		if (entry !== null) {

			user = new User(entry);

			user.setEmailAddress((<any>entry).email_address);

			user.setFirstName((<any>entry).first_name);

			user.setLastName((<any>entry).last_name);
		}

		return user;
	}

	public async updateTransactionReference(reference : string , order_id : number) : Promise<boolean> {

		let plan : DynamicQuery = CheckoutQuery.updateTransactionReference(reference , order_id);

		return await this.queryTemplate.execute(plan.getText() , plan.getValues());
	}

	public async updateTransactionStatusSuccess(reference : string) : Promise<void> {

		let plan : DynamicQuery = CheckoutQuery.updateTransactionStatusSuccess(reference);

		let executed : boolean = await this.queryTemplate.execute(plan.getText() , plan.getValues());

		if (executed === false) { throw new TransactionError(400); }

	}

	public async updateTransactionStatusFailure(reference : string) : Promise<void> {

		let plan : DynamicQuery = CheckoutQuery.updateTransactionStatusSuccess(reference);

		let executed : boolean = await this.queryTemplate.execute(plan.getText() , plan.getValues());

		if (executed === false) { throw new TransactionError(400); }

	}

	public async findOne() : Promise<Checkout> {

		let plan : DynamicQuery = CheckoutQuery.relatedEntities();

		let entry : Object | null = await this.queryTemplate.executePlain(plan.getText() , plan.getValues());

		let checkout : Checkout = new Checkout({});

		let countries : Country[] = [];

		let paymentMethods : PaymentMethod[] = [];

		let deliveryMethods : DeliveryMethod[] = [];

		if (entry !== null) {

			let result : QueryResult = await Query.execute(plan.getText() , plan.getValues());

			if ((<QueryResultRow[]>result.rows).length > 0) {

				let listResult : Object[] = (<any>entry).result.Country;

				let listResult2 : Object[] = (<any>entry).result.PaymentMethod;

				let listResult3 : Object[] = (<any>entry).result.DeliveryMethod;

				countries = ServiceHelper.rowsToObjectMapper<Country>(listResult , Country);

				paymentMethods = ServiceHelper.rowsToObjectMapper<PaymentMethod>(listResult2 , PaymentMethod);

				deliveryMethods = ServiceHelper.rowsToObjectMapper<DeliveryMethod>(listResult3 , DeliveryMethod);

				checkout.setCountries(countries);

				checkout.setPaymentMethods(paymentMethods);

				checkout.setDeliveryMethodes(deliveryMethods); }
		}

		return checkout;
	}

	public async saveOrder(entry : Order) : Promise<Order> {

		let plan : DynamicQuery = CheckoutQuery.saveOrder(entry);

		let client : PoolClient = await Query.getClient();

		try {

			await client.query('BEGIN');

			let result : QueryResult = await client.query(plan.getText() , plan.getValues());

			let orderId : number = (<QueryResultRow>result.rows[0])._id;

			entry.setOrderId(orderId);

			for (let orderItem of entry.getOrderItems()) {

					orderItem.setOrderId(entry.getOrderId());

					let plan2 = CheckoutQuery.saveOrderItem(orderItem);

					let result2 : QueryResult = await client.query(plan2.getText() , plan2.getValues());
			}

		let plan3 : DynamicQuery = CheckoutQuery.saveAddress(entry);

		let result3 : QueryResult = await client.query(plan3.getText() , plan3.getValues());

			await client.query('COMMIT');

		} catch(err : any) { 

			await client.query('ROLLBACK');

			console.log('An error has occured'); }

			finally {

				client.release();
			}

			return entry;
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return false;
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Checkout[]> {

		return [];

	} 

	public async addOne() : Promise<Checkout> {

		return new Checkout({});

	} 

	public async save(entry : Checkout) : Promise<Checkout | null> {

		return null;
	}

	public async updateOne(slug : string) : Promise<Checkout | null> {

		return null;
	}

	public async relatedEntities(entry : Checkout) : Promise<Checkout | null> {

		return null;
	} 

	public async update(slug : string , entry : Checkout) : Promise<Checkout | null> {

		return null;
	}

	public async deleteOne(slug : string) : Promise<Checkout | null> {

		return null;
	} 

	public async remove(slug : string) : Promise<Checkout | null> {

		return null;
	} 

	public async deleteMany(entries : string) : Promise<Checkout[]> {

		return [];
	}

	public async deleteAll() : Promise<Checkout[]> {

		return [];
	}

	public async findAndDeleteAll() : Promise<Checkout[]> {

		return [];
	}

	public async savePaymentDetail(entry : PaymentDetail , reference : string) : Promise<PaymentDetail | null> {

		let plan : DynamicQuery = CheckoutQuery.savePaymentDetail(entry , reference);

		let paymentDetail : PaymentDetail | null = null;

		let newEntry : Object | null = await this.queryTemplate.executePlain(plan.getText() , plan.getValues());

		if (newEntry !== null) {

				paymentDetail = entry;

				paymentDetail.setOrderId((<any>newEntry).order_id);
			}

		return paymentDetail;
	}

}
