import path from 'path';

export class ConfigFilePaths {

	static partialsDir : string = path.join(__dirname , '../../../src/main' , 'view' , 'partials');

	static layoutsDir : string = path.join(__dirname , '../../../src/main' , 'view' , 'layouts/');

	static viewsDir : string = path.join(__dirname , '../../../src/main' , 'view');

	static envDir : string = path.join(__dirname , '../../../src/' , '.env');

	static staticDir : string = path.join(__dirname , '../../../src/main' , 'resource');

}