var multer = require('multer') , imageMagic = require('./photomagic.js') , $filename = require('./filename') , key = '' , params = '' , Upload = require('../../app_api/models/upload');

errors = require('./errors/upload') , postPhotos = require('./buckets/s3/post-photos') , postS3 = require('./buckets/s3/postS3') , bitmap = '' , aws = require('aws-sdk') , param1 = '' ,

multerS3 = require('multer-s3') , s3Conf = postPhotos();

aws.config.update(postS3);

var s3 = new aws.S3();

module.exports = {

	'delete' : (req , res , next) => {

	  var imgPath = req.body.Key.split('/') , key = imgPath.pop();
	
					param1 = {'Bucket' : process.env.posts_bucket , 'Delete' : {
																																				'Objects' : [
																																												{'Key' : key }	] ,
																																																								'Quiet' : false } };
						s3.deleteObjects(param1 , (err, data) => {

							if (err) {
													console.log(err) }

							if (data) {
														Upload.deleteOne({'Key' : key})
																													.exec((err , result) => {					
																					if (err) {
																												console.log(err);		}

																												console.log(result);		});

																												console.log(data);		}		});
																return next();
	} ,

	'deleteMultiple' : (req , res , next) => {

	  var multipleKeys = req.body;
	
					param1 = {'Bucket' : process.env.posts_bucket , 'Delete' : {
																																				'Objects' : multipleKeys.Keys ,
																																																						'Quiet' : false } };
																s3.deleteObjects(param1 , (err, data) => {
																																						if (err) console.log(err)

							if (data) {

												req.body.Keys.forEach((item) => {

														Upload.deleteOne({'Key' : item.Key})
																																			.exec((err , result) => {					
																					if (err) {
																												console.log(err);		}

																												console.log(result);		}) });

																												console.log(data);		}	



																																						   });
																return next();
	} 

}