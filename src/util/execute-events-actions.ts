import { EventtsNotAvailableError } from '../error/eventts-not-available-error';
import { logger } from './console-logger';
import createEventt, { CreateEventtType } from './create-event';
import deleteEventt from './delete-event';
import editEventt, { editEventtType } from './edit-event';
import ensureError from './ensure-error';

export type GetEventtType = {
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

const actions = {
    CREATE_EVENTT: "CREATE_EVENTT",
    EDIT_EVENTT: "EDIT_EVENTT" ,
    DELETE_EVENTT:  "DELETE_EVENTT"
} as const;



export default async function executeEventtsActions({ params, request }: {params: unknown, request: Request}): Promise<any> {
    
    try {

        logger.debug('executeEventtsActions(): params:', await params);
        logger.debug('executeEventtsActions(): request:', request);
        
        const requestJson = await request.json();
        logger.debug('executeEventtsActions(): request.json:', requestJson);

        if (requestJson.action as string == actions.CREATE_EVENTT) {
            return await createEventt(requestJson.eventt as CreateEventtType);
        }
        if (requestJson.action as string == actions.EDIT_EVENTT) {
            return await editEventt(requestJson.id as number, requestJson.eventt as editEventtType)
        }
        if (requestJson.action as string == actions.DELETE_EVENTT) {
            return await deleteEventt(requestJson.id as number);
        }
        return null;
    }
    catch (err: any) {
        const error = ensureError(err);

        logger.error(error.message, error);
        throw new Error('Failed to get events', err);
    }
}
