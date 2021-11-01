import { ThesisCoverImageRepository } from '../../repository/ThesisCoverImageRepository';
import { ThesisCoverImageRepositoryImpl } from '../../repository/impl/ThesisCoverImageRepositoryImpl';
import { ThesisCoverImageService } from '../ThesisCoverImageService';
import { ThesisCoverImage } from '../../../entity/ThesisCoverImage';

export class ThesisCoverImageServiceImpl implements ThesisCoverImageService {

	private repository : ThesisCoverImageRepository = new ThesisCoverImageRepositoryImpl();

	public async save(entry : ThesisCoverImage) : Promise<ThesisCoverImage> {

		return this.repository.save(entry);
	}

	public async remove(entry : ThesisCoverImage) : Promise<ThesisCoverImage | null> {

		return this.repository.remove(entry);
	} 

	public async update(entry : ThesisCoverImage) : Promise<ThesisCoverImage | null> {

		return this.repository.update(entry);
	}

	public async findAll() : Promise<ThesisCoverImage[]> {

		return this.repository.findAll();
	} 

	public async findOne(slug : string) : Promise<ThesisCoverImage> {

		return this.repository.findOne(slug);
	}

}
