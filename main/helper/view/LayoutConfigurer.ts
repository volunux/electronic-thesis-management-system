import { Request , Response , NextFunction } from 'express';

export class LayoutConfigurer {

	private static layoutList : Map<string , string> = new Map<string , string>();

	public static setLayout(name : string) : any {

		this.layoutList.set('main' , 'main');
		this.layoutList.set('rich' , 'rich');
		this.layoutList.set('internal' , 'internal');
		this.layoutList.set('profile' , 'profile');

		let layoutName : string | undefined = this.layoutList.get(name);

		return function(req : Request , res : Response , next : NextFunction) : void {

			req.app.locals.layout = layoutName;

			return next();
		}

	} 

}