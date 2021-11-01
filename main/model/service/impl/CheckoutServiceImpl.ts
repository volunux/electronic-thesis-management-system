import { EntityQueryConfig } from '../../query/util/EntityQueryConfig';
import { CheckoutRepository } from '../../repository/CheckoutRepository';
import { CheckoutRepositoryImpl } from '../../repository/impl/CheckoutRepositoryImpl';
import { CheckoutService } from '../CheckoutService';
import { Checkout } from '../../../entity/Checkout';
import { Order } from '../../../entity/Order';
import { OrderItem } from '../../../entity/OrderItem';
import { User } from '../../../entity/User';
import { PaymentDetail } from '../../../entity/PaymentDetail';

export class CheckoutServiceImpl implements CheckoutService {

	private repository : CheckoutRepository = new CheckoutRepositoryImpl();

	public async findOne() : Promise<Checkout> {

		return this.repository.findOne();
	}

	public async saveOrder(entry : Order) : Promise<Order> {

		return this.repository.saveOrder(entry);
	}

	public async existsOrderItems(entries : OrderItem[]) : Promise<boolean> {

		let entryExists : boolean = false;

			for (let orderItem of entries) {

					entryExists = await this.repository.existsOrderItem(orderItem);

					if (entryExists === false) {

						entryExists = false;

						break;
					}

					else {

						entryExists = true;
					}
			}

			return entryExists;
	}

	public async verifyOrderItemPrice(entries : OrderItem[]) : Promise<boolean> {

		let entryExists : boolean = false;

			for (let orderItem of entries) {

					entryExists = await this.repository.verifyOrderItemPrice(orderItem);

					if (entryExists === false) {

						entryExists = false;

						break;
					}

					else {

						entryExists = true;
					}
			}

			return entryExists;
	}

	public async retrieveUserDetails(user_id : number) : Promise<User | null> {

		return this.repository.retrieveUserDetails(user_id);
	}

	public async updateTransactionReference(reference : string , order_id : number) : Promise<boolean> {

		return this.repository.updateTransactionReference(reference , order_id);
	}

	public async updateTransactionStatusSuccess(reference : string) : Promise<void> {

		return this.repository.updateTransactionStatusSuccess(reference);
	}

	public async updateTransactionStatusFailure(reference : string) : Promise<void> {

		return this.repository.updateTransactionStatusFailure(reference);
	}

	public async existsOne(slug : string) : Promise<boolean> {

		return this.repository.existsOne(slug);
	} 

	public async findAll(eqp : EntityQueryConfig) : Promise<Checkout[]> {

		return this.repository.findAll(eqp);
	} 

	public async addOne() : Promise<Checkout> {

		return this.repository.addOne();
	} 

	public async save(entry : Checkout) : Promise<Checkout | null> {

		return this.repository.save(entry);
	}

	public async updateOne(slug : string) : Promise<Checkout | null> {

		return this.repository.updateOne(slug);
	}

	public async relatedEntities(entry : Checkout) : Promise<Checkout | null> {

		return this.repository.relatedEntities(entry);
	} 

	public async update(slug : string , entry : Checkout) : Promise<Checkout | null> {

		return this.repository.update(slug , entry);
	}

	public async deleteOne(slug : string) : Promise<Checkout | null> {

		return this.repository.deleteOne(slug);
	} 

	public async remove(slug : string) : Promise<Checkout | null> {

		return this.repository.remove(slug);
	} 

	public async deleteMany(entries : string) : Promise<Checkout[]> {

		return this.repository.deleteMany(entries);
	}

	public async deleteAll() : Promise<Checkout[]> {

		return this.repository.deleteAll();
	}

	public async findAndDeleteAll() : Promise<Checkout[]> {

		return this.repository.findAndDeleteAll();
	}

	public async savePaymentDetail(entry : PaymentDetail , reference : string) : Promise<PaymentDetail | null> {

		return this.repository.savePaymentDetail(entry , reference);
	}

}
