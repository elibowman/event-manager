import { logger } from "./console-logger";
import { CreateEventtType } from "./create-event";


export default function prepareCreateEventInput(modalRef: React.RefObject<HTMLDialogElement> | undefined) {
    
    const name = (modalRef?.current?.querySelector('#name') as HTMLInputElement).value;
    logger.debug(modalRef?.current?.querySelector('#name'));

    const description = (modalRef?.current?.querySelector('#description') as HTMLTextAreaElement).value;
    const company = (modalRef?.current?.querySelector('#company') as HTMLInputElement).value;
    const color = (modalRef?.current?.querySelector('#color') as HTMLInputElement).value;

    const eventt: CreateEventtType = {
        name,
        description,
        company,
        color
    };

    return eventt;
}