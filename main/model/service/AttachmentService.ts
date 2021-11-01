import { Attachment } from '../../entity/Attachment';

export interface AttachmentService {

	save(entry : Attachment) : Promise<Attachment | null>;
}
