import { CrudRepositoryX } from './generic/CrudRepositoryX';
import { Thesis } from '../../entity/Thesis';
import { ThesisDocument } from '../../entity/ThesisDocument';
import { ThesisCoverImage } from '../../entity/ThesisCoverImage';

export interface GeneralThesisRepository extends CrudRepositoryX<Thesis> {

	entryExists(slug : string) : Promise<Thesis | null>; 
	getEntryId(slug : string) : Promise<number>;
	existsThesisCoverImage(thesisId : string) : Promise<ThesisCoverImage | null>; 
	existsThesisDocument(thesisId : string) : Promise<ThesisDocument | null>;
	saveThesisCoverImage(entry : ThesisCoverImage) : Promise<ThesisCoverImage | null>;
	saveThesisDocument(entry : ThesisDocument) : Promise<ThesisDocument | null>;
	updateThesisCoverImage(slug : string , coverImageId : number | string) : Promise<void>;
	deleteThesisCoverImage(thesisId : string) : Promise<ThesisCoverImage | null>; 

} 