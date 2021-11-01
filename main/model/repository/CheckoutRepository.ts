import { CrudRepositoryX } from './generic/CrudRepositoryX';
import { User } from '../../entity/User';
import { Checkout } from '../../entity/Checkout';
import { Order } from '../../entity/Order';
import { OrderItem } from '../../entity/OrderItem';
import { PaymentDetail } from '../../entity/PaymentDetail';

export interface CheckoutRepository extends CrudRepositoryX<Checkout> {

	findOne() : Promise<Checkout>;

	saveOrder(entry : Order) : Promise<Order>;

	existsOrderItem(entry : OrderItem) : Promise<boolean>;

	verifyOrderItemPrice(entry : OrderItem) : Promise<boolean>;

	retrieveUserDetails(user_id : number) : Promise<User | null>;

	updateTransactionReference(reference : string , order_id : number) : Promise<boolean>;

	updateTransactionStatusSuccess(reference : string) : Promise<void>;

	updateTransactionStatusFailure(reference : string) : Promise<void>;

	savePaymentDetail(entry : PaymentDetail , reference : string) : Promise<PaymentDetail | null>;
} 