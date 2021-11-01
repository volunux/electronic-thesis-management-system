import NodeJS from 'node:process';
import dotenv from 'dotenv';
import { ConfigFilePaths } from '../ConfigFilePaths';

dotenv.config({'path' : ConfigFilePaths.envDir});

export class ConnectionSettingsConfig {

	static getInstance() : ConnectionSettingsConfig {

		return new ConnectionSettingsConfig();
	}

	private username : string;
	private host : string;
	private database : string;
	private password : string;
	private port : number;
	private max : number;
	private idleTimeoutMillis : number;

	constructor() {

		this.username = (<NodeJS.ProcessEnv>process.env)['database.username'] as string;

		this.host = (<NodeJS.ProcessEnv>process.env)['database.host'] as string;

		this.database = (<NodeJS.ProcessEnv>process.env)['database.name'] as string;

		this.password = (<NodeJS.ProcessEnv>process.env)['database.password'] as string;

		this.port = +((<NodeJS.ProcessEnv>process.env)['database.port'] as string);

		this.max = +((<NodeJS.ProcessEnv>process.env)['database.maxNumberClient'] as string) ,

		this.idleTimeoutMillis = +((<NodeJS.ProcessEnv>process.env)['database.idleTimeoutMillis'] as string)

	}

	public getUsername() : string {

		return this.username;
	}

	public getHost() : string {

		return this.host;
	}

	public getDatabase() : string {

		return this.database;
	}

	public getPassword() : string {

		return this.password;
	}

	public getPort() : number {

		return this.port;
	}

	public getMax() : number {

		return this.max;
	}

	public getIdleTimeoutMillis() : number {

		return this.idleTimeoutMillis;
	}
}