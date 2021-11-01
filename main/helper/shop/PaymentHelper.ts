import { User } from '../../entity/User';
import { Order } from '../../entity/Order';
import { TransactionError } from '../../entity/error/TransactionError';
import { CheckoutService } from '../../model/service/CheckoutService';
import { CheckoutServiceImpl } from '../../model/service/impl/CheckoutServiceImpl';
import axios , { AxiosResponse , AxiosRequestConfig } from 'axios';

export class PaymentHelper {

	private static checkoutService : CheckoutService = new CheckoutServiceImpl();

	private static mySecretKey : string = (<NodeJS.ProcessEnv>process.env)['paystack'] as string;

	public async initializeTransaction(order : Order) : Promise<{ [key : string] : any }> { 

		let url : string = 'https://api.paystack.co/transaction/initialize';

		let user : User | null = await PaymentHelper.checkoutService.retrieveUserDetails(order.getUserId());

		let finalAmount : number = order.getAmount() * 100;

		let response : AxiosResponse<any> = {} as any;

		let options : { [key : string] : any } = {

			'Authorization' : 'Bearer ' + PaymentHelper.mySecretKey ,

			'Content-Type': 'application/json' ,

			'Cache-Control': 'no-cache' };

		let data : { [key : string] : any } = {

			'email' : user!.getEmailAddress() ,

			'amount' : finalAmount ,

			'currency' : 'NGN' ,

			'metadata' : {

				'phone_number' : order.getShippingDetail()!.getPhoneNumber() ,
			}
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

		return response.data;
	}

	public async verifyTransaction(transaction_reference : string) : Promise<any> {

		let url = 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(transaction_reference);

		let options : { [key : string] : any } = {

					'Authorization' : 'Bearer ' + PaymentHelper.mySecretKey,
			
					'Content-Type': 'application/json',
			
					'Cache-Control': 'no-cache'	};

		let response : AxiosResponse<any> = {} as any;

		let requestConfig : AxiosRequestConfig = { 'method': 'GET' , 'url' : url , 'headers' : options };

		for (let i : number = 0; i < 4; i++) {

			try {

				response = await axios(requestConfig);

				break;

			} catch(err : any) {

				console.log(err);

				if (i === 3) { throw new TransactionError(400); }

			  } }

		return response.data.data;
	
		}

}