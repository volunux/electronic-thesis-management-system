export class PaymentDetail {

	card_last_four_number : string = "";
	exp_year : string = "";
	exp_month : string = "";
	bank_name : string = "";
	card_type : string = "";
	order_id : string = "";

	constructor(data : any) {

	}

	public getCardLastFourNumber() : string {

		return this.card_last_four_number;
	}

	public setCardLastFourNumber(card_last_four_number : string) : void {

		this.card_last_four_number = card_last_four_number;
	}

	public getExpYear() : string {

		return this.exp_year;
	}

	public setExpYear(exp_year : string) : void {

		this.exp_year = exp_year;
	}

	public getExpMonth() : string {

		return this.exp_month;
	}

	public setExpMonth(exp_month : string) : void {

		this.exp_month = exp_month;
	}

	public getBankName() : string {

		return this.bank_name;
	}

	public setBankName(bank_name : string) : void {

		this.bank_name = bank_name;
	}

	public getCardType() : string {

		return this.card_type;
	}

	public setCardType(card_type : string) : void {

		this.card_type = card_type;
	}

	public getOrderId() : string {

		return this.order_id;
	}

	public setOrderId(order_id : string) : void {

		this.order_id = order_id;
	}
}