import aws from 'aws-sdk';

export interface FileConfigurer {

	getS3Instance() : aws.S3;

	getConfiguration() : aws.ConfigurationOptions;

}