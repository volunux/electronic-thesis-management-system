import joi , { ObjectSchema } from 'joi';
import { UserCreateValidationFields } from '../../fields/distinct/UserCreateValidationFields';

export const userCreateEntrySchema : ObjectSchema = joi.object().keys({

		'first_name' : UserCreateValidationFields.getFirstName() ,

		'last_name' : UserCreateValidationFields.getLastName() ,

		'email_address' : UserCreateValidationFields.getEmailAddress() ,

		'username' : UserCreateValidationFields.getUsername() ,

		'about' : UserCreateValidationFields.getAbout() ,

		'matriculation_number' : UserCreateValidationFields.getMatriculationNumber() ,

		'department' : UserCreateValidationFields.getDepartment() ,

		'faculty' : UserCreateValidationFields.getFaculty() ,

		'level' : UserCreateValidationFields.getLevel() ,

		'country' : UserCreateValidationFields.getCountry() ,

		'user_status' : UserCreateValidationFields.getStatus() ,

		'slug' : UserCreateValidationFields.getSlug() ,

		'password' : UserCreateValidationFields.getPassword() ,

		'confirm_password' : UserCreateValidationFields.getConfirmPassword()

});
