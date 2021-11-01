import { EntityQueryConfig } from '../query/util/EntityQueryConfig';
import { CrudServiceX } from './generic/CrudServiceX';
import { Thesis } from '../../entity/Thesis';
import { ThesisCoverImage } from '../../entity/ThesisCoverImage';
import { ThesisDocument } from '../../entity/ThesisDocument';
import { ThesisStatus } from '../../entity/ThesisStatus';

export interface ThesisService extends CrudServiceX<Thesis> {

	findAllSubmission(eqp : EntityQueryConfig) : Promise<Thesis[]>;
	entryExists(slug : string) : Promise<Thesis | null>;
	existsThesisCoverImage(thesisId : string) : Promise<ThesisCoverImage | null>; 
	existsThesisDocument(thesisId : string) : Promise<ThesisDocument | null>; 
	saveThesisCoverImage(entry : ThesisCoverImage) : Promise<ThesisCoverImage | null>;
	saveThesisDocument(entry : ThesisDocument) : Promise<ThesisDocument | null>;
	updateThesisCoverImage(slug : string , coverImageId : number | string) : Promise<ThesisCoverImage | null>;
	updateThesisDocument(slug : string , documentId : number | string) : Promise<ThesisDocument | null>;
	deleteThesisCoverImage(thesisId : string) : Promise<ThesisCoverImage | null>; 
	deleteThesisDocument(thesisId : string) : Promise<ThesisDocument | null>;
	updateStatus(slug : string , status : string) : Promise<boolean>;
	findAllStatus() : Promise<ThesisStatus[]>;

}
