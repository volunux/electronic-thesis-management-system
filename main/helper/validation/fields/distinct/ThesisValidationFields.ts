import joi , { NumberSchema , StringSchema } from 'joi';
import { SharedAllValidationFields } from '../shared/SharedAllValidationFields';

export class ThesisValidationFields {

	static getTitle() : StringSchema { 

		return joi.string()

							.min(10)

							.max(200)

							.trim(true)

							.required()

							.label('Title'); }

	static getPrice() : StringSchema { 

		return joi.string()

							.min(1)

							.max(30)

							.required()

							.label('Price'); }

	static getContent() : StringSchema { 

		return joi.string()

							.min(1)

							.max(6000)

							.trim(true)

							.required()

							.label('Content'); }

	static getNumberOfPage() : StringSchema { 

		return joi.string()

							.min(1)

							.max(5)

							.required()

							.label('Number of Pages'); }

	static getGrade() : StringSchema { 

		return joi.string()

							.min(1)

							.max(2)

							.required()

							.label('Grade'); }

	static getDepartment() : NumberSchema { 

		return joi.number()

							.min(1)

							.max(900000000)

							.required()

							.label('Department'); }

	static getFaculty() : NumberSchema { 

		return joi.number()

							.min(1)

							.max(900000000)

							.required()

							.label('Faculty'); }

	static getPublisher() : NumberSchema { 

		return joi.number()

							.min(1)

							.max(900000000)

							.required()

							.label('Publisher'); }

	static getSupervisor() : StringSchema { 

		return joi.string()

							.min(1)

							.max(200)

							.trim(true)

							.required()

							.label('Supervisor'); }

	static getPublicationYear() : StringSchema { 

		return joi.string()

							.min(1)

							.max(4)

							.trim(true)

							.required()

							.label('Publication Year'); }

	static getAuthor() : NumberSchema { 

		return joi.number()

							.min(1)

							.max(900000000)

							.required()

							.label('Author'); }

	static getUser() : NumberSchema { 

		return joi.number()

							.min(1)

							.max(900000000)

							.required()

							.label('User Profile'); }

	static getAuthorName() : StringSchema { 

		return joi.string()

							.min(1)

							.max(200)

							.required()

							.trim(true)

							.label('Author Name'); }

	static getStatus() : StringSchema { 

		return joi.string()

							.min(1)

							.max(150)

							.required()

							.allow('')

							.label('Status'); }

	static getCoverImage() : StringSchema { 

		return joi.string()

							.min(1)

							.max(200)

							.optional()

							.label('Cover Image'); }

	static getSlug() : StringSchema {

		return SharedAllValidationFields.getSlug();
	}

};