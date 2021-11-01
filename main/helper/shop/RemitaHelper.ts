import bcrypt from 'bcrypt';
import { User } from '../../entity/User';
import { Order } from '../../entity/Order';
import { RemitaTransaction } from '../../entity/RemitaTransaction';
import { TransactionError } from '../../entity/error/TransactionError';
import { CheckoutService } from '../../model/service/CheckoutService';
import { CheckoutServiceImpl } from '../../model/service/impl/CheckoutServiceImpl';
import axios , { AxiosResponse , AxiosRequestConfig } from 'axios';
import sha512 from 'crypto-js/sha512';
const CryptoJS = require('crypto-js');

export class RemitaHelper {

	private static checkoutService : CheckoutService = new CheckoutServiceImpl();

	private static mySecretKey : string = (<NodeJS.ProcessEnv>process.env)['paystack'] as string;

	public async initializeTransaction(transaction : RemitaTransaction) : Promise<{ [key : string] : any }> { 

		let merchantId : string = transaction.getMerchantId();
		let apiKey : string = transaction.getApiKey();
		let serviceTypeId = transaction.getServiceTypeId();
		let orderId : number = transaction.getOrderId();
		let totalAmount : string = transaction.getAmt();
		let apiHash = CryptoJS.SHA512(merchantId + serviceTypeId + orderId + totalAmount + apiKey).toString();

		let url : string = 'https://remitademo.net/remita/exapp/api/v1/send/api/echannelsvc/merchant/api/paymentinit';

		let response : AxiosResponse<any> = {} as any;

		let options : { [key : string] : any } = {

			'Authorization' : 'remitaConsumerKey=' + merchantId + ',' + 'remitaConsumerToken=' + apiHash,

			'Content-Type': 'application/json' ,

			'Cache-Control': 'no-cache' };


		let data : { [key : string] : any } = {

			'serviceTypeId' : serviceTypeId ,

			'amount' : totalAmount ,

			"orderId" : orderId + "" ,

			"payerName" : transaction.getPayerName() ,

			"payerPhone" : transaction.getPayerPhone() ,

			"payerEmail" : transaction.getPayerEmail() ,
		};

		let requestConfig : AxiosRequestConfig = { 'method': 'POST' , 'url' : url , 'data' : data , 'headers' : options };

		for (let i : number = 0; i < 4; i++) {

		try {

			response = await axios(requestConfig);

			break;

		} catch(err : any) {

			console.log(err);

			if (i === 3) { throw new TransactionError(400); } 
			
			} }

		return JSON.parse(response.data.replace(/^jsonp \(|\)*\)/g , ''));
	}

	public async verifyTransaction(transaction_reference : string) : Promise<any> {


	}

	public static tranformReferenceCode(reference_code : string) : string {

		let transformedReference : string = reference_code.split('')

			.map((char : string , idx : number , itemsArr : string[]) => {

				if ((idx + 1) % 4 === 0 && (idx + 1) != itemsArr.length) return char + "-";

				else return char;

			}).join('');

			return transformedReference;

	}

}