import { logger } from "./console-logger";
import { CreateEventtType } from "./create-event";


export default function prepareEditEventInput(node: HTMLElement | undefined) {
    

    logger.log(`${Date().toLocaleString()} prepareEditEventInput(): STARTING`);
    const id = node?.getAttribute('data-key') as string;
    logger.debug("prepareEditEventInput(): id:", id);

    const name = (node?.querySelector('#name') as HTMLInputElement).value;
    const description = (node?.querySelector('#description') as HTMLTextAreaElement).value;
    const company = (node?.querySelector('#company') as HTMLInputElement).value;
    const color = (node?.querySelector('#color') as HTMLInputElement).value;

    const eventt: CreateEventtType = {
        name,
        description,
        company,
        color
    };

    logger.log(`${Date().toLocaleString()} prepareEditEventInput(): ENDING`);

    return {id, eventt};
}