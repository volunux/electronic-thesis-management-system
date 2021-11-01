import Https from 'https';
import Querystring from 'querystring';
import Request from 'request';

export class ElksSender {

	private static username : string = (<NodeJS.ProcessEnv>process.env)['ELKS_USERNAME'] as string;

	private static password : string = (<NodeJS.ProcessEnv>process.env)['ELKS_PASSWORD'] as string;

	public static async sendSMS(from : string , to : string , text : string) : Promise<void> {

		const key : string = Buffer.from(ElksSender.username + ':' + ElksSender.password).toString('base64');

		const message = {

			'from' : from ,

			'to' : to ,

			'message' : text
		};

		const postData = Querystring.stringify(message);

		const options : Https.RequestOptions = {

			'hostname' : 'api.46elks.com' ,

			'path' : '/a1/SMS' ,

			'method' : 'POST' ,

			'headers' : {

				'Authorization' : 'Basic ' + key
			}
		};

		let request = Https.request(options , (response : any) => {

			let str = "";

			response.on('data' , (chunk : any) => {

				str += chunk; });

			response.on('end' , () => {

				console.log(str); });

		});

		request.write(postData);

	}

	public static async sendSMSII(from : string , to : string , text : string) : Promise<void> {

		try {

		let response : Request.Request = await Request.post('https://api.46elks.com/a1/SMS' , {

				'auth' : {

					'user' : ElksSender.username ,

					'pass' : ElksSender.password } ,

				'form' : {

					'from' : from ,

					'to' : to ,

					'message' : text } }); 

		console.log(response); 

	}

		catch (err : any) {


		}
	}

	public static async sendSMSIICallback(from : string , to : string , text : string) : Promise<void> {

		let response : Request.Request = await Request.post('https://api.46elks.com/a1/SMS' , {

				'auth' : {

					'user' : ElksSender.username ,

					'pass' : ElksSender.password } ,

				'form' : {

					'from' : from ,

					'to' : to ,

					'message' : text } } , (err : any , response : Request.Response , body : Request.Response) => {

						if (err) console.log(err);

						if (response) console.log(response); }); 

	
	}

}