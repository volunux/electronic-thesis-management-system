import { EntityQueryConfig } from '../query/util/EntityQueryConfig';
import { PaymentMethod } from '../../entity/PaymentMethod';

export interface PaymentMethodService {

	findOne(slug : string) : Promise<PaymentMethod | null>;

	existsOne(slug : string) : Promise<boolean>; 

	findAll(eqp : EntityQueryConfig) : Promise<PaymentMethod[]>; 

	addOne() : Promise<PaymentMethod>; 

	save(entry : PaymentMethod) : Promise<PaymentMethod | null>;

	updateOne(slug : string) : Promise<PaymentMethod | null>; 

	relatedEntities(entry : PaymentMethod) : Promise<PaymentMethod | null>; 

	update(slug : string , entry : PaymentMethod) : Promise<PaymentMethod | null>;

	deleteOne(slug : string) : Promise<PaymentMethod | null>; 

	remove(slug : string) : Promise<PaymentMethod | null>; 

	deleteMany(entries : string) : Promise<PaymentMethod[]>;

	deleteAll() : Promise<PaymentMethod[]>;

	findAndDeleteAll() : Promise<PaymentMethod[]>;

}
