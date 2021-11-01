import { Express } from 'express';
import helmet from 'helmet';
import NodeJS from 'node:process';

export class ContentSecurityPolicyConfigurer {

		public static init(app : Express) : void {

		app.use(helmet());

		app.use(helmet.contentSecurityPolicy({

				'directives' : {

					'img-src' : ["'self'" , "'unsafe-inline'" , "blob:" , "s3.amazonaws.com" , 

						(<NodeJS.ProcessEnv>process.env)['s31'] as string ,

						(<NodeJS.ProcessEnv>process.env)['s32'] as string ,

						(<NodeJS.ProcessEnv>process.env)['s33'] as string ,

						(<NodeJS.ProcessEnv>process.env)['s34'] as string ,

						(<NodeJS.ProcessEnv>process.env)['s35'] as string , 

						(<NodeJS.ProcessEnv>process.env)['s36'] as string ] ,

					'script-src' : ["'self'" , "*.amazonaws.com" , "s3.amazonaws.com" , "svc.webspellchecker.net" ,

						(<NodeJS.ProcessEnv>process.env)['s31'] as string ,

						(<NodeJS.ProcessEnv>process.env)['s32'] as string ,

						(<NodeJS.ProcessEnv>process.env)['s33'] as string ,

						(<NodeJS.ProcessEnv>process.env)['s34'] as string ,

						(<NodeJS.ProcessEnv>process.env)['s35'] as string ,

						(<NodeJS.ProcessEnv>process.env)['s36'] as string ] ,

					'style-src' : ["'self'" , "'unsafe-inline'" , "*.amazonaws.com" , "s3.amazonaws.com" ] ,

					'default-src' : ["'self'" , "'unsafe-inline'" , "blob:" , "s3.amazonaws.com" , "svc.webspellchecker.net" ,

						(<NodeJS.ProcessEnv>process.env)['s31'] as string ,

						(<NodeJS.ProcessEnv>process.env)['s32'] as string ,

						(<NodeJS.ProcessEnv>process.env)['s33'] as string ,

						(<NodeJS.ProcessEnv>process.env)['s34'] as string ,

						(<NodeJS.ProcessEnv>process.env)['s35'] as string ,

						(<NodeJS.ProcessEnv>process.env)['s36'] as string ]
		} } ));

		}



}