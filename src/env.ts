import { LogLevel } from "./util/console-logger";

export type Environment = 'trace' | 'debug' | 'development' | 'production' ;

export const APP_ENV: Environment = import.meta.env.VITE_APP_ENV === 'production' ? 'production' : import.meta.env.VITE_APP_ENV ===  'development' ? 'development' : import.meta.env.VITE_APP_ENV === 'debug' ? 'debug' : 'trace';

// export const LOG_LEVEL: LogLevel = APP_ENV === 'production' ? 'warn' : 'log';

export const LOG_LEVEL: LogLevel = APP_ENV === 'production' ? 'warn' : APP_ENV === 'development' ? 'log' : APP_ENV === 'debug' ? 'debug' : 'trace';