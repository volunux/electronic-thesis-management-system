import joi , { ObjectSchema } from 'joi';
import { SharedThreeValidationFields } from '../../fields/shared/SharedThreeValidationFields';

export const threeEntrySchema : ObjectSchema = joi.object().keys({

		'text' : SharedThreeValidationFields.getText() ,

		'slug' : SharedThreeValidationFields.getSlug() ,

		'user_id' : SharedThreeValidationFields.getAuthor() ,

		'status' : SharedThreeValidationFields.getStatus()

});
