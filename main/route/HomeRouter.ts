import express , { Router } from 'express';
import { ValidationRegister } from '../helper/validation/register';
import { EntryAuthor } from '../helper/entry/EntryAuthor';
import { ProxyController } from '../util/proxy/ProxyController';
import { UserProfile } from '../helper/middleware/UserProfile';
import { HomeController } from '../controller/HomeController';
import { ShoppingController } from '../controller/ShoppingController';
import { HomeRouteConfig } from './config/HomeRouteConfig';
import { CartItemsInvalidError } from '../entity/error/CartItemsInvalidError';

export const HomeRouter : Router = express.Router();

const ctrl : HomeController = ProxyController.create<HomeController>(new HomeController());

const ctrl2 : ShoppingController = ProxyController.create<ShoppingController>(new ShoppingController());

ctrl.init(HomeRouteConfig.getInstance());

HomeRouter.get('/about' , ctrl.about);

HomeRouter.get('/contact' , ctrl.contact);

HomeRouter.get('/cart' , ctrl2.showCart);

HomeRouter.post('/cart' , ShoppingController.setOrderItem , ctrl2.addItemToCart);

HomeRouter.post('/cart/update' , ShoppingController.setOrderItem , ctrl2.updateCartItem);

HomeRouter.get('/cart/checkout' , ctrl2.existsCartItems , ctrl2.verifyOrderItemPrice , ctrl2.proceedToCheckOut);

HomeRouter.post('/cart/checkout' , ShoppingController.setCheckoutForm , ValidationRegister.checkout ,  ctrl2.processCheckout);

HomeRouter.get('/cart/delete/:item_id' , ctrl2.removeCartItem);

HomeRouter.get('/sign-in' , UserProfile.noAuthentication , ctrl.signIn);

HomeRouter.post('/sign-in' , UserProfile.noAuthentication , HomeController.setUser , ValidationRegister.authentication , ctrl.signInAccount);

HomeRouter.get('/sign-up' , UserProfile.noAuthentication , ctrl.signUp);

HomeRouter.post('/sign-up' , UserProfile.noAuthentication , HomeController.setUser , ValidationRegister.authenticationSignUp , ctrl.signUpAccount);

HomeRouter.get('/sign-out' , UserProfile.logOut , ctrl.signOut);

HomeRouter.get('/forgot-password' , ctrl.signUpAccount);

HomeRouter.get('/reset/:token' , ctrl.signUpAccount);

HomeRouter.get('/payment/validation' , ctrl2.verifyOrder);