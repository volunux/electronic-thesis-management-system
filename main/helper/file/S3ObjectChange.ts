import { FileConfigurerImpl } from '../../util/aws/s3/FileConfigurerImpl';
import aws from 'aws-sdk';

aws.config.update(FileConfigurerImpl.getInstance().getConfiguration());

const s3 : aws.S3 = new aws.S3();

export class S3ObjectChange {

	public static objectDeleteByLocation(objPath : string , bucketName : string) : void {

		let pathKey : string[] = objPath.split('/');

		let key : string = pathKey.pop() as string;

		let params : aws.S3.DeleteObjectRequest = {'Bucket' : (<NodeJS.ProcessEnv>process.env)[bucketName] as string , 'Key' : key };

		s3.deleteObject(params , (err : aws.AWSError , deleted : aws.S3.DeleteObjectOutput) => {

			if (err) { console.log(err); }

			else { console.log("Entry or Entries deleted successfully");	}	}); 
	} 

	public static deleteMany(documents : Express.MulterS3.File[] , bucketName : string) : void { 

		let itemKeys : any[] = [];

		documents.forEach((item : Express.MulterS3.File) => {

		itemKeys.push({'Key' : item.key.split('\\').pop() });	});

		let params : aws.S3.DeleteObjectsRequest = {'Bucket' : (<NodeJS.ProcessEnv>process.env)[bucketName] as string , 'Delete' : {'Objects' : itemKeys } };

		s3.deleteObjects(params , (err : aws.AWSError , deleted : aws.S3.DeleteObjectOutput) => {

			if (err) { console.log(err); }

			else { console.log("Entry or Entries deleted successfully"); } }); 
	}

	public static async objectDeleteByKey(key : string , bucketName : string) : Promise<aws.Request<aws.S3.DeleteObjectOutput , aws.AWSError>> {

		let params : aws.S3.DeleteObjectRequest = {'Bucket' : (<NodeJS.ProcessEnv>process.env)[bucketName] as string , 'Key' : key };

		return s3.deleteObject(params); 
		
	}

}