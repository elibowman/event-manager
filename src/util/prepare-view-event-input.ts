import { logger } from "./console-logger";
import { CreateEventtType } from "./create-event";


export default function prepareViewEventInput(node: HTMLElement | undefined) {
    

    logger.log(`${Date().toLocaleString()} prepareViewEventInput(): STARTING`);
    const id = node?.getAttribute('data-key') as string;
    logger.debug("prepareViewEventInput(): id:", id);

    const name = (node?.querySelector('#name') as HTMLSpanElement).innerHTML;
    const description = (node?.querySelector('#description') as HTMLSpanElement).innerHTML;
    // const company = (node?.querySelector('#company') as HTMLInputElement).value;
    // const color = (node?.querySelector('#color') as HTMLInputElement).value;

    const eventt: CreateEventtType = {
        name,
        description,
        // company,
        // color
    };

    logger.log(`${Date().toLocaleString()} prepareViewEventInput(): ENDING`);

    return {id, eventt};
}