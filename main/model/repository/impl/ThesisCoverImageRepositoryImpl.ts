import { ThesisCoverImageRepository } from '../ThesisCoverImageRepository';
import { ThesisCoverImage } from '../../../entity/ThesisCoverImage';

export class ThesisCoverImageRepositoryImpl implements ThesisCoverImageRepository {

	public async save(entry : ThesisCoverImage) : Promise<ThesisCoverImage> {

		return new ThesisCoverImage({});
	}

	public async remove(entry : ThesisCoverImage) : Promise<ThesisCoverImage> {

		return new ThesisCoverImage({});
	} 

	public async update(entry : ThesisCoverImage) : Promise<ThesisCoverImage> {

		return new ThesisCoverImage({});
	}

	public async findAll() : Promise<ThesisCoverImage[]> {

		return [new ThesisCoverImage({}), 
						new ThesisCoverImage({})];
	} 

	public async findOne(entry : string) : Promise<ThesisCoverImage> {

		return new ThesisCoverImage({});
	}

}
