import { ThesisCoverImage } from '../../entity/ThesisCoverImage';

export interface ThesisCoverImageService {

	save(entry : ThesisCoverImage) : Promise<ThesisCoverImage>;

	remove(entry : ThesisCoverImage) : Promise<ThesisCoverImage | null>; 

	update(entry : ThesisCoverImage) : Promise<ThesisCoverImage | null>;

	findAll() : Promise<ThesisCoverImage[]>; 

	findOne(slug : string) : Promise<ThesisCoverImage>;

}
