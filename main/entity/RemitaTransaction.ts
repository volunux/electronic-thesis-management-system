export class RemitaTransaction {

	private merchantId : string;
	private apiKey : string;
	private serviceTypeId : string;
	private orderId : number;
	private Authorization : string; 
	private payerName : string;
	private payerEmail : string;
	private payerPhone : string;
	private amt : string;
	private description : string;
	private responseUrl : string;
	private hash : string;
	private referenceCode : string;

	constructor(data : any) {

		this.merchantId = "2547916";
		this.serviceTypeId = "4430731";
		this.apiKey = "1946";
		this.orderId = (new Date()).getTime();
		this.Authorization = data.Authorization ? data.Authorization : undefined;
		this.payerName = data.payerName ? data.payerName : undefined;
		this.payerEmail = data.payerEmail ? data.payerEmail : undefined;
		this.payerPhone = data.payerPhone ? data.payerPhone : undefined;
		this.amt = data.amt ? data.amt : undefined;
		this.description = data.description ? data.description : undefined;
		this.responseUrl = "http://localhost:3000/remita/verify";
		this.hash = data.hash ? data.hash : undefined;
		this.referenceCode = data.referenceCode ? data.referenceCode : undefined;
	}

	public getMerchantId() : string {

		return this.merchantId;
	}

	public setMerchantId(merchantId : string) : void {

		this.merchantId = merchantId;
	}

	public getServiceTypeId() : string {

		return this.serviceTypeId;
	}

	public setServiceTypeId(serviceTypeId : string) : void {

		this.serviceTypeId = serviceTypeId;
	}

	public getOrderId() : number {

		return this.orderId;
	}

	public setOrderId(orderId : number) : void {

		this.orderId = orderId;
	}

	public getAuthorization() : string {

		return this.Authorization;
	}

	public setAuthorization(authorization : string) : void {

		this.Authorization = authorization;
	}

	public getPayerName() : string {
		
		return this.payerName;
	}

	public setPayerName(payerName : string) : void {

		this.payerName = payerName;
	}

	public getPayerEmail() : string {

		return this.payerEmail;
	}

	public setPayerEmail(payerEmail : string) : void {

		this.payerEmail = payerEmail;
	}

	public getPayerPhone() : string {

		return this.payerPhone;
	}

	public setPayerPhone(payerPhone : string) : void {

		this.payerPhone = payerPhone;
	}

	public getAmt() : string {

		return this.amt;
	}

	public setAmt(amt : string) : void {

		this.amt = amt;
	}

	public getDescription() : string {

		return this.description
	}

	public setDescription(description : string) : void {

		this.description;
	}

	public getHash() : string {

		return this.hash;
	}

	public setHash(hash : string) : void {

		this.hash = hash;
	}

	public getReferenceCode() : string {

		return this.referenceCode;
	}

	public setReferenceCode(referenceCode : string) : void {

		this.referenceCode = referenceCode;
	}

	public getApiKey() : string {

		return this.apiKey;
	}

	public setApiKey(apiKey : string) : void {

		this.apiKey = apiKey;
	}

}