import joi , { StringSchema } from 'joi';

export class ForgotPasswordValidationFields {

	static getEmailAddress() : StringSchema { 

		return joi.string()

							.min(1)

							.max(50)

							.pattern(/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/)

							.required()

							.label('Email Address'); }
};