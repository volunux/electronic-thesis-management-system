import redis , { RedisClient } from 'redis';
import axios from 'axios';
import { Request , Response , NextFunction } from 'express';

export class RedisMemDbConfig {

	public static getConnection() : RedisClient {

	let port : string = process.env['REDIS_PORT'] as string;

	const client : RedisClient = redis.createClient({

	'port' :  +port ,

	'host' : process.env['REDIS_HOST'] as string ,

	'password' : process.env['REDIS_PASSWORD'] as string

	});

	RedisMemDbConfig.getConnection().auth(process.env['REDIS_AUTH'] as string , (err : Error | null , response : string) => {

		if (err) throw new Error('An Error has Occured'); });

	RedisMemDbConfig.getConnection().on('error' , (err : any) => {

		throw new Error('An Error has occured'); });

	return client;

	}

	public static confirmDataExists(req : Request , res : Response , next : NextFunction) : void {

		let entry : string = req.params.entyr;

			RedisMemDbConfig.getConnection().get(entry , (err : Error | null , reply : string | null) => {

				return res.status(200).send({'data' : reply});


			})

	}

	public static setData(req : Request , res : Response , next : NextFunction) : void {

		let entry : string = req.params.entyr;

			RedisMemDbConfig.getConnection().set(entry , 'Hello World');

	}

	public static async externalService(req : Request , res : Response , next : NextFunction) : Promise<any> {

	   const entry : string = req.params.entry;

		try { const entries = await axios.get(`http://www.resultpuppy.com/api/?q=${entry}`); 
    
    return res.status(200).send({
     
     'error' : false ,

     'data' : entries.data.results }); } 

    catch (error : any) {
    
     console.log(error); }


	}

	public static async testExternalService(req : Request , res : Response , next : NextFunction) : Promise<any> {

   const entry : string = req.params.entry;

		try {

 
   // Check the redis store for the data first
   RedisMemDbConfig.getConnection().get(entry, async (err : Error | null , result : string | null) => {

     if (result) {
       	
       	return res.status(200).send({
         
         'error': false,
         
         'message': `Recipe for ${entry} from the cache`,
         
         'data' : JSON.parse(result) });

     } else { // When the data is not found in the cache then we can make request to the server
 
         const result = await axios.get(`http://www.resultpuppy.com/api/?q=${entry}`);
 
         // save the record in the cache for subsequent request
         RedisMemDbConfig.getConnection().setex(entry, 1440, JSON.stringify(result.data.results));
 
         // return the result to the client
         return res.status(200).send({
           'error' : false,
           
           'message' : `Recipe for ${entry} from the server`,
           
           'data' : result.data.results }); } }); } 

   catch (err : any) {
   
     console.log(err); }

	}
}