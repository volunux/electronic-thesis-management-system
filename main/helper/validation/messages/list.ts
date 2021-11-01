import { allMessages } from './shared/all';
import { thesisMessages } from './distinct/thesis';
import { userMessages } from './distinct/user';
import { displayMessage } from './distinct/display';
import { checkoutMessages } from './distinct/checkout';
import { emailMessageTemplateMessages } from './distinct/email-message-template';
import { emailMessageTypeMessages } from './distinct/email-message-type';

export const validationMessageList : { [key : string] : any } = {

	'general' : { ...allMessages } ,

	'thesis' : { ...thesisMessages } ,

	'user' : { ...userMessages , ...allMessages } ,

	'display' : { ...displayMessage } ,

	'checkout' : { ...checkoutMessages , ...allMessages } ,

	'emailMessageTemplate' : { ...emailMessageTemplateMessages , ...allMessages } ,

	'emailMessageType' : { ...emailMessageTypeMessages , ...allMessages }

}