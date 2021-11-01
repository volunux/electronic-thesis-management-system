import { AttachmentRepository } from '../../repository/AttachmentRepository';
import { AttachmentRepositoryImpl } from '../../repository/impl/AttachmentRepositoryImpl';
import { AttachmentService } from '../AttachmentService';
import { Attachment } from '../../../entity/Attachment';

export class AttachmentServiceImpl implements AttachmentService {

	private repository : AttachmentRepository = new AttachmentRepositoryImpl();

	public async save(entry : Attachment) : Promise<Attachment | null> {

		return this.repository.save(entry);
	} 

}
