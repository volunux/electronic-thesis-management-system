import joi , { NumberSchema , StringSchema } from 'joi';
import { SharedAllValidationFields } from '../shared/SharedAllValidationFields';

export class EmailMessageTypeValidationFields extends SharedAllValidationFields {

	static getTitle() : StringSchema { 

		return joi.string()

							.min(1)

							.max(100)

							.trim(true)

							.required()

							.label('Title'); }

	static getDescription() : StringSchema { 

		return joi.string()

							.min(1)

							.max(300)

							.required()

							.label('Description '); }

}