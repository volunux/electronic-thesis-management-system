import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { ThesisSearch } from '../../helper/search/ThesisSearch';
import { Thesis } from '../../entity/Thesis';
import { ThesisCoverImage } from '../../entity/ThesisCoverImage';
import { ThesisDocument } from '../../entity/ThesisDocument';

export class ThesisQuery {

	private static search : ThesisSearch = ThesisSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

			SELECT th._id , th.title , th.price , th.content , th.author_name , th.number_of_page , th.supervisor , th.publication_year , th.updated_on , th.slug , 

			ths.word AS status , ft.name AS faculty , pb.name AS publisher , dt.name AS department , thgrd.name AS grade , thci.location AS cover_image

			FROM THESIS AS th

			LEFT JOIN THESIS_STATUS AS ths ON ths._id = th.status_id

			LEFT JOIN FACULTY AS ft ON ft._id = th.faculty_id

			LEFT JOIN DEPARTMENT AS dt ON dt._id = th.department_id

			LEFT JOIN THESIS_GRADE AS thgrd ON thgrd._id = th.grade_id

			LEFT JOIN USERS AS usr ON usr._id = th.author_id

			LEFT JOIN THESIS_COVER_IMAGE AS thci ON thci.thesis_id = th._id

			LEFT JOIN PUBLISHER AS pb ON pb._id = th.publisher_id 	

			WHERE th.slug = $1

			LIMIT 1

			`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static findAll(q : EntityQueryConfig) : DynamicQuery {

		let $sq : SearchQueryOptions = new SearchQueryOptions();

		let p : number = +(<string>q.getParameter('page'));

		if (q != null && q != undefined) { 

			p = p > 0 ? p * 10 : 0;

			if (q.getParameter('type') === 'status') { $sq = ThesisQuery.search.status(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'title') { $sq = ThesisQuery.search.title(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'publication_year') { $sq = ThesisQuery.search.publicationYear(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = ThesisQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = ThesisQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT th.title , th.publication_year , th.updated_on , th.author_name , th._id AS num , th.slug , ths.word AS status

			FROM THESIS AS th

			INNER JOIN THESIS_STATUS AS ths ON ths._id = th.status_id

			${joinResult} ${conditionResult}

			ORDER BY th.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static findAllSubmission(q : EntityQueryConfig) : DynamicQuery {

		let $sq : SearchQueryOptions = new SearchQueryOptions();

		let p : number = +(<string>q.getParameter('page'));

		if (q != null && q != undefined) { 

			p = p > 0 ? p * 10 : 0;

			if (q.getParameter('type') === 'status') { $sq = ThesisQuery.search.status(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'title') { $sq = ThesisQuery.search.title(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'publication_year') { $sq = ThesisQuery.search.publicationYear(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = ThesisQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = ThesisQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let status : string = "WHERE ths.word = 'Pending'";

		status = conditionResult.trim().length === 0 ? status : " AND ths.word = 'Pending'";

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT th.title , th.publication_year , th.updated_on , th.author_name AS author_name , th.thesis_no AS num , th.slug , ths.word AS status

			FROM THESIS AS th

			INNER JOIN THESIS_STATUS AS ths ON ths.thesis_status_id = th.status_id

			${joinResult}

			${conditionResult} ${status}

			ORDER BY th.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : Thesis) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO THESIS (title , price , content , number_of_page , grade_id , supervisor , 

																						publisher_id , publication_year , faculty_id , department_id , thesis_no , slug , user_id , author_name , author_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12 , $13 , $14 , $15 , $16)

													RETURNING thesis_id AS _id , title , price , number_of_page , supervisor , slug

													`;

		let values : any[] = [entry.getTitle() , entry.getPrice() , entry.getContent() , entry.getNumberOfPage() , entry.getGrade() , entry.getSupervisor() , entry.getPublisher() , 

													entry.getPublicationYear() , entry.getFaculty() , entry.getDepartment() , c , s , entry.getUserId() , entry.getAuthorName() , entry.getAuthorId() , entry.getStatus()];

