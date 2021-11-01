import joi , { ObjectSchema } from 'joi';
import { SharedTwoValidationFields } from '../../fields/shared/SharedTwoValidationFields';

export const twoEntrySchema : ObjectSchema = joi.object().keys({

		'name' : SharedTwoValidationFields.getName() ,

		'word' : SharedTwoValidationFields.getWord() ,

		'description' : SharedTwoValidationFields.getDescription() ,

		'slug' : SharedTwoValidationFields.getSlug() ,

		'user_id' : SharedTwoValidationFields.getAuthor() ,

		'status' : SharedTwoValidationFields.getStatus()

});
