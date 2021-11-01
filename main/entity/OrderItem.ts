export class OrderItem {

	public item_id : number;
	public title : string;
	public quantity : number;
	public amount : number;
	public unit_price : number;
	public order_id : number;

	constructor(item_id : number , title : string , unit_price : number , order_id : number) {

		this.item_id = item_id;
		this.title = title;
		this.quantity = 0;
		this.amount = 0;
		this.unit_price = unit_price;
		this.order_id = order_id;
	}

	get totalAmount() : number {

		return this.unit_price * this.quantity;
	}

	public getItemId() : number {

		return +this.item_id;
	}

	public setItemId(item_id : number) : void {

		this.item_id = item_id;
	}

	public getTitle() : string {

		return this.title;
	}

	public setTitle(title : string) : void {

		this.title = title;
	}

	public getQuantity() : number {

		return +this.quantity;
	}

	public getAmount() : number {

		return this.unit_price * this.quantity;
	}

	public setAmount(amount : number) : void {

		this.amount = amount;
	}

	public getUnitPrice() : number {

		return this.unit_price;
	}

	public setUnitPrice(unit_price : string) : void {

		this.unit_price = +(unit_price);
	}

	public setQuantity(quantity : number) : void {

		quantity = isNaN(quantity) ? 0 : quantity;

		if (quantity > 0) {

			this.quantity += quantity;
		}

		else if (quantity < 0 || quantity === 0) {

			this.quantity = 0;
		}

	}

	public setQty(quantity : number) : void {

		this.quantity = quantity;
	}

	public getOrderId() : number {

		return this.order_id;
	}

	public setOrderId(order_id : number) : void {

		this.order_id = order_id;
	}

}