import { CustomError } from "./custom-error";

type Jsonable = string | number | boolean | null | undefined | readonly Jsonable[] | { readonly [key: string]: Jsonable } | { toJSON(): Jsonable };


export class EventtDeletionError extends CustomError {
    public readonly context?: Jsonable    

    constructor(options: { cause?: Error, context?: Jsonable } = {} ) {
        const message = 'Unable to delete event';
        const { cause, context } = options;
        
        super(message, (cause == null ? undefined : { cause }) );
        Object.setPrototypeOf(this, EventtDeletionError.prototype);
        this.name = this.constructor.name;

        this.context = context;
    }
}