		return DynamicQuery.create(text , values);

	}

	public static saveThesisCoverImage(coverImage : ThesisCoverImage) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO THESIS_COVER_IMAGE (location , key , mimetype , size , thesis_cover_image_no , slug , user_id , thesis_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8 , (SELECT status_id AS _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													ON CONFLICT (thesis_id)

													DO UPDATE SET location = $1 , key = $2 , mimetype = $3 , size = $4 , user_id = $7 

													RETURNING thesis_cover_image_id AS _id , slug , location , key

												`;

		let values : any[] = [coverImage.getLocation() , coverImage.getKey() , coverImage.getMimetype() , coverImage.getSize() , c , s , coverImage.getUserId() , coverImage.getThesisId()];

		return DynamicQuery.create(text , values);

	}

	public static saveThesisDocument(document : ThesisDocument) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO THESIS_DOCUMENT (location , key , mimetype , size , thesis_cover_image_no , slug , user_id , thesis_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8 , (SELECT status_id AS _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													ON CONFLICT (thesis_id)

													DO UPDATE SET location = $1 , key = $2 , mimetype = $3 , size = $4 , user_id = $7 

													RETURNING thesis_document_id AS _id , slug , location , key

												`;

		let values : any[] = [document.getLocation() , document.getKey() , document.getMimetype() , document.getSize() , c , s , document.getUserId() , document.getThesisId()];

		return DynamicQuery.create(text , values);

	}

	public static relatedEntities() : DynamicQuery {

		let text : string = `SELECT json_build_object(

			'Faculty' , (SELECT json_agg(row_to_json(ft))

									FROM (SELECT _id , name

										FROM FACULTY) AS ft ) ,

			'Department' , (SELECT json_agg(row_to_json(dt))

											FROM (SELECT _id , name

												FROM DEPARTMENT) AS dt ) ,

			'ThesisGrade' , (SELECT json_agg(row_to_json(thgrd)) 

											FROM (SELECT _id , name , description

												FROM THESIS_GRADE) AS thgrd ) ,

			'Publisher' , (SELECT json_agg(row_to_json(pb)) 

										FROM (SELECT _id , name 

											FROM PUBLISHER) AS pb ) ,

			'ThesisStatus' , (SELECT json_agg(row_to_json(ths)) 

												FROM (SELECT _id , word

												FROM THESIS_STATUS) AS ths )

								) AS result

		`;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static update(slug : string , entry : Thesis) : DynamicQuery {

		let text : string = `UPDATE THESIS 

													SET title = $1 , price = $2 , content = $3 , number_of_page = $4 , publisher_id = $5 , supervisor = $6 , publication_year = $7 ,

													grade_id = $8 , department_id = $9 , faculty_id = $10 , status_id = $11 , author_name = $12 , user_id = $13 , updated_on = $15

													WHERE slug = $14

													RETURNING thesis_id AS _id , title , publication_year , slug

												`;

		let values : any[] = [entry.getTitle() , entry.getPrice() , entry.getContent() , entry.getNumberOfPage() , entry.getPublisher() , entry.getSupervisor() , entry.getPublicationYear() ,

													entry.getGrade() , entry.getDepartment() , entry.getFaculty() , entry.getStatus() , entry.getAuthorName() , entry.getUserId() , slug , 'NOW()'];

		return DynamicQuery.create(text , values);

	}	

	public static updateStatus(slug : string , status : string) : DynamicQuery {

		let text : string = `UPDATE THESIS 

													SET status_id = $1

													WHERE slug = $2

													RETURNING _id

												`;

		let values : any[] = [status , slug];

		return DynamicQuery.create(text , values);

	}	

	public static findAllStatus() : DynamicQuery {

		let text : string = `

			SELECT ths._id , ths.word AS name

			FROM THESIS_STATUS AS ths

			`;

		return DynamicQuery.create(text , []);
	}

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT th.slug , th.title , th.number_of_page , th.author_name , th.publication_year , ths.word AS status

		FROM THESIS AS th

		LEFT JOIN THESIS_STATUS AS ths ON ths.thesis_status_id = th.status_id

		WHERE th.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static remove(slug : string) : DynamicQuery {

		let text : string = `

		DELETE FROM THESIS

		WHERE slug = $1 

		RETURNING thesis_id AS _id , title , publication_year , slug

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static deleteMany(entries : string) : DynamicQuery {

		let text : string = `

		DELETE FROM THESIS

		WHERE thesis_no IN (${entries})

		RETURNING thesis_id AS _id , title , publication_year , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static deleteAll() : DynamicQuery {

		let text : string = `

		SELECT slug FROM THESIS

		WHERE slug IS NOT NULL

		LIMIT 1

		`;

		return DynamicQuery.create(text , []);

	}

	public static findAndDeleteAll() : DynamicQuery {

		let text : string = `

		DELETE FROM THESIS

		RETURNING thesis_id AS _id , title , publication_year , slug

		`;

		return DynamicQuery.create(text , []);

	}

	public static existsOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT _id , true AS exists

		FROM THESIS

		WHERE slug = $1

		LIMIT 1

	`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static entryExists(slug : string) : DynamicQuery {

		let text : string = `

		SELECT _id , title , slug 

		FROM THESIS

		WHERE slug = $1

		LIMIT 1

	`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static updateOne(slug : string) : DynamicQuery {

		let text : string = `

		SELECT th.title , th.price , th.content , th.number_of_page , th.grade_id AS grade , th.supervisor , th.author_name , th.publisher_id AS publisher ,

		th.publication_year , th.slug , th.status_id AS status , th.department_id AS department , th.faculty_id AS faculty

		FROM THESIS AS th

		WHERE th.slug = $1

		LIMIT 1

		`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);
	}

	public static existsThesisCoverImage(thesisId : string) : DynamicQuery {

		let text : string = `

		SELECT location , key , slug 

		FROM THESIS_COVER_IMAGE

		WHERE thesis_id = $1

		LIMIT 1

	`;

		let values : any[] = [thesisId];

		return DynamicQuery.create(text , values);

	}

	public static existsThesisDocument(thesisId : string) : DynamicQuery {

		let text : string = `

		SELECT location , key , slug 

		FROM THESIS_DOCUMENT

		WHERE thesis_id = $1

		LIMIT 1

	`;

		let values : any[] = [thesisId];

		return DynamicQuery.create(text , values);

	}

	public static deleteThesisCoverImage(thesisId : string) : DynamicQuery {

		let text : string = `

		DELETE

		FROM THESIS_COVER_IMAGE

		WHERE thesis_id = $1

		RETURNING location , key , slug 

	`;

		let values : any[] = [thesisId];

		return DynamicQuery.create(text , values);

	}

	public static deleteThesisDocument(thesisId : string) : DynamicQuery {

		let text : string = `

		DELETE

		FROM THESIS_DOCUMENT

		WHERE thesis_id = $1

		RETURNING location , key , slug 

	`;

		let values : any[] = [thesisId];

		return DynamicQuery.create(text , values);

	}

}