import { Express , Request , Response , NextFunction } from 'express';
import { PassportStatic } from 'passport';
import { PassportConfig } from './PassportConfig';

const passport : PassportStatic = require('passport');
const session = require('express-session');
const flash = require('express-flash');

export class SessionConfig {

	static init(app : Express) : void {

		app.use(session({

			'secret' : process.env['SESSION_SECRET'] ,

			'saveUninitialized' : true ,

			'resave' : false ,

			'cookie' : {'path' : '/' , 'httpOnly' : true , 'maxAge' : 24 * 60 * 60 * 7000 , 'secure' : false }

			}));

		app.use(passport.initialize());
		app.use(passport.session());
		app.use(flash());

		app.use((req : Request , res : Response , next : NextFunction) => {

			res.locals.sessionFlash = (<any>req.session).sessionFlash;

			delete (<any>req.session).sessionFlash;

			next();

		});

		PassportConfig.init(passport);
		PassportConfig.signIn(passport);
		PassportConfig.signUp(passport);
	}
}