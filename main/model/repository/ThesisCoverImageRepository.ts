import { CrudRepository } from './generic/Repository';
import { ThesisCoverImage } from '../../entity/ThesisCoverImage';

export interface ThesisCoverImageRepository {

	findAll() : Promise<ThesisCoverImage[]>;
	findOne(entry : string) : Promise<ThesisCoverImage>;
	remove(entry : ThesisCoverImage) : Promise<ThesisCoverImage>;
	update(entry : ThesisCoverImage) : Promise<ThesisCoverImage>;
	save(entry : ThesisCoverImage) : Promise<ThesisCoverImage>;

} 