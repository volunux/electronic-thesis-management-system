import joi , { NumberSchema , StringSchema } from 'joi';
import { SharedAllValidationFields } from '../shared/SharedAllValidationFields';

export class CheckoutValidationFields {

	static getFullName() : StringSchema { 

		return joi.string()

							.min(5)

							.max(40)

							.trim(true)

							.required()

							.label('Full Name'); }

	static getPhoneNumber() : StringSchema { 

		return joi.string()

							.min(1)

							.max(15)

							.required()

							.label('Phone Number'); }

	static getCity() : StringSchema { 

		return joi.string()

							.min(1)

							.max(20)

							.trim(true)

							.required()

							.label('City'); }

	static getState() : StringSchema { 

		return joi.string()

							.min(1)

							.max(20)

							.required()

							.label('State'); }

	static getAddress() : StringSchema { 

		return joi.string()

							.min(1)

							.max(60)

							.required()

							.label('Contact Address'); }

	static getZip() : StringSchema { 

		return joi.string()

							.min(1)

							.max(10)

							.required()

							.label('Zip'); }

	static getCountry() : NumberSchema { 

		return joi.number()

							.min(1)

							.max(900000000)

							.required()

							.label('Country'); }

	static getPaymentMethod() : NumberSchema { 

		return joi.number()

							.min(1)

							.max(900000000)

							.required()

							.label('Payment Method'); }

	static getDeliveryMethod() : NumberSchema { 

		return joi.number()

							.min(1)

							.max(900000000)

							.required()

							.label('Delivery Method'); }

};