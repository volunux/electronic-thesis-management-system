import express, { Express , Request , Response , NextFunction } from 'express';
import { AppConfig } from './main/config/AppConfig';

const app : Express = express();

AppConfig.init(app);