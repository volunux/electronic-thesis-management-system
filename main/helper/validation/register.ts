import { Request , Response , NextFunction } from 'express';
import { ValidationResult , ValidationOptions } from 'joi';
import { ValidationMessageBuilder } from './builder';
import { ValidationErrorMessage } from './ValidationErrorMessage';
import { SchemaValidationFieldsFilter } from './schema/SchemaValidationFieldsFilter';
import { oneEntrySchema } from './schema/shared/one';
import { twoEntrySchema } from './schema/shared/two';
import { threeEntrySchema } from './schema/shared/three';
import { fourEntrySchema } from './schema/shared/four';
import { fiveEntrySchema } from './schema/shared/five';
import { departmentEntrySchema } from './schema/distinct/department';
import { statusEntrySchema } from './schema/distinct/status';
import { publisherEntrySchema } from './schema/distinct/publisher';
import { thesisEntrySchema } from './schema/distinct/thesis';
import { userThesisEntrySchema } from './schema/distinct/user-thesis';
import { userEntrySchema } from './schema/distinct/user';
import { userCreateEntrySchema } from './schema/distinct/user-create';
import { userDeleteEntrySchema } from './schema/distinct/user-delete';
import { userUpdateEntrySchema } from './schema/distinct/user-update';
import { profileUpdateEntrySchema } from './schema/distinct/profile-update';
import { userRoleUpdateEntrySchema } from './schema/distinct/user-role-update';
import { displayEntrySchema } from './schema/distinct/display';
import { authenticationEntrySchema } from './schema/distinct/authentication';
import { authenticationSignUpEntrySchema } from './schema/distinct/authentication-sign-up';
import { checkoutEntrySchema } from './schema/distinct/checkout';
import { orderStatusEntrySchema } from './schema/distinct/order-status';
import { emailMessageTypeEntrySchema } from './schema/distinct/email-message-type';
import { emailMessageTemplateEntrySchema } from './schema/distinct/email-message-template';
import { forgotPasswordEntrySchema } from './schema/distinct/forgot-password';
import { resetPasswordEntrySchema } from './schema/distinct/reset-password';
import { UserService } from '../../model/service/UserService';
import { UserServiceImpl } from '../../model/service/impl/UserServiceImpl';
import { User } from '../../entity/User';

let joiOptions : ValidationOptions = { 'convert' : true , 'abortEarly' : false , 'allowUnknown' : true };

export class ValidationRegister {

	public static one(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = oneEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'general');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }

	}

	public static two(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = twoEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'general');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }

	}

	public static three(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = threeEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'general');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }

	}

	public static four(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = fourEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'general');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }

	}

	public static five(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = fiveEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'general');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }

	}

	public static department(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = departmentEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'general');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }

	}

	public static status(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = statusEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'general');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }

	}

	public static orderStatus(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = orderStatusEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'general');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }

	}

	public static publisher(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = publisherEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'general');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }

	}

	public static thesis(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = thesisEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'thesis');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }

	}

	public static userThesis(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = userThesisEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'thesis');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }

	}

	public static user(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = userEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'user');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }

	}

	public static async userCreate(req : Request , res : Response , next : NextFunction) : Promise<void> {

		let userService : UserService = new UserServiceImpl();

		let validationResult : ValidationResult = userCreateEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'user');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else {

			try {

			let usernameExists : boolean = await userService.checkUsername((<User>req.bindingModel).getUsername());

			if (usernameExists === true) {

				let msgList : string[] = ["Username already exists and cannot be used"];

				req.validationErrors.addManyError(msgList);

				return next();
			}

			let emailAddressExists : boolean = await userService.checkEmailAddress((<User>req.bindingModel).getEmailAddress());

			if (emailAddressExists === true) {

				let msgList : string[] = ["Email Address already exists and cannot be used"];

				req.validationErrors.addManyError(msgList);

				return next(); } }

			catch (err : any) { throw new Error("Error has occured"); }

			return next(); }

	}

	public static userUpdate(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = userUpdateEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'user');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }

	}

	public static userRoleUpdate(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = userRoleUpdateEntrySchema.validate(req.body , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'user');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }

	}

	public static profileUpdate(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = profileUpdateEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'user');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }

	}

	public static userDelete(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = userDeleteEntrySchema.validate(req.body , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'user');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }

	}

	public static display(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = displayEntrySchema.validate(req.body , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'display');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }

	}

	public static authentication(req : Request , res : Response , next : NextFunction) : void {
		
		let validationResult : ValidationResult = authenticationEntrySchema.validate(req.body , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'user');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }
	}

	public static authenticationSignUp(req : Request , res : Response , next : NextFunction) : void {
		
		let validationResult : ValidationResult = authenticationSignUpEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'user');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList); 

			return next(); }

		else { return next(); }
	}

	public static checkout(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = checkoutEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'checkout');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList);

			req.validationErrors.addManyValidationMessage(msgList);

			return next(); }

		else { return next(); }
	}

	public static emailMessageTemplate(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = emailMessageTemplateEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'emailMessageTemplate');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList);

			return next(); }

		else { return next(); }
	}

	public static emailMessageType(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = emailMessageTypeEntrySchema.validate(req.bindingModel , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'general');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList);

			return next(); }

		else { return next(); }
	}

	public static forgotPassword(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = forgotPasswordEntrySchema.validate(req.body , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'forgotPassword');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList);

			return next(); }

		else { return next(); }
	}

	public static resetPassword(req : Request , res : Response , next : NextFunction) : void {

		let validationResult : ValidationResult = resetPasswordEntrySchema.validate(req.body , joiOptions);

		let msgList : ValidationErrorMessage[] = ValidationMessageBuilder.build(validationResult , 'resetPassword');

		if (msgList.length > 0) { let transformedErrorList = ValidationMessageBuilder.transformValidationErrorsToSArrayOfString(msgList);

			req.validationErrors.addManyError(transformedErrorList);

			return next(); }

		else { return next(); }
	}

}