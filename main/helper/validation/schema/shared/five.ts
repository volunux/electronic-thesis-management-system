import joi , { ObjectSchema } from 'joi';
import { SharedFiveValidationFields } from '../../fields/shared/SharedFiveValidationFields';

export const fiveEntrySchema : ObjectSchema = joi.object().keys({

		'title' : SharedFiveValidationFields.getTitle() ,

		'description' : SharedFiveValidationFields.getDescription() ,

		'slug' : SharedFiveValidationFields.getSlug() ,

		'user_id' : SharedFiveValidationFields.getAuthor() ,

		'status' : SharedFiveValidationFields.getStatus()

});
