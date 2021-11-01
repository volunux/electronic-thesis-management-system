import { ShippingDetail } from './ShippingDetail';
import { DeliveryMethod } from './DeliveryMethod';
import { PaymentDetail } from './PaymentDetail';
import { OrderItem } from './OrderItem';
import { OrderStatus } from './OrderStatus';
import { User } from './User';

export class Order {

	private order_id : number;
	private full_name : string;
	private quantity : number;
	private amount : number = 0;
	private delivery_method_id : number;
	private payment_method_id : number;
	private user_id : number;
	private order_status_id : number;
	private created_on : Date;
	private updated_on : Date;
	private slug : string;
	private order_no : number;
	private order_reference : string;

	private delivery_method : DeliveryMethod | null = null; 
	private shipping_detail : ShippingDetail | null = null;
	private payment_detail : PaymentDetail | null = null;
	private order_status : OrderStatus | null = null;
	private items : OrderItem[] = [];
	private user : User | null = null;
	private statuses : OrderStatus[];

	constructor(quantity : number , amount : number , user_id : number , delivery_method_id : number , payment_method_id : number , created_on : Date , updated_on : Date) {

		this.order_id = 0;
		this.full_name = "";
		this.quantity = quantity;
		this.delivery_method_id = delivery_method_id;
		this.payment_method_id = payment_method_id;
		this.user_id = user_id;
		this.amount = amount;
		this.order_status_id = 0;
		this.created_on = created_on;
		this.updated_on = updated_on;
		this.statuses = [];
		this.slug = "";
		this.order_no = 0;
		this.order_reference = "";
	}

	public getOrderId() : number {

		return this.order_id;
	}

	public getQuantity() : number {

		return this.quantity;
	}

	public getFullName() : string {

		return this.full_name;
	}

	public setFullName(full_name : string) : void {

		this.full_name = full_name;
	}

	public getDeliveryMethodId() : number {

		return this.delivery_method_id;
	}

	public getPaymentMethodId() : number {

		return this.payment_method_id;
	}

	public getUserId() : number {

		return this.user_id;
	}

	public getShippingDetail() : ShippingDetail | null {

		return this.shipping_detail;
	}

	public getAmount() : number {

		return this.amount;
	}

	public getUser() : User | null {

		return this.user;
	}

	public getDeliveryMethod() : DeliveryMethod | null {

		return this.delivery_method;
	}

	public setOrderId(order_id : number) : void {

		this.order_id = order_id;
	}

	public setQuantity(quantity : number) : void {

		this.quantity = quantity;
	}

	public setAmount(amount : number) : void {

		this.amount = amount;
	}

	public setDeliveryMethodId(delivery_method_id : number) : void {

		this.delivery_method_id = delivery_method_id;
	}

	public setPaymentMethodId(payment_method_id : number) : void {

		this.payment_method_id = payment_method_id;
	}

	public setUserId(user_id : number) : void {

		this.user_id = user_id;
	}

	public setShippingDetail(shipping_detail : ShippingDetail) : void {

		this.shipping_detail = shipping_detail;
	}

	public getPaymentDetail() : PaymentDetail | null {

		return this.payment_detail;
	}

	public setPaymentDetail(payment_detail : PaymentDetail) : void {

		this.payment_detail = payment_detail;
	}

	public getOrderItems() : OrderItem[] {

		return this.items;
	}

	public setOrderItems(items : OrderItem[]) : void {

		this.items = items;
	}

	public getUpdatedOn() : Date {

		return this.updated_on;
	}

	public setUpdatedOn(updated_on : Date) : void {

		this.updated_on = updated_on;
	}

	public getCreatedOn() : Date {

		return this.created_on;
	}

	public setCreatedOn(created_on : Date) : void {

		this.created_on = created_on;
	}

	public getStatuses() : OrderStatus[] {

		return this.statuses;
	}

	public setStatuses(statuses : OrderStatus[]) : void {

		this.statuses = statuses;
	}

	public getSlug() : string {

		return this.slug;
	}

	public setSlug(slug : string) : void {

		this.slug = slug;
	}

	public getOrderStatusId() : number {

		return this.order_status_id;
	}

	public setorderStatusId(order_status_id : number) : void {

		this.order_status_id = order_status_id;
	}

	public getOrderStatus() : OrderStatus | null {

		return this.order_status;
	}

	public setOrderStatus(order_status : OrderStatus) : void {

		this.order_status = order_status;
	}

	public getOrderNo() : number {

		return this.order_no;
	}

	public setOrderNo(order_no : number) : void {

		this.order_no = order_no;
	}

	public getOrderReference() : string {

		return this.order_reference;
	}

	public setOrderReference(order_reference : string) : void {

		this.order_reference = order_reference;
	}

}