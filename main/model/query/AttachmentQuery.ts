import crypto from 'crypto-random-string';
import { DynamicQuery } from './util/DynamicQuery';
import { Attachment } from '../../entity/Attachment';

export class AttachmentQuery {

	public static save(entry : Attachment) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO ATTACHMENT (location , key , slug , user_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , (SELECT _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													RETURNING _id , location , key

												`;

		let values : any[] = [entry.getLocation() , entry.getKey() , s , entry.getUserId()];

		return DynamicQuery.create(text , values);

	}

}