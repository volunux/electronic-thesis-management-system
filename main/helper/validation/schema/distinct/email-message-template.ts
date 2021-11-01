import joi , { ObjectSchema } from 'joi';
import { EmailMessageTemplateValidationFields } from '../../fields/distinct/EmailMessageTemplateValidationFields';
import { SharedAllValidationFields } from '../../fields/shared/SharedAllValidationFields'; 

export const emailMessageTemplateEntrySchema : ObjectSchema = joi.object().keys({

		'title' : EmailMessageTemplateValidationFields.getTitle() ,

		'message' : EmailMessageTemplateValidationFields.getMessage() ,

		'message_type' : EmailMessageTemplateValidationFields.getMessageType() ,

		'slug' : SharedAllValidationFields.getSlug() ,

		'user_id' : SharedAllValidationFields.getAuthor() ,

		'status' : SharedAllValidationFields.getStatus() ,
});
