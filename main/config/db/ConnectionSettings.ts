import { ConnectionSettingsConfig } from './ConnectionSettingsConfig';

export class ConnectionSettings {

	static connection() : ConnectionSettingsConfig {

		return ConnectionSettingsConfig.getInstance();
	}

}