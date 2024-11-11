import { CustomError } from "./custom-error";

type Jsonable = string | number | boolean | null | undefined | readonly Jsonable[] | { readonly [key: string]: Jsonable } | { toJSON(): Jsonable };


export class InvalidResponseError extends CustomError {
    public readonly context?: Jsonable    

    constructor(options: { cause?: Error, context?: Jsonable } = {} ) {
        const message = 'Invalid response';
        const { cause, context } = options;
        
        super(message, (cause == null ? undefined : { cause }) );
        Object.setPrototypeOf(this, InvalidResponseError.prototype);
        this.name = this.constructor.name;

        this.context = context;
    }
}