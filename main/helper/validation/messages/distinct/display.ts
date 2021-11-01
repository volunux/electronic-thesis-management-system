import { ValidationMessageType } from '../../ValidationMessageType';

export const displayMessage : { [key : string] : any } = {

	'display_type' : ValidationMessageType.getStringInstance(true , 1 , 150 , false , true , 'String')

};