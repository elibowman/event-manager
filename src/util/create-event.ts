import { EventtCreationError } from "../error/event-creation-error";
import { logger } from "./console-logger";
import ensureError from "./ensure-error";

export type CreateEventtType = {
    color?: string | null ,
    isActive?: true | false | null,
    name?: string | null ,
    date?: string | null ,
    time?: string  | null,
    company?: string | null ,
    email?: string | null ,
    phone?: string | null ,
    address?: string | null ,
    description?: string | null ,
    image?: string | null ,
    createdOn?: string | null 
}

const createEventt = async (eventt: CreateEventtType) => {
    try {
        logger.log(`createEventt(): STARTING: Create event POST`);
        const response = await fetch("" + import.meta.env.VITE_EVENTS, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventt)
        });
        logger.log(`createEventt(): ENDING: Create event POST`);

        if (!response?.ok) {
            throw new EventtCreationError();
        }
        
        const responseJson = await response.json();
        logger.debug(`createEventt(): responseJson:`, responseJson);

        return responseJson;
    }
    catch (err: any) {
        const error = ensureError(err);

        logger.error(error.message, error);
        throw new Error('Error: failed to create event', err);
    }
}

export default createEventt;