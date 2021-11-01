import joi , { ObjectSchema } from 'joi';
import { SharedAllValidationFields } from '../../fields/shared/SharedAllValidationFields';

export const publisherEntrySchema : ObjectSchema = joi.object().keys({

		'name' : SharedAllValidationFields.getName() ,

		'slug' : SharedAllValidationFields.getSlug() ,

		'user_id' : SharedAllValidationFields.getAuthor() ,

		'status' : SharedAllValidationFields.getStatus() 
});
