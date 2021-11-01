import express ,  { Express , Request , Response , NextFunction } from 'express';
import NodeJS from 'node:process';
import dotenv from 'dotenv';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import path from 'path';
import moment from 'moment';

import { AppRouter } from '../route/AppRouter';
import { DBConnection } from '../config/db/DBConnection';
import { ConfigFilePaths } from './ConfigFilePaths';
import { SessionConfig } from './SessionConfig';
import { CartConfig } from './shop/CartConfig';
import { SecurityConfig } from './SecurityConfig';
import { TemplateEngineConfig } from './TemplateEngineConfig';
import { ContentSecurityPolicyConfigurer } from './ContentSecurityPolicyConfigurer';
import { InternalRoute } from './InternalRoute';
import { GlobalErrorHandler } from './GlobalErrorHandler';
import { Query } from '../model/query/util/Query';

const nocache = require("nocache");

export class AppConfig {

	static init(app : Express) : void {

		const PORT : number = Number.parseInt((<NodeJS.ProcessEnv>process.env).PORT as string) || 3000;

		dotenv.config({'path' : ConfigFilePaths.envDir});
		DBConnection.connect();

		TemplateEngineConfig.init(app);
		app.set('x-powered-by' , false);
		app.disable('view cache');

		app.locals.moment = moment;
		app.locals.dateFormat = 'MMMM Do , YYYY';
		
		app.use(nocache());
		app.use(compression());
		ContentSecurityPolicyConfigurer.init(app);
		app.use(cors());
		app.use(logger('dev'));
		app.use(express.json());
		app.use(express.urlencoded({ 'extended' : true }));
		app.use(cookieParser());
		SessionConfig.init(app);
		CartConfig.init(app);

		app.use(express.static(ConfigFilePaths.staticDir));

		SecurityConfig.init(app);
		InternalRoute.init(app);
		
		AppRouter(app);
		GlobalErrorHandler.init(app);

		app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));

	}
}