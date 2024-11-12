import { EventtsNotAvailableError } from '../error/eventts-not-available-error';
import { InvalidResponseError } from '../error/invalid-response-error';
import { logger } from './console-logger';
import ensureError from './ensure-error';

export type GetEventtType = {
    id: number,
    color?: string | null,
    isActive?: true | false | null,
    name?: string | null,
    date?: string | null,
    time?: string | null,
    company?: string | null,
    email?: string | null,
    phone?: string | null,
    address?: string | null,
    description?: string | null,
    image?: string | null,
    createdOn?: string | null
}

export default async function getEventts(): Promise<GetEventtType[] | null> {

    try {
        logger.log(`${Date().toLocaleString()} getEvents(): STARTING fetch to ${import.meta.env.VITE_EVENTS}`);
        const response = await fetch("" + import.meta.env.VITE_EVENTS);
        logger.log(`${Date().toLocaleString()} getEvents(): ENDING fetch to ${import.meta.env.VITE_EVENTS}`);

        if (!response?.ok) {
            throw new EventtsNotAvailableError();
        }
        const responseJson = await response.json()
        logger.debug(`getEventts(): responseJson:`, responseJson);

        if(
            !(Array.isArray(responseJson) && (responseJson as []).map((eventt: GetEventtType, _i) => ('id' in eventt) && typeof eventt.id === 'number'))
        ) {
            throw new InvalidResponseError();
        }

        return responseJson;        
    }
    catch (err: any) {
        const error = ensureError(err);

        logger.error(error.message, error);
        throw new Error('Error: failed to get events', err)
    }
}
