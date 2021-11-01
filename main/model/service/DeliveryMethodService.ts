import { EntityQueryConfig } from '../query/util/EntityQueryConfig';
import { DeliveryMethod } from '../../entity/DeliveryMethod';

export interface DeliveryMethodService {

	findOne(slug : string) : Promise<DeliveryMethod | null>;

	existsOne(slug : string) : Promise<boolean>; 

	findAll(eqp : EntityQueryConfig) : Promise<DeliveryMethod[]>; 

	addOne() : Promise<DeliveryMethod>; 

	save(entry : DeliveryMethod) : Promise<DeliveryMethod | null>;

	updateOne(slug : string) : Promise<DeliveryMethod | null>; 

	relatedEntities(entry : DeliveryMethod) : Promise<DeliveryMethod | null>; 

	update(slug : string , entry : DeliveryMethod) : Promise<DeliveryMethod | null>;

	deleteOne(slug : string) : Promise<DeliveryMethod | null>; 

	remove(slug : string) : Promise<DeliveryMethod | null>; 

	deleteMany(entries : string) : Promise<DeliveryMethod[]>;

	deleteAll() : Promise<DeliveryMethod[]>;

	findAndDeleteAll() : Promise<DeliveryMethod[]>;

}
