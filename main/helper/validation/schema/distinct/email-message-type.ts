import joi , { ObjectSchema } from 'joi';
import { EmailMessageTypeValidationFields } from '../../fields/distinct/EmailMessageTypeValidationFields';

export const emailMessageTypeEntrySchema : ObjectSchema = joi.object().keys({

		'title' : EmailMessageTypeValidationFields.getTitle() ,

		'description' : EmailMessageTypeValidationFields.getDescription() ,

		'slug' : EmailMessageTypeValidationFields.getSlug() ,

		'user_id' : EmailMessageTypeValidationFields.getAuthor() ,

		'status' : EmailMessageTypeValidationFields.getStatus()

});
