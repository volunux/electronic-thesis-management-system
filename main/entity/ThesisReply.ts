import { EntityAll } from './abstract/EntityAll';

export class ThesisReply extends EntityAll {

	constructor(data : any) {

		super(data);

		this.text = data.text ? data.text : undefined;
		this.comment_author_name = data.comment_author_name ? data.comment_author_name : "Anonymous";
		this.review_id = data.review_id ? data.review_id : undefined;
	}

	private text : string;
	private comment_author_name : string;
	private review_id : string;

	public getText() : string {

		return this.text;
	}

	public getCommentAuthorName() : string {

		return this.comment_author_name;
	}

	public getReviewId() : string {

		return this.review_id;
	}

}