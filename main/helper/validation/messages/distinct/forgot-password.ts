import { ValidationMessageType } from '../../ValidationMessageType';

export const forgotPasswordMessages : { [key : string] : any } = {

	'email_address' : ValidationMessageType.getStringInstance(true , 1 , 50 , false , true , 'String') ,

};