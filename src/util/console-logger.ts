import { LOG_LEVEL } from "../env";

export interface LogFn {
    (message?: any, ...optionalParams: any[]): void;
}

export interface Logger {
    trace: LogFn;
    debug: LogFn;
    log: LogFn;
    warn: LogFn;
    error: LogFn;
}

export type LogLevel = 'trace' | 'debug' | 'log' | 'warn' | 'error';

const NO_OP: LogFn = (message?: any, ...optionalParams: any[]) => {};

export class ConsoleLogger implements Logger {
    readonly trace: LogFn;
    readonly debug: LogFn;
    readonly log: LogFn;
    readonly warn: LogFn;
    readonly error: LogFn;

    constructor(options?: { level? : LogLevel }) {
        const { level } = options || {};

        this.error = console.error.bind(console);

        if (level === 'error') {
            this.warn = NO_OP;
            this.log = NO_OP;
            this.debug = NO_OP;
            this.trace = NO_OP;

            return;
        }

        this.warn = console.warn.bind(console);

        if (level === 'warn') {
            this.log = NO_OP;
            this.debug = NO_OP;
            this.trace = NO_OP;

            return;
        }

        this.log = console.log.bind(console);

        if (level === 'log') {
            this.debug = NO_OP;
            this.trace = NO_OP;

            return;
        }

        this.debug = console.debug.bind(console);

        if (level === 'debug') {
            this.trace = NO_OP;

            return;
        }

        this.trace = console.trace.bind(console);
    }
}

export const logger = new ConsoleLogger({ level: LOG_LEVEL });