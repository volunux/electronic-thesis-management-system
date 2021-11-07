import joi , { NumberSchema , StringSchema } from 'joi';

export class SharedAllValidationFields {

	static getName() : StringSchema { 

		return joi.string()

							.min(1)

							.max(150)

							.trim(true)

							.required()

							.label('Name'); }

	static getTitle() : StringSchema { 

		return joi.string()

							.min(1)

							.max(150)

							.trim(true)

							.optional()

							.label('Title'); }

	static getWord() : StringSchema { 

		return joi.string()

							.min(3)

							.max(20)

							.trim(true)

							.required()

							.label('Word'); }

	static getAbbreviation() : StringSchema { 

		return joi.string()

							.min(2)

							.max(8)

							.trim(true)

							.required()

							.label('Abbeviation'); }

	static getDescription() : StringSchema {

		return joi.string()

							.min(10)

							.max(250)

							.trim(true)

							.optional()

							.allow('')

							.label(	'Description'); }

	static getSlug() : StringSchema { 

		return joi.string()

							.min(1)

							.max(30)

							.trim(true)

							.optional()

							.label('Permalink'); }

	static getAuthor() : NumberSchema {

		return joi.number()

							.min(1)

							.max(900000000)

							.required()

							.label('Author'); }

	static getStatus() : StringSchema {

		return joi.string()

							.min(1)

							.max(900000000)

							.required()

							.label('Status'); }

};