import joi , { ObjectSchema } from 'joi';
import { ResetPasswordValidationFields } from '../../fields/distinct/ResetPasswordValidationFields';

export const resetPasswordEntrySchema : ObjectSchema = joi.object().keys({

		'password' : ResetPasswordValidationFields.getPassword() ,

		'confirm_password' : ResetPasswordValidationFields.getConfirmPassword() 
});
