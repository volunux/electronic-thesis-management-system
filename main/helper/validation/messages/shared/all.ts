import { ValidationMessageType } from '../../ValidationMessageType';

export const allMessages : { [key : string] : any } = {

	'name' : ValidationMessageType.getStringInstance(true , 1 , 150 , false , true , 'String') ,

	'title' : ValidationMessageType.getStringInstance(true , 1 , 150 , false , true , 'String') ,

	'abbreviation' : ValidationMessageType.getStringInstance(true , 2 , 8 , false , true , 'String') ,

	'word' : ValidationMessageType.getStringInstance(true , 3 , 20 , false , true , 'String') ,

	'other_name' : ValidationMessageType.getStringInstance(true , 3 , 20 , false , true , 'String') ,

	'description' : ValidationMessageType.getStringInstance(true , 10 , 250 , false , true , 'String') ,

	'slug' : ValidationMessageType.getStringInstance(true , 1 , 30 , false , true , 'String') ,

	'faculty' : ValidationMessageType.getIntegerInstance(true , 1 , 900000000 , false , true , 'Number or String') ,

	'unit' : ValidationMessageType.getIntegerInstance(true , 1 , 900000000 , false , true , 'Number or String') ,

	'user_id' : ValidationMessageType.getIntegerInstance(true , 1 , 900000000 , false , true , 'Number or String') ,

	'author' : ValidationMessageType.getIntegerInstance(true , 1 , 900000000 , false , true , 'Number or String') ,

	'status' : ValidationMessageType.getStringInstance(true , 1 , 900000000 , false , true , 'Number or String') ,

	'text' : ValidationMessageType.getStringInstance(true , 1 , 500 , false , true , 'String') ,

	'message' : ValidationMessageType.getStringInstance(true , 1 , 1000 , false , true , 'String') 
};