import { QueryResult } from 'pg';
import { CrudServiceX } from './generic/CrudServiceX';
import { Thesis } from '../../entity/Thesis';
import { ThesisCoverImage } from '../../entity/ThesisCoverImage';
import { ThesisDocument } from '../../entity/ThesisDocument';

export interface GeneralThesisService extends CrudServiceX<Thesis> {

	entryExists(slug : string) : Promise<Thesis | null>;
	getEntryId(slug : string) : Promise<number>;
	existsThesisCoverImage(thesisId : string) : Promise<ThesisCoverImage | null>; 
	existsThesisDocument(thesisId : string) : Promise<ThesisDocument | null>;
	saveThesisCoverImage(entry : ThesisCoverImage) : Promise<ThesisCoverImage | null>;
	saveThesisDocument(entry : ThesisDocument) : Promise<ThesisDocument | null>;
	updateThesisCoverImage(slug : string , coverImageId : number | string) : Promise<void>;
	deleteThesisCoverImage(thesisId : string) : Promise<ThesisCoverImage | null>; 

}
