import { ValidationMessageType } from '../../ValidationMessageType';

export const emailMessageTypeMessages : { [key : string] : any } = {

	'title' : ValidationMessageType.getStringInstance(true , 1 , 100 , false , true , 'String') ,

	'description' : ValidationMessageType.getStringInstance(true , 1 , 300 , false , true , 'String') ,

};