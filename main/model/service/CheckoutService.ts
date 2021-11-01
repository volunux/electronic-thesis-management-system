import { CrudServiceX } from './generic/CrudServiceX';
import { Checkout } from '../../entity/Checkout';
import { Order } from '../../entity/Order';
import { OrderItem } from '../../entity/OrderItem';
import { User } from '../../entity/User';
import { PaymentDetail } from '../../entity/PaymentDetail';

export interface CheckoutService extends CrudServiceX<Checkout> {

	findOne() : Promise<Checkout>;

	saveOrder(entry : Order) : Promise<Order>;

	existsOrderItems(entries : OrderItem[]) : Promise<boolean>;

	verifyOrderItemPrice(entry : OrderItem[]) : Promise<boolean>;

	retrieveUserDetails(user_id : number) : Promise<User | null>;

	updateTransactionReference(reference : string , order_id : number) : Promise<boolean>;

	updateTransactionStatusSuccess(reference : string) : Promise<void>;

	updateTransactionStatusFailure(reference : string) : Promise<void>;

	savePaymentDetail(entry : PaymentDetail , reference : string) : Promise<PaymentDetail | null>;

}
