
export class CustomError extends Error {

    constructor(message: string, options: { cause?: Error } = {} ) {
        const { cause } = options;
        
        super(message, cause == null ? undefined : { cause } );
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}