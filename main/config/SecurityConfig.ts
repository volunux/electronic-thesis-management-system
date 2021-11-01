import { Express , Request , Response , NextFunction } from 'express';
import Csrf from 'csurf';

export class SecurityConfig {

		public static init(app : Express) : void {

/*		app.use(Csrf({'cookie' : {

				'key' : '_csrf' ,

				'path' : '/' ,

				'httpOnly' : true ,

				'maxAge' : 24 * 60 * 60 * 7000 , 

				'secure' : false

		}

	}));*/

/*			app.use((req : Request , res : Response , next : NextFunction) => {

			res.locals._csrf = req.csrfToken();

			return next(); });*/

		}

}