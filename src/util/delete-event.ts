import { EventtDeletionError } from "../error/event-deletion-error";
import { logger } from "./console-logger";
import ensureError from "./ensure-error";

const deleteEventt = async (id: number) => {
    try {
        logger.log(`${Date().toLocaleString()} deleteEventt(): Starting delete event fetch ${import.meta.env.VITE_EVENTS}`);
        const response = await fetch(`${import.meta.env.VITE_EVENTS}/${id}`, {
            method: 'DELETE'
        });
        logger.log(`${Date().toLocaleString()} deleteEventt(): Ending delete event fetch ${import.meta.env.VITE_EVENTS}`);

        if (!response?.ok) {
            throw new EventtDeletionError;
        }
        
        const responseJson = await response.json();
        logger.debug(`deleteEventt(): responseJson:`, responseJson);
        
        return responseJson;
    }
    catch (err: any) {
        const error = ensureError(err);

        logger.error(error.message, error);
        throw new Error('Failed to delete event', err)
    }
}

export default deleteEventt;