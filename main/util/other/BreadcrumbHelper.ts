import { Request , Response , NextFunction } from 'express';

export class BreadcrumbHelper {

	public static build(req : Request , res : Response , next : NextFunction) : void {

		let finalPath : string = '';

		let pathList : string[] = req.url.split('/');

		let lastPath : string = pathList[pathList.length - 1];

				if (lastPath == '') { pathList.pop(); }

		let myPath : any[] = pathList.map((path : string , i : number) => {

			if (path == '') { finalPath = '';

				return {

					'label' : 'Home' ,
					'url' : '/' };

			}

		let pathLabel : string = `${path[0].toUpperCase()}${path.slice(1)}`;

		let composedPath : string = `${finalPath}/${path}`;

		finalPath = composedPath;	
			
			return {

				'label' : pathLabel ,
				'url' : composedPath } 

			});
	
			res.locals.breadcrumb = myPath;

			return next();

	}

}