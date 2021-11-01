import { ValidationMessageType } from '../../ValidationMessageType';

export const emailMessageTemplateMessages : { [key : string] : any } = {

	'title' : ValidationMessageType.getStringInstance(true , 1 , 40 , false , true , 'String') ,

	'message' : ValidationMessageType.getStringInstance(true , 20 , 5000 , false , true , 'String') ,

	'message_type' : ValidationMessageType.getIntegerInstance(true , 1 , 900000000 , false , true , 'Number or String') ,

};