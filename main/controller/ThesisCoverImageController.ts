import { Request , Response , NextFunction } from 'express';
import { ThesisCoverImageServiceImpl } from '../model/service/impl/ThesisCoverImageServiceImpl';
import { ThesisCoverImageService } from '../model/service/ThesisCoverImageService';
import { ThesisCoverImage } from '../entity/ThesisCoverImage';

export class ThesisCoverImageController {

	private thesisCoverImageService : ThesisCoverImageService = new ThesisCoverImageServiceImpl(); 

	public home(req : Request , res : Response , next : NextFunction) : void {

			res.render('pages/shared/four/dashboard' , {'entryType' : 'ThesisCoverImage' , 'title' : 'ThesisCoverImage'});

	}

	public findOne(req : Request , res : Response , next : NextFunction) : void {

			let thesisCoverImage : ThesisCoverImage = new ThesisCoverImage({});

			res.render('pages/shared/four/entry-detail' , {'entry' : thesisCoverImage , 'title' : 'ThesisCoverImage'});

	}

	public findAll(req : Request , res : Response , next : NextFunction) : void {

			let thesisCoverImage = req.params.thesisCoverImage;

			let thesisCoverImages : ThesisCoverImage[] = [
				new ThesisCoverImage({}),
				new ThesisCoverImage({}),
				new ThesisCoverImage({}),
				new ThesisCoverImage({}),
				new ThesisCoverImage({}),
				new ThesisCoverImage({}),
				new ThesisCoverImage({}),
				new ThesisCoverImage({}),
				new ThesisCoverImage({}),
				new ThesisCoverImage({}),
			];

			res.render('pages/shared/four/entries' , {'entries' : thesisCoverImages , 'title' : 'ThesisCoverImage'});
	}

	public addOne(req : Request , res : Response , next : NextFunction) : void {

			let thesisCoverImage : ThesisCoverImage = new ThesisCoverImage({});

			res.render('pages/shared/four/entry-create' , {'entry' : thesisCoverImage , 'title' : 'ThesisCoverImage' , 'errors' : null});

	}

	public save(req : Request , res : Response , next : NextFunction) : void {

		let b = req.body;

			if (!req.validationErrors.isEmpty()) {

				let errors = req.validationErrors.getErrors();

			res.render('pages/shared/four/entry-create' , {'entry' : b , 'title' : 'ThesisCoverImage' , 'errors' : errors});

				return;
			}

			res.json({'message' : 'Success'});
	}

	public updateOne(req : Request , res : Response , next : NextFunction) : void {

			let thesisCoverImage : ThesisCoverImage = new ThesisCoverImage({});

			res.render('pages/shared/four/entry-update' , {'entry' : thesisCoverImage , 'title' : 'ThesisCoverImage' , 'errors' : null});

	}

	public update(req : Request , res : Response , next : NextFunction) : void {

		let b = req.body;

			if (!req.validationErrors.isEmpty()) {

				let errors = req.validationErrors.getErrors();

			res.render('pages/shared/four/entry-update' , {'entry' : b , 'title' : 'ThesisCoverImage' , 'errors' : errors});

				return;
			}

			res.json({'message' : 'Success'});

	}

	public deleteOne(req : Request , res : Response , next : NextFunction) : void {

			let thesisCoverImage : ThesisCoverImage = new ThesisCoverImage({});

			res.render('pages/shared/four/entry-delete' , {'entry' : thesisCoverImage , 'title' : 'ThesisCoverImage' , 'errors' : null});

	}

	public delete(req : Request , res : Response , next : NextFunction) : void {

		let b = req.body;

			if (!req.validationErrors.isEmpty()) {

				let errors = req.validationErrors.getErrors();

			res.render('pages/shared/four/entry-delete' , {'entry' : b , 'title' : 'ThesisCoverImage' , 'errors' : errors});

				return;
			}

			res.json({'message' : 'Success'});
	} 

	public deleteMany(req : Request , res : Response , next : NextFunction) : void {

		let b = req.body;

			res.json({'message' : 'Success'});

	}

	public deleteAll(req : Request , res : Response , next : NextFunction) : void {

			res.render('pages/shared/all/entry-delete-all' , {'entryType' : 'ThesisCoverImage' , 'title' : 'ThesisCoverImage'});
	}

	public findAndDeleteAll(req : Request , res : Response , next : NextFunction) : void {

		let b = req.body;

			res.redirect('/internal/thesisCoverImage/');
	}

}