import { Request , Response , NextFunction } from 'express';
import { entriesLinks , changeDisplayList , othersLink } from '../util/other/entries-list';
import fs from 'fs';
import path from 'path';

export class AdminController {

	public dashboard(req : Request , res : Response , next : NextFunction) : void {

		let flashMessage : string = req.flash('success')[0];

		res.render('pages/distinct/admin/dashboard' ,  {'flash' : flashMessage});
	}

	public entries(req : Request , res : Response , next : NextFunction) : void {

		let entries : any[] = entriesLinks;

		res.render('pages/distinct/admin/entries' , {'title' : 'Entries' , 'entries' : entries });
	}

	public others(req : Request , res : Response , next : NextFunction) : void {

		let entries : any[] = othersLink;

		res.render('pages/distinct/admin/others' , {'title' : 'Entries' , 'entries' : entries });
	}

	public updateOneDisplay(req : Request , res : Response , next : NextFunction) : void {

		let entries : any[] = changeDisplayList;

		res.render('pages/distinct/admin/update-display' , {'title' : 'Display Picture' , 'displays' : entries });
	}

	public updateDisplay(req : Request , res : Response , next : NextFunction) : void {

		let entries : any[] = changeDisplayList;

		if (req.validationErrors.isEmpty() === false) { 

			let errors : string[] = req.validationErrors.getErrors();

			let titlePath : string = process.cwd() + '/src/main/resource/images/';

			let file : Express.Multer.File = req.file;

			let ext : string = path.extname(file.originalname);

			let fileName : string = req.body.display_type + ext;

			let filePath : string = titlePath + fileName;

			if (fs.existsSync(filePath)) { fs.unlinkSync(filePath); }

			res.render('pages/distinct/admin/update-display' , {'title' : 'Display Picture' , 'displays' : entries , 'errors' : errors }); }

		else {

		req.flash('success' , 'Display Picture successfully updated.');

		res.redirect('/internal/admin/'); }
	}

}