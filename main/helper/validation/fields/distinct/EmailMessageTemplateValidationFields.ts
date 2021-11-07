import joi , { NumberSchema , StringSchema } from 'joi';
import { SharedAllValidationFields } from '../shared/SharedAllValidationFields';

export class EmailMessageTemplateValidationFields extends SharedAllValidationFields {

	static getTitle() : StringSchema { 

		return joi.string()

							.min(1)

							.max(100)

							.trim(true)

							.required()

							.label('Title'); }

	static getMessage() : StringSchema { 

		return joi.string()

							.min(20)

							.max(5000)

							.trim(true)

							.required()

							.label('Message'); }

	static getMessageType() : NumberSchema { 

		return joi.number()

							.min(1)

							.max(900000000)

							.required()

							.label('Message Type'); }

}