import { QueryTemplate } from '../../query/util/QueryTemplate';
import { SimpleQueryTemplate } from '../../query/util/SimpleQueryTemplate';
import { DynamicQuery } from '../../query/util/DynamicQuery';
import { AttachmentRepository } from '../AttachmentRepository';
import { AttachmentQuery } from '../../query/AttachmentQuery';
import { Attachment } from '../../../entity/Attachment';

export class AttachmentRepositoryImpl implements AttachmentRepository {

	private queryTemplate : QueryTemplate<Attachment> = new SimpleQueryTemplate<Attachment>();

	public async save(entry : Attachment) : Promise<Attachment | null> {

		let plan : DynamicQuery = AttachmentQuery.save(<Attachment>entry);

		return await this.queryTemplate.save(plan.getText() , plan.getValues() , Attachment);
	}
}
