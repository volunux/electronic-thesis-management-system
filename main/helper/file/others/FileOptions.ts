import Multer from 'multer';
import fs from 'fs';
import path from 'path';

let { v4: uuidv4 } = require('uuid');


export class FileOptions {

	public static getFileExtension(fileName : string) : string {
			
		let ext : string = path.extname(fileName);
		
		return ext;
	}

	public static generateUUIDFileName(fileName : string) : string {

		let ext : string =  path.extname(fileName);

		fileName = uuidv4() + ext;
		
		return fileName;
	}

	public static generateUUID() : string {

		return uuidv4();
	}

	public static createSimpleFileName(file : any) : string {

		let ext : string =  path.extname(file.originalname);
	
		let possibleCombinations : string = 'abcdefghijklmnopqrstuvwxyz0123456789';
	
		let imgUrl : string = '';
	
		let fileName : string = '';

		for (var i = 0 ; i < 6 ; i += 1) { 

			imgUrl += possibleCombinations.charAt(Math.floor(Math.random() * possibleCombinations.length));	}

			fileName = imgUrl + ext;

			return fileName; 
	}

	public static generateUniqueFileName(fileName : string) : string {
  
	  let ext : string = path.extname(fileName)
	  
	  let date : number = Date.now();

	  let randomHash : string = '';
	  
	  let characters : string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	  
	  new Array(20)

	  	.fill(null)

	  	.map(_ => {
	    
	    randomHash += characters.charAt(Math.floor(Math.random() * characters.length)); })

	  	return randomHash + '-' + date + ext;
	}

}