import crypto from 'crypto-random-string';
import { EntityQueryConfig } from './util/EntityQueryConfig';
import { SearchQueryOptions } from '../../helper/search/common/SearchQueryOptions';
import { DynamicQuery } from './util/DynamicQuery';
import { ThesisDocument } from '../../entity/ThesisDocument';
import { ThesisCoverImage } from '../../entity/ThesisCoverImage';
import { GeneralThesisSearch } from '../../helper/search/GeneralThesisSearch';
import { Thesis } from '../../entity/Thesis';

export class GeneralThesisQuery {

	private static search : GeneralThesisSearch = GeneralThesisSearch.getInstance();

	public static findOne(slug : string) : DynamicQuery {

		let text : string = `

			SELECT th._id , th.title , th.price , th.content , th.author_name AS author , th.number_of_page , th.supervisor , th.publication_year , th.updated_on , th.slug , ths.word AS status ,

			ft.name AS faculty , dt.name AS department , thgrd.name AS grade , thgrd.description AS grade_description , pub.name AS publisher , usr.first_name || ' ' || usr.last_name AS full_name ,

			(SELECT json_agg(row_to_json(rth))

				FROM (SELECT rth.title , rth.author_name AS author , rth.number_of_page , rth.publication_year , slug

					FROM THESIS AS rth WHERE rth._id != th._id ) AS rth ) AS related

			FROM THESIS AS th

			LEFT JOIN THESIS_STATUS AS ths ON ths._id = th.status_id

			LEFT JOIN FACULTY AS ft ON ft._id = th.faculty_id

			LEFT JOIN DEPARTMENT AS dt ON dt._id = th.department_id

			LEFT JOIN PUBLISHER AS pub ON pub._id = th.publisher_id

			LEFT JOIN THESIS_GRADE AS thgrd ON thgrd._id = th.grade_id

			LEFT JOIN USERS AS usr ON usr._id = th.author_id

			WHERE th.slug = $1

			LIMIT 1

			`;

		let values : any[] = [slug];

		return DynamicQuery.create(text , values);

	}

	public static findAll(q : EntityQueryConfig) : DynamicQuery {

		let $sq : SearchQueryOptions = new SearchQueryOptions();

		let p : number = +(<string>q.getParameter('page'));

		if (q !== null && q !== undefined) { 

			p = p > 0 ? (p - 1) * 10 : 0;

			if (q.getParameter('type') === 'status') { $sq = GeneralThesisQuery.search.status(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'title') { $sq = GeneralThesisQuery.search.title(<string>q.getParameter('search')); }

			else if (q.getParameter('type') === 'publication_year') { $sq = GeneralThesisQuery.search.publicationYear(<string>q.getParameter('search')); }

			else if (q.existsParameter('updated_min')) { $sq = GeneralThesisQuery.search.minDate(<string>q.getParameter('updated_min')); }

			else if (q.existsParameter('updated_max')) { $sq = GeneralThesisQuery.search.maxDate(<string>q.getParameter('updated_max')); }
		}

		let conditionResult : string = $sq.getSearchQueryConditionOptions().buildResult();

		let joinResult : string = $sq.getSearchQueryJoinOptions().buildResult();

		let text : string = `

			SELECT th._id , th.title , th.price , th.publication_year , th.updated_on , th.author_name , th._id AS num , th.slug , dt.name AS department , ths.word AS status

			FROM THESIS AS th

			LEFT JOIN DEPARTMENT AS dt ON dt._id = th.department_id

			INNER JOIN THESIS_STATUS AS ths ON ths._id = th.status_id

			${joinResult} ${conditionResult}

			ORDER BY th.updated_on DESC

			LIMIT 11 OFFSET ${p}

			`;

		return DynamicQuery.create(text , []);
	}

	public static save(entry : Thesis) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO THESIS (title , price , content , number_of_page , grade_id , supervisor , 

																						publisher_id , publication_year , faculty_id , department_id , slug , user_id , author_name , author_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12 , $13 , $14 , (SELECT _id FROM THESIS_STATUS AS ths WHERE ths.word = 'Pending' LIMIT 1))

													RETURNING _id , title , price , number_of_page , supervisor , slug

													`;

		let values : any[] = [entry.getTitle() , entry.getPrice() , entry.getContent() , entry.getNumberOfPage() , entry.getGrade() , entry.getSupervisor() , 

													entry.getPublisher() , entry.getPublicationYear() , entry.getFaculty() , entry.getDepartment() , s , entry.getUserId() ,

													entry.getAuthorName() , entry.getAuthorId()];

		return DynamicQuery.create(text , values);

	}

	public static saveThesisCoverImage(entry : ThesisCoverImage) : DynamicQuery {

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO THESIS_COVER_IMAGE (location , key , mimetype , size , slug , user_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , $6 , (SELECT _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													RETURNING slug`;

		let values : any[] = [entry.getLocation() , entry.getKey() , entry.getMimetype() , entry.getSize() , s , entry.getUserId()];

		return DynamicQuery.create(text , values);

	}

	public static saveThesisDocument(document : ThesisDocument) : DynamicQuery {

		let c : number = +(crypto({'length' : 9 , 'type' : 'numeric'}));

		let s : string = (crypto({'length' : 29 , 'type' : 'alphanumeric'})).toLowerCase();

		let text : string = `INSERT INTO THESIS_DOCUMENT (location , key , mimetype , size , slug , user_id , thesis_id , status_id)

													VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8 , (SELECT _id FROM STATUS AS gs WHERE gs.word = 'Active' LIMIT 1))

													ON CONFLICT (thesis_id)

													DO UPDATE SET location = $1 , key = $2 , mimetype = $3 , size = $4 , user_id = $7 

													RETURNING slug
												
												`;

		let values : any[] = [document.getLocation() , document.getKey() , document.getMimetype() , document.getSize() , s , document.getUserId() , document.getThesisId()];

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

											FROM (SELECT _id , name 

											FROM THESIS_GRADE) AS thgrd ) ,

			'Publisher' , (SELECT json_agg(row_to_json(pub)) 

									FROM (SELECT _id , name 

										FROM PUBLISHER) AS pub )

								) AS result

		`;

		let values : any[] = [];

		return DynamicQuery.create(text , values);

	}

	public static update(slug : string , entry : Thesis) : DynamicQuery {

		let text : string = `UPDATE THESIS 

													SET title = $1 , price = $2 , content = $3 , number_of_page = $4 , publisher_id = $5 , supervisor = $6 , publication_year = $7 ,

													grade_id = $8 , department_id = $9 , faculty_id = $10 , status_id = $11 , author_name = $12 , user_id = $13

													WHERE slug = $14

													RETURNING _id , title , publication_year , slug

												`;

		let values : any[] = [entry.getTitle() , entry.getPrice() , entry.getContent() , entry.getNumberOfPage() , entry.getPublisher() , entry.getSupervisor() , entry.getPublicationYear() ,

													entry.getGrade() , entry.getDepartment() , entry.getFaculty() , entry.getStatus() , entry.getAuthorName() , entry.getUserId() , slug];

		return DynamicQuery.create(text , values);

	}	

	public static deleteOne(slug : string) : DynamicQuery {

		let text : string = `

			SELECT th.slug , th.title , th.number_of_page , th.author_name , th.publication_year , ths.word AS status

			FROM THESIS AS th

			LEFT JOIN THESIS_STATUS AS ths ON ths._id = th.status_id

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

			RETURNING _id , title , publication_year , slug

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

	public static entryId(slug : string) : DynamicQuery {

		let text : string = `

			SELECT _id

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

	public static existsThesisCoverImage(entryId : string) : DynamicQuery {

		let text : string = `

			SELECT location , key , slug 

			FROM THESIS_COVER_IMAGE

			WHERE thesis_id = $1

			LIMIT 1

		`;

		return DynamicQuery.create(text , [entryId]);

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

	public static deleteThesisCoverImage(entryId : string) : DynamicQuery {

		let text : string = `

			DELETE

			FROM THESIS_COVER_IMAGE

			WHERE thesis_id = $1

			LIMIT 1

  		RETURNING location , key , slug 

		`;

		return DynamicQuery.create(text , [entryId]);

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