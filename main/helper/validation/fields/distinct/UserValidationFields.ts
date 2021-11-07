import joi , { NumberSchema , StringSchema } from 'joi';
import { SharedAllValidationFields } from '../shared/SharedAllValidationFields';

export class UserValidationFields extends SharedAllValidationFields {

	static getFirstName() : StringSchema { 

		return joi.string()

							.min(1)

							.max(20)

							.trim(true)

							.required()

							.label('First Name'); }

	static getLastName() : StringSchema { 

		return joi.string()

							.min(1)

							.max(20)

							.trim(true)

							.required()

							.label('Last Name'); }

	static getEmailAddress() : StringSchema { 

		return joi.string()

							.min(1)

							.max(50)

							.pattern(/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/)

							.required()

							.label('Email Address'); }

	static getUsername() : StringSchema { 

		return joi.string()

							.min(1)

							.max(20)

							.trim(true)

							.required()

							.label('Username'); }

	static getAbout() : StringSchema { 

		return joi.string()

							.min(10)

							.max(300)

							.trim(true)

							.required()

							.label('About'); }

	static getMatriculationNumber() : StringSchema { 

		return joi.string()

							.min(10)

							.max(15)

							.trim(true)

							.required()

							.label('Matriculation Number'); }

	static getCountry() : NumberSchema { 

		return joi.number()

							.min(1)

							.max(900000000)

							.required()

							.label('Country'); }

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

	static getLevel() : NumberSchema { 

		return joi.number()

							.min(1)

							.max(900000000)

							.required()

							.label('Level'); }

	static getStatus() : StringSchema { 

		return joi.string()

							.min(1)

							.max(150)

							.required()

							.label('Status'); }

};