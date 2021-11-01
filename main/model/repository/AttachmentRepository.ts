import { Attachment } from '../../entity/Attachment';

export interface AttachmentRepository {

	save(entry : Attachment) : Promise<Attachment | null>;

} 