import joi , { ObjectSchema } from 'joi';
import { SharedTwoValidationFields } from '../../fields/shared/SharedTwoValidationFields';

export const orderStatusEntrySchema : ObjectSchema = joi.object().keys({

		'name' : SharedTwoValidationFields.getName() ,

		'description' : SharedTwoValidationFields.getDescription() ,

		'slug' : SharedTwoValidationFields.getSlug() ,

		'user_id' : SharedTwoValidationFields.getAuthor()

});
