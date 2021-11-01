import { Client , Pool , PoolClient , types } from 'pg';
import { ConnectionSettings } from './ConnectionSettings';
import { ConnectionSettingsConfig } from './ConnectionSettingsConfig';

export class DBConnection {

   private static settings : ConnectionSettingsConfig = ConnectionSettings.connection();

  static connect() : void {

    const pool : Pool = DBConnection.getPool();

    pool.connect()

    .then((client : PoolClient) => {

        console.log('Connected to DB');
    })

    .catch((error : { [key : string] : any }) => {

      console.log(error);

        console.log('An Error has occured');
    });

  }

  static getClient() : Client {

     let client : Client = new Client({

        'user' : DBConnection.settings.getUsername() ,

        'host' : DBConnection.settings.getHost() ,

        'database' : DBConnection.settings.getDatabase() ,

        'connectionString' : DBConnection.settings.getDatabase() ,

        'port' : DBConnection.settings.getPort()
    });

     return client;
  }

  static getPool() : Pool {

    const pool = new Pool({

        'user' : DBConnection.settings.getUsername() ,

        'host' : DBConnection.settings.getHost() ,

        'database' : DBConnection.settings.getDatabase() ,

        'password' : DBConnection.settings.getPassword() ,

        'port' : DBConnection.settings.getPort() ,

        'max' : DBConnection.settings.getMax() ,

        'idleTimeoutMillis' : DBConnection.settings.getIdleTimeoutMillis()
    });

    types.setTypeParser(types.builtins.TIME , (timeStr) => timeStr);
    types.setTypeParser(types.builtins.TIMESTAMP , (timeStr) => timeStr);
    types.setTypeParser(types.builtins.TIMESTAMPTZ , (timeStr) => timeStr);


    return pool;
  }
}