import  { Request , Response , NextFunction } from 'express';
import { IncomingHttpHeaders } from 'http';
import { SessionData } from 'express-session';
import { ValidationErrorMessage } from '../helper/validation/ValidationErrorMessage';
import { User } from '../entity/User';
import { UserSession } from '../entity/UserSession';
import { ShoppingCart } from '../entity/ShoppingCart';
import { ShippingDetail } from '../entity/ShippingDetail';
import { PaymentMethod } from '../entity/PaymentMethod';
import { PaymentDetail } from '../entity/PaymentDetail';
import { DeliveryMethod } from '../entity/DeliveryMethod';
import { OrderItem } from '../entity/OrderItem';
import { Order } from '../entity/Order';
import { Checkout } from '../entity/Checkout';
import { CheckoutForm } from '../entity/CheckoutForm';
import { Country } from '../entity/Country';
import { CartItemsInvalidError } from '../entity/error/CartItemsInvalidError';
import { RouteOptionsConfig } from '../route/config/RouteOptionsConfig';
import { UserHelper } from '../helper/entry/UserHelper';
import { ShoppingCartHelper } from '../helper/shop/ShoppingCartHelper';
import { PaymentHelper } from '../helper/shop/PaymentHelper';
import { MailMessage } from '../util/mail/MailMessage';
import { MailMessageLocal } from '../util/mail/MailMessageLocal';
import { MailSender } from '../util/mail/MailSender';
import { MailSenderServicesContainer } from '../util/mail/MailSenderServicesContainer';
import { CheckoutService } from '../model/service/CheckoutService';
import { CheckoutServiceImpl } from '../model/service/impl/CheckoutServiceImpl';
import { MailHelper } from '../helper/middleware/MailHelper';

export class ShoppingController {

	private service : CheckoutService = new CheckoutServiceImpl();

	private paymentService : PaymentHelper = new PaymentHelper();

	private mailSender : MailSender | null = MailSenderServicesContainer.getService('sendgrid');

	private config : RouteOptionsConfig | null = null;

	public init(config : RouteOptionsConfig) : void {

		this.config = config;
	}

	public static setOrderItem(req : Request , res : Response , next : NextFunction) : void {

		if (Object.keys(req.body).length > 0) { 

			let orderItem : OrderItem = new OrderItem(+req.body.item_id , req.body.title , req.body.unit_price , 1);

			orderItem.setQuantity(+(req.body.quantity));

			orderItem.setUnitPrice(req.body.unit_price);

			req.bindingModel = orderItem; } 

		else { req.bindingModel = null; }

		return next();
	}

	public static setShoppingCart(req : Request , res : Response , next : NextFunction) : void {

		return next();
	}

	public static setUser(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new User(req.body); }

		return next();
	}

	public static setCheckoutForm(req : Request , res : Response , next : NextFunction) : void {

		if (req.body !== null && req.body !== undefined) {

			req.bindingModel = new CheckoutForm(req.body); }

		return next();
	}

	public async addItemToCart(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let cart : ShoppingCart | undefined = req.session.cart;

		let orderItem : OrderItem | null  = <OrderItem>req.bindingModel;

		ShoppingCartHelper.addItem(<ShoppingCart>cart , orderItem);

		req.session.cart = cart;

		res.redirect('/');

	}

	public async showCart(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let cart : ShoppingCart | undefined = req.session.cart;

		ShoppingCartHelper.computeItemsData(<ShoppingCart>cart);

		let totalAmount : number =  ShoppingCartHelper.getTotalAmount(<ShoppingCart>cart);

		let totalItem : number = ShoppingCartHelper.getTotalItem(<ShoppingCart>cart);

		let totalQuantity : number = ShoppingCartHelper.getTotalQuantity(<ShoppingCart>cart);

		let orderItems : OrderItem[] = ShoppingCartHelper.getItems(<ShoppingCart>cart);

		res.render('pages/shop/cart' , {'entries' : orderItems , 'total_amount' : totalAmount , 'total_quantity' : totalQuantity , 'total_item' : totalItem });

	}

	public async updateCartItem(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let cart : ShoppingCart | undefined = req.session.cart;

		let orderItem : OrderItem | null = <OrderItem>req.bindingModel;

		ShoppingCartHelper.updateItem(<ShoppingCart>cart , orderItem.getItemId() , orderItem.getQuantity());

		req.session.cart = cart;

		res.redirect('/cart');

	}

	public async removeCartItem(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let cart : ShoppingCart | undefined = req.session.cart;

		let item_id : number = isNaN(+(req.params.item_id)) ? 0 : +req.params.item_id;

		ShoppingCartHelper.removeItem(<ShoppingCart>cart , item_id);

		req.session.cart = cart;

		res.redirect('/cart');

	}

	public async existsCartItems(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let cart : ShoppingCart | undefined = req.session.cart;

		let orderItems : OrderItem[] = ShoppingCartHelper.getCartItems(<ShoppingCart>cart);

		let itemsExists : boolean = await this.service.existsOrderItems(orderItems);

		if (itemsExists === false) {

				req.session.cart = new ShoppingCart();

			throw new CartItemsInvalidError(400);
		}

		return next();
	}

	public async verifyOrderItemPrice(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let cart : ShoppingCart | undefined = req.session.cart;

		let orderItems : OrderItem[] = ShoppingCartHelper.getCartItems(<ShoppingCart>cart);

		let itemsExists : boolean = await this.service.verifyOrderItemPrice(orderItems);

		if (itemsExists === false) {

				req.session.cart = new ShoppingCart();

			throw new CartItemsInvalidError(400);
		}

		return next();
	}

	public async proceedToCheckOut(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let cart : ShoppingCart | undefined = req.session.cart;

		let totalAmount : number =  ShoppingCartHelper.getTotalAmount(<ShoppingCart>cart);

		let totalItem : number = ShoppingCartHelper.getTotalItem(<ShoppingCart>cart);

		let totalQuantity : number = ShoppingCartHelper.getTotalQuantity(<ShoppingCart>cart);

		let checkout : Checkout = await this.service.findOne();

		let countries : Country[] = checkout.getCountries();

		let paymentMethods : PaymentMethod[] = checkout.getPaymentMethods();

		let deliveryMethods : DeliveryMethod[] = checkout.getDeliveryMethods();

		res.render('pages/shop/checkout' , {'total_amount' : totalAmount , 'total_quantity' : totalQuantity , 'total_item' : totalItem , 

			'countries' : countries , 'paymentMethods' : paymentMethods , 'deliveryMethods' : deliveryMethods });
	}

	public async processCheckout(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let cart : ShoppingCart | undefined = req.session.cart;

		let checkoutForm : CheckoutForm | null = <CheckoutForm>req.bindingModel;

		let totalAmount : number =  ShoppingCartHelper.getTotalAmount(<ShoppingCart>cart);

		let totalItem : number = ShoppingCartHelper.getTotalItem(<ShoppingCart>cart);

		let totalQuantity : number = ShoppingCartHelper.getTotalQuantity(<ShoppingCart>cart);

		let checkout : Checkout = await this.service.findOne();

		let countries : Country[] = checkout.getCountries();

		let paymentMethods : PaymentMethod[] = checkout.getPaymentMethods();

		let deliveryMethods : DeliveryMethod[] = checkout.getDeliveryMethods();

		if (req.validationErrors.isEmpty() === false) {

			let errors : string[] = req.validationErrors.getErrors();

			let errorObjectList : { [key : string] : ValidationErrorMessage } = req.validationErrors.getValidationErrorMessages();

		res.render('pages/shop/checkout' , {'entry' : checkoutForm , 'total_amount' : totalAmount , 'total_quantity' : totalQuantity , 'total_item' : totalItem , 

			'countries' : countries , 'paymentMethods' : paymentMethods , 'deliveryMethods' : deliveryMethods , 'errors' : errors , 'errorObjectList' : errorObjectList });

			return; }

		let order : Order = new Order(totalQuantity , totalAmount , (<UserSession>req.user).getId() , 0 , 0 , new Date() , new Date());

		let shippingDetail : ShippingDetail = new ShippingDetail({});

		shippingDetail.setState(checkoutForm.getState());
		shippingDetail.setCity(checkoutForm.getCity());
		shippingDetail.setCountry(checkoutForm.getCountry());
		shippingDetail.setContactAddress(checkoutForm.getContactAddress());
		shippingDetail.setPhoneNumber(checkoutForm.getPhoneNumber());
		shippingDetail.setUserId((<UserSession>req.user).getId());
		shippingDetail.setZip(checkoutForm.getZip());
		order.setPaymentMethodId(Number.parseInt(checkoutForm.getPaymentMethod()));
		order.setDeliveryMethodId(Number.parseInt(checkoutForm.getDeliveryMethod()));
		order.setShippingDetail(shippingDetail);

		ShoppingCartHelper.setOrderItems((<ShoppingCart>cart).items , order);

		let transactionAuthorizationDetails : { [key : string] : any } = await this.paymentService.initializeTransaction(order);

		let data : { [key : string] : any } = transactionAuthorizationDetails.data;

		order.setOrderReference(data['reference']);

		order = await this.service.saveOrder(order);

		let authorizationUrl : string = data['authorization_url'];

		let user : UserSession = <UserSession>req.user;

		let newUser : User = new User({});

		newUser.setEmailAddress(user.getEmailAddress());

			let mailMessage : MailMessage = MailMessageLocal.transactionInitialization(order.getOrderReference());

			MailHelper.sendEmail(this.mailSender , newUser , mailMessage);

		res.redirect(authorizationUrl);

	}

	public async createOrder(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let shoppingCart : ShoppingCart | undefined = req.session.cart;
	}

	public async processOrder(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let cart : ShoppingCart | undefined = req.session.cart;

		let totalAmount : number =  ShoppingCartHelper.getTotalAmount(<ShoppingCart>cart);

		let totalItem : number = ShoppingCartHelper.getTotalItem(<ShoppingCart>cart);

		let totalQuantity : number = ShoppingCartHelper.getTotalQuantity(<ShoppingCart>cart);

		let order : Order = new Order(totalQuantity , totalAmount , (<UserSession>req.user).getId() , 0 , 0 , new Date() , new Date());

		let shippingDetail : ShippingDetail = new ShippingDetail({});

		order.setShippingDetail(shippingDetail);

	}

	public async verifyOrder(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let reference : string | string[] | undefined = req.query.reference as string;

		let transactionDetails : any = await this.paymentService.verifyTransaction(reference);

		let paymentDetail : PaymentDetail = new PaymentDetail({});

		paymentDetail.setCardLastFourNumber(transactionDetails['authorization']['last4']);
		paymentDetail.setBankName(transactionDetails['authorization']['bank']);
		paymentDetail.setExpMonth(transactionDetails['authorization']['exp_month']);
		paymentDetail.setExpYear(transactionDetails['authorization']['exp_year']);
		paymentDetail.setCardType(transactionDetails['authorization']['card_type']);

		let user : UserSession = <UserSession>req.user;

		let newUser : User = new User({});

		newUser.setEmailAddress(user.getEmailAddress());

		if (transactionDetails.status === "success") {

				this.service.updateTransactionStatusSuccess(reference);

				this.service.savePaymentDetail(paymentDetail , reference);

			let mailMessage : MailMessage = MailMessageLocal.transactionSuccess(reference);

			MailHelper.sendEmail(this.mailSender , newUser , mailMessage); }

		else {

				this.service.updateTransactionStatusFailure(reference);

				this.service.savePaymentDetail(paymentDetail , reference); 

			let mailMessage : MailMessage = MailMessageLocal.transactionSuccess(reference);

			MailHelper.sendEmail(this.mailSender , newUser , mailMessage); }

		res.redirect('/internal/order/entries');

	}

	public async showOrder(req : Request , res : Response , next : NextFunction) : Promise<void> {

		
	}

}