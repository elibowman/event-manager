import { EventtCreationError } from "../error/event-creation-error";
import { logger } from "./console-logger";
import ensureError from "./ensure-error";

export type EditEventtType = {
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

const editEventt = async (id: number, eventt: EditEventtType): Promise<any> => {
    try {
        logger.log(`${Date().toLocaleString()} editEventt(): STARTING: edit event PUT`);
        const response = await fetch(`${import.meta.env.VITE_EVENTS}/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventt)
        });
        logger.log(`${Date().toLocaleString()} editEventt(): ENDING: edit event PUT`);

        if (!response?.ok) {
            throw new EventtCreationError();
        }

        const responseJson = await response.json();
        logger.debug(`editEventt(): responseJson:`, responseJson);
        
        return responseJson;
    }
    catch (err: any) {
        const error = ensureError(err);

        logger.error(error.message, error);
        throw new Error('Failed to edit event', err);
    }
}

export default editEventt;