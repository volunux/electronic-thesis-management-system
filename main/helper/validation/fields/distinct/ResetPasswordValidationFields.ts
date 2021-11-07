import joi , { StringSchema } from 'joi';

export class ResetPasswordValidationFields {

	static getPassword() : StringSchema { 

		return joi.string()

							.min(8)

							.max(30)

							.trim(true)

							.required()

							.label('Password'); }

	static getConfirmPassword() : StringSchema { 

		return joi.string()

							.min(8)

							.max(30)

							.trim(true)

							.required()

							.equal(joi.ref('password'))

							.label('Confirm Password'); }
};