import crypto from 'crypto-random-string';
import { DynamicQuery } from './util/DynamicQuery';
import { Attachment } from '../../entity/Attachment';

export class AttachmentQuery {

	public static save(entry : Attachment) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO ATTACHMENT (location , key , attachment_no , slug , user_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , (SELECT status_id AS _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													RETURNING attachment_id AS _id , location , key

												`;

		let values : any[] = [entry.getLocation() , entry.getKey() , c , s , entry.getUserId()];

		return DynamicQuery.create(text , values);

	}

}