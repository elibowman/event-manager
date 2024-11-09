import { EventsNotAvailableError } from '../error/events-not-available-error';
import { logger } from './console-logger';
import ensureError from './ensure-error';

export type Eventt = {
    id: number,
    color: string | null,
    isActive: true | false | null,
    name: string | null,
    date: string | null,
    time: string | null,
    company: string | null,
    email: string | null,
    phone: string | null,
    address: string | null,
    description: string | null,
    image: string | null,
    createdOn: string | null
}

export default async function getEventts(): Promise<Eventt[] | null> {
    // let events: Event[];

    try {
        logger.log(`getEvents(): Starting fetch to ${import.meta.env.VITE_EVENTS}`);
        const response = await fetch("" + import.meta.env.VITE_EVENTS);
        logger.log(`getEvents(): Ending fetch to ${import.meta.env.VITE_EVENTS}`);

        if (!response?.ok) {
            throw new EventsNotAvailableError();
        }
        else {
            const responseJson = await response.json()
            logger.log(responseJson);
            if (responseJson as Eventt[])
                return responseJson;
        }
        return null;
    }
    catch (err: any) {
        const error = ensureError(err);

        logger.error(error.message, error);
        throw new Error('Failed', err)
        return null;
    }
}
