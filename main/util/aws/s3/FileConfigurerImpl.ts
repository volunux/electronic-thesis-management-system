import aws from 'aws-sdk';
import dotenv from 'dotenv';
import { ConfigFilePaths } from '../../../config/ConfigFilePaths';
import { FileConfigurer } from './FileConfigurer';

dotenv.config({'path' : ConfigFilePaths.envDir});

export class FileConfigurerImpl implements FileConfigurer {

	constructor() {

	}

	public static getInstance() : FileConfigurerImpl {

		return new FileConfigurerImpl();
	}

	public getS3Instance() : aws.S3 {

		let configurations : aws.S3.ClientConfiguration = {

			'secretAccessKey' : (<NodeJS.ProcessEnv>process.env)['aremiuser_secretkey'] ,
			'accessKeyId' : (<NodeJS.ProcessEnv>process.env)['aremiuser_accesskey'] ,
			'region' : (<NodeJS.ProcessEnv>process.env)['aremi_region'] ,
			'maxRetries' : 4 ,
			'httpOptions' : {
				'timeout' : 86400000 ,
				'connectTimeout' : 12000 }
		};

		return new aws.S3(configurations);

	}

	public getConfiguration() : aws.ConfigurationOptions {

		let configurations : aws.ConfigurationOptions = {
		
		'secretAccessKey': (<NodeJS.ProcessEnv>process.env)['aremiuser_secretkey'] ,
		'accessKeyId': (<NodeJS.ProcessEnv>process.env)['aremiuser_accesskey'] ,
		'region' : (<NodeJS.ProcessEnv>process.env)['aremi_region'] ,
		'correctClockSkew' : true ,
		'maxRetries' : 4 ,
		'httpOptions' : {
			'timeout' : 86400000 ,
			'connectTimeout' : 12000 } 
		};

		return configurations;

	}

}