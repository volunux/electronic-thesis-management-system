import { EntityQueryConfig } from '../query/util/EntityQueryConfig';
import { CrudRepositoryX } from './generic/CrudRepositoryX';
import { Thesis } from '../../entity/Thesis';
import { ThesisCoverImage } from '../../entity/ThesisCoverImage';
import { ThesisDocument } from '../../entity/ThesisDocument';
import { ThesisStatus } from '../../entity/ThesisStatus';

export interface ThesisRepository extends CrudRepositoryX<Thesis> {

	findAllSubmission(eqp : EntityQueryConfig) : Promise<Thesis[]>;
	entryExists(slug : string) : Promise<Thesis | null>;
	existsThesisCoverImage(thesisId : string) : Promise<ThesisCoverImage | null>;
	existsThesisDocument(thesisId : string) : Promise<ThesisDocument | null>;
	saveThesisCoverImage(coverImage : ThesisCoverImage) : Promise<ThesisCoverImage | null>;
	saveThesisDocument(coverImage : ThesisDocument) : Promise<ThesisDocument | null>;
	updateThesisCoverImage(slug : string , coverImageId : number | string) : Promise<ThesisCoverImage | null>;
	updateThesisDocument(slug : string , documentId : number | string) : Promise<ThesisDocument | null>;
	deleteThesisCoverImage(thesisId : string) : Promise<ThesisCoverImage | null>;
	deleteThesisDocument(thesisId : string) : Promise<ThesisDocument | null>;
	updateStatus(slug : string , status : string) : Promise<boolean>;
	findAllStatus() : Promise<ThesisStatus[]>;
} 