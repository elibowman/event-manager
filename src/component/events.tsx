import { useLoaderData, useSubmit } from "react-router-dom";
import { logger } from "../util/console-logger";
import { GetEventtType } from "../util/get-events";
import Modal, { ModalActions } from "./modal";
import { useRef, useState } from "react";
import  { CreateEventtType } from "../util/create-event";
import prepareCreateEventInput from "../util/prepare-create-event-input";
import prepareEditEventInput from "../util/prepare-edit-event-input";
import prepareViewEventInput from "../util/prepare-view-event-input";

const months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]
const actions = {
    CREATE_EVENTT: "CREATE_EVENTT" ,
    EDIT_EVENTT: "EDIT_EVENTT" ,
    DELETE_EVENTT:  "DELETE_EVENTT"
} as const;

const Eventts = () => {
    const events: GetEventtType[] | null = useLoaderData() as GetEventtType[] | null;
    const newEventImparativeModalRef = useRef<ModalActions>(null);
    const viewEventImparativeModalRef = useRef<ModalActions>(null);
    // const createEventSubmit = useRef<HTMLButtonElement>(null);
    // const cancelCreateEventSubmit = useRef<HTMLButtonElement>(null);
    const [ rowToEdit, setRowToEdit ] = useState<number | null>(null);
    const [ rowToDelete, setRowToDelete ] = useState<number | null>(null);
    const submit = useSubmit();

    logger.debug("Events(): rowToDelete:", rowToDelete);

    if (events == null) {
        return <></>;
    }
    
    const openNewEventtModal = (e: Event) => {
        newEventImparativeModalRef.current?.openModal();
    }

    const closeNewEventtModal = (e: React.MouseEvent<HTMLDivElement>) => {
        newEventImparativeModalRef.current?.closeModal();
    }

    const createEventtListener = () => {        
        return(
            (e: React.MouseEvent<HTMLButtonElement>) => {
                logger.debug("createEventListener(): clicked", e, "modalRef", newEventImparativeModalRef)
                
                const modalRef = newEventImparativeModalRef.current?.ref;
                const eventt: CreateEventtType = prepareCreateEventInput(modalRef);

                logger.debug(eventt);
                // createEventt(eventt);
                submit({action: actions.CREATE_EVENTT, eventt}, {method: 'post', encType: 'application/json'});

                newEventImparativeModalRef.current?.closeModal();
            }
        );
    }

    const editEventtListener = () => {        
        return(
            (e: React.MouseEvent<HTMLButtonElement>) => {
                const currentTarget = e.currentTarget;
                logger.debug("editEventtListener(): e.currentTarget:", currentTarget);
                logger.debug("editEventtListener(): e:", e);

                const row: HTMLTableRowElement = (((currentTarget as HTMLButtonElement).parentNode as HTMLDivElement).parentElement as HTMLTableCellElement).parentElement as HTMLTableRowElement;
                logger.debug('editEventtListener: row:', row)

                const id: number = parseInt(row.getAttribute('data-key') as string);
                logger.debug('editEventtListener: id:', row.getAttribute('data-key'));
                logger.debug('editEventtListener: id:', id);

                setRowToDelete(null);
                setRowToEdit(id);
                logger.debug('editEventtListener: rowToEdit:', rowToEdit);
            }
        );
    }
    const cancelEditEventtListener = () => {        
        return(
            (e: React.MouseEvent<HTMLButtonElement>) => {
                setRowToEdit(null);
                logger.debug('editEventListener: rowToEdit:', rowToEdit);
            }
        );
    }



    const submitEditEventtListener = () => {        
        return(
            (e: React.MouseEvent<HTMLButtonElement>) => {
                logger.debug("submitEditEventListener(): e", e);

                const row: HTMLTableRowElement = (((e.target as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLTableCellElement).parentNode as HTMLTableRowElement;
                logger.debug("submitEditEventListener(): row", row)
                
                const { id, eventt } = prepareEditEventInput(row);
                logger.debug({ id, eventt });

                setRowToEdit(null);
                
                submit({action: actions.EDIT_EVENTT, id, eventt}, {method: 'put', encType: 'application/json'});
                newEventImparativeModalRef.current?.closeModal();
            }
        );
    }

    const cancelCreateEventtListener = (e: React.MouseEvent<HTMLButtonElement>) => {
        newEventImparativeModalRef.current?.closeModal();
    }

    const deleteBtnEventtListener = (e: React.MouseEvent<HTMLButtonElement>) => {
        const currentTarget = e.currentTarget;
        const row = ((((currentTarget as HTMLButtonElement)).parentNode as HTMLDivElement).parentNode as HTMLTableCellElement).parentNode as HTMLTableRowElement;
        const id = row.getAttribute('data-key') as string
        logger.debug("deleteBtnEventtListener(): row", row);
        logger.debug("deleteBtnEventtListener(): id", id);
        
        setRowToDelete(parseInt(id));
    }

    const confirmDeleteEventtListener = () => {        
        return(
            (e: React.MouseEvent<HTMLButtonElement>) => {
                logger.debug("confirmDeleteEventListener(): e", e);

                const id = ((((((e.target as HTMLButtonElement).parentNode) as HTMLDivElement).parentNode as HTMLDivElement).parentNode as HTMLTableCellElement).parentNode as HTMLTableRowElement).getAttribute('data-key') as string;

                logger.debug("confirmDeleteEventListener(): id", id);                

                submit({action: actions.DELETE_EVENTT, id}, {method: 'delete', encType: 'application/json'});
                newEventImparativeModalRef.current?.closeModal();

                setRowToDelete(null);
            }
        );
    }

    const cancelDeleteEventtListener = (e: React.MouseEvent<HTMLButtonElement>) => {
        setRowToDelete(null);
    }

    const getDefaultValueAttribute = (value: unknown) => {
        return value !== null && value !== undefined ? {defaultValue:  "" + value} : {}
    }

    const getDefaultValueAttributeForArray = (array: string[] | undefined, index: number) => {
        return (array !== null && Array.isArray(array) && array?.length >= 3) ? {defaultValue:  array[index]} : {}
    }

    const getMonthFromDateArray = (array: string[] | undefined) => {
        logger.debug("getMonthFromDateArray(): array:", array);
        const month = (array !== null && Array.isArray(array) && array?.length >= 3) ? months[parseInt(array[1])] : null; 
        logger.debug("getMonthFromDateArray(): month:", month);

        return month;
    }

    const viewEventBtnListener = (e: React.MouseEvent<HTMLButtonElement>) => {
        const currentTarget = e.currentTarget;
        logger.debug("createEventListener(): e.currentTarget:", e);
        
        const modalRef = viewEventImparativeModalRef.current?.ref;

        const modalNameDiv = modalRef?.current?.querySelector('#name') as HTMLDivElement;
        const modalDescriptionDiv = modalRef?.current?.querySelector('#description') as HTMLDivElement;

        const row: HTMLTableRowElement = (((currentTarget as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLTableCellElement).parentNode as HTMLTableRowElement;
        console.debug("createEventListener(): row:", row);
        
        const { id, eventt } = prepareViewEventInput(row);
        logger.debug({ id, eventt });

        const name = eventt.name;
        const description = eventt.description

        modalNameDiv.innerHTML = name + "";
        modalDescriptionDiv.innerHTML = description + "";

        viewEventImparativeModalRef.current?.openModal();
    }

    const closeViewEventtModal = (e: React.MouseEvent<HTMLDivElement>) => {
        viewEventImparativeModalRef.current?.closeModal();
    }

    return (<>
        <section className="mb-[10rem] [&_[type=text]]:bg-card [&_textarea]:bg-card text-text">
            <Modal ref={newEventImparativeModalRef}>
                
                <div className="absolute right-[0.25rem] top-[0.25rem] hover:cursor-pointer //bg-light-card //text-text" onClick={closeNewEventtModal}>
                    <svg className="w-[1.25rem] fill-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </div>
                <div className="bg-card //text-text px-[1rem] pt-[1.5rem] pb-[1rem] rounded-[0.5rem] w-[18rem]">
                    <div className={`flex flex-col gap-[1rem] [&>div]:flex [&>div:not(:last-child)]:flex-col [&>div>[type=text]]:border-[0.0625rem] [&>div>[type=text]]:border-border focus:[&_[type=text]]:outline-none focus:[&_[type=text]]:shadow-[0rem_0rem_0.25rem_theme(colors.focus-outline)] [&_textarea]:border-[0.0625rem] [&_textarea]:border-border [&_textarea]:max-h-[3rem] [&_textarea]:min-h-[3rem] focus:[&_textarea]:outline-none focus:[&_textarea]:shadow-[0rem_0rem_0.25rem_theme(colors.focus-outline)] [&>div>label]:text-sm`}>
                        <h3 className="text-center">Create event</h3>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name"/>
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea id="description"/>
                        </div>
                        <div>
                            <label htmlFor="company">Company</label>
                            <input type="text" id="company" />
                        </div>
                        <div>
                            <label htmlFor="color">Color</label>
                            <input type="text" id="color" />
                        </div>
                        <div className="flex justify-evenly">
                            <button type="submit" formMethod="dialog" onClick={cancelCreateEventtListener}>cancel</button>
                            <button type="submit" formMethod="dialog" onClick={createEventtListener()}>submit</button>
                        </div>
                    </div>
                </div>
                
            </Modal>
            <Modal ref={viewEventImparativeModalRef}>
                
                <div className="absolute right-[0.25rem] top-[0.25rem] hover:cursor-pointer //bg-light-card //text-text" onClick={closeViewEventtModal}>
                    <svg className="w-[1.25rem] fill-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </div>
                <div className="bg-card //text-text px-[1rem] pt-[1.5rem] pb-[1.875rem] rounded-[0.5rem] w-[18rem]">
                    <div className={`flex flex-col gap-[1rem] [&>div]:flex [&>div]:flex-col [&>div>span]:text-sm`}>
                        <h3 className="text-center">View event</h3>
                        <div>
                            <span>Name</span>
                            <div id="name" className="min-h-[1.5rem]"/>
                        </div>
                        <div>
                            <span>Description</span>
                            <div id="description" className="min-h-[3rem] //max-h-[6rem]"/>
                        </div>
                        {/* <div>
                            <label htmlFor="company">Company</label>
                            <div id="company" />
                        </div>
                        <div>
                            <label htmlFor="color">Color</label>
                            <div id="color" />
                        </div> */}
                    </div>
                </div>
                
            </Modal>

            <div className="min-w-fit">
                <div className="flex justify-center relative mt-[5rem]">
                    <h2 className="text-center text-h3 //pb-[1.5rem] [&]:text-light-text">Events</h2>
                </div>
                <div className="flex justify-end w-[100%] fill-light-icon mb-[0.5rem] ">
                    <span>
                        <svg className="w-[1.5rem] hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" onClick={(_e) => {newEventImparativeModalRef.current?.openModal()}}viewBox="0 -960 960 960" fill="">
                            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                        </svg>
                    </span>
                </div>
                <table className="w-[100%]">
                    <thead>
                        <tr>
                        </tr>
                    </thead>
                    <tbody className="flex flex-col gap-[1rem]">
                        {
                            events.length >= 1 && 
                            (events.sort((eventt1, eventt2) => {
                                if (eventt1.company == null || eventt2.company == null) {
                                    return 0;
                                }
                                if (eventt1.company > eventt2.company) {
                                    return 1;
                                }
                                if (eventt1.company < eventt2.company) {
                                    return -1
                                }
                                return 0;
                            }).map(
                                (eventt: GetEventtType, i: number) => {

                                    if (eventt.id === undefined || eventt.id === null) {
                                        return;
                                    }

                                    const date = eventt.date?.split('-');
                                    logger.debug("events.map(()=>{}): date:", date);

                                    const month = getMonthFromDateArray(date);

                                    return  (                        
                                        <tr key={eventt.id} data-key={eventt.id} className="bg-card //border-[0.0625rem] border-border rounded-[0.5rem] flex flex-row p-[1rem] [&>td:not(:last-child)]:border-r-[0.0625rem] [&>td:not(:last-child)]:border-border [&>td]:py-[1rem] [&>td:not(:first-child)]:pl-[1rem] [&>td:not(:last-child)]:pr-[1rem] [&_.span-p]:min-h-[1.5rem] [&_[type=text]]:border-[0.0625rem] [&_[type=text]]:border-border focus:[&_[type=text]]:outline-none focus:[&_[type=text]]:shadow-[0rem_0rem_0.25rem_theme(colors.focus-outline)] //[&_td:not(:first-child)_[type=text]]:pl-[0.5rem] [&_td:not(:first-child)_[type=text]]:px-[0.5rem] //focus:[&_[type=text]]:outline-border [&_textarea]:border-[0.0625rem] [&_textarea]:border-border //[&_textarea]:max-h-fit focus:[&_textarea]:outline-none focus:[&_textarea]:shadow-[0rem_0rem_0.25rem_theme(colors.focus-outline)]">
                                                <td className="flex flex-col justify-center w-[10%]">
                                                    <div className="flex flex-col items-center">
                                                            {
                                                                eventt.id === rowToEdit
                                                                ?
                                                                    <>
                                                                        <input id="day" type="text" className="text-h4 h-[2.5rem] w-[2ch] text-center" {...getDefaultValueAttributeForArray(date, 2)}/>
                                                                        <input id="month" type="text" className="text-h6 h-[1.75rem] mb-[1rem] w-[3ch] text-center" {...getDefaultValueAttribute(month)}/>
                                                                        <input id="time" type="text" className='w-[5ch] h-[1.5rem] text-center' {...getDefaultValueAttribute(eventt.time)}/>
                                                                    </> 
                                                                :                                                                        
                                                                    <>
                                                                        <span className="text-h4 h-[2.5rem]">{Array.isArray(date) && date[2]}</span>
                                                                        <span className="text-h6 mb-[1rem] h-[1.75rem]">{month}</span>
                                                                        <span className="h-[1.5rem]">{eventt.time}</span>
                                                                    </>
                                                            }
                                                    </div>
                                                </td>
                                                <td className="flex flex-col justify-start w-[60%]">
                                                    <div className="flex flex-col items-start gap-[0.5rem] [&>span]:flex [&>span]:flex-col [&>span>span:not(:last-child)]:text-sm [&>span]:w-[100%]">
                                                        <>
                                                            {   
                                                                eventt.id === rowToEdit
                                                                ? 
                                                                    <>
                                                                        <span>
                                                                            <input id='name' type="text" className="text-h5" {...getDefaultValueAttribute(eventt.name)}/>
                                                                        </span>  
                                                                        <span className="">
                                                                            <span>Address</span>
                                                                            <input id='address' type="text" {...getDefaultValueAttribute(eventt.address)}/>
                                                                        </span>
                                                                        <span>
                                                                            <span>Description</span>
                                                                            <textarea id='description' className="pl-[0.5rem]" {...getDefaultValueAttribute(eventt.description)}/>
                                                                        </span>                                                  
                                                                        <span>
                                                                            <span>Color</span>
                                                                            <input id="color" type="text" {...getDefaultValueAttribute(eventt.color)}/>
                                                                        </span>

                                                                    </>
                                                                :
                                                                <>
                                                                    <span>
                                                                        {/* <span>name</span> */}
                                                                        <span id="name" className="text-h5 min-h-[2.25rem]">{eventt.name}</span>
                                                                    </span>  
                                                                    <span>
                                                                        <span>Address</span>
                                                                        <span className="span-p">{eventt.address}</span>
                                                                    </span>
                                                                    <span>
                                                                        <span>Description</span>
                                                                        <span id="description" className="span-p">{eventt.description}</span>
                                                                    </span>                                                  
                                                                    <span>
                                                                        <span>Color</span>
                                                                        <span className="span-p">{eventt.color}</span>
                                                                    </span>
                                                                </>
                                                            }
                                                        </>
                                                    </div>                                                   
                                                </td>
                                                <td className="flex flex-row justify-between w-[30%] min-w-fit //pr-[0.5rem]">
                                                    <div className="flex flex-col items-start gap-[0.5rem] [&>span]:flex [&>span]:flex-col [&>span>span:not(:last-child)]:text-sm [&>span]:w-[100%] w-[100%]">

                                                        {   
                                                            eventt.id === rowToEdit
                                                            ?
                                                                 <>
                                                                    <span>
                                                                        <span>Company</span>
                                                                        <input id='company' type="text" {...getDefaultValueAttribute(eventt.company)} className="span-p"/>
                                                                    </span>
                                                                    <span>
                                                                        <span>Email</span>
                                                                        <input id="email" type="text" {...getDefaultValueAttribute(eventt.email)} className="span-p"/>
                                                                    </span>
                                                                    <span>
                                                                        <span>Phone</span>
                                                                        <input id="phone" type="text" {...getDefaultValueAttribute(eventt.phone)} className="span-p"/>
                                                                    </span>
                                                                </>
                                                            :
                                                                <>
                                                                    <span>
                                                                        <span>Company</span>
                                                                        <span className="span-p">{eventt.company}</span>
                                                                    </span>
                                                                    <span>
                                                                        <span>Email</span>
                                                                        <span className="span-p">{eventt.email}</span>
                                                                    </span>
                                                                    <span>
                                                                        <span>Phone</span>
                                                                        <span className="span-p">{eventt.phone}</span>
                                                                    </span>
                                                                </>    }
                                                    </div>                                                    
                                                    {
                                                        eventt.id === rowToEdit
                                                        ?
                                                            <div className="pl-[1rem] flex flex-col [&]:justify-center [&]:items-center h-[100%]">
                                                                <button className="//w-[100%] h-fit" onClick={submitEditEventtListener()}>submit</button>
                                                                <button className="//w-[100%] h-fit" onClick={cancelEditEventtListener()}>cancel</button>
                                                            </div>                                                                
                                                        :
                                                            <div className="pl-[1rem] flex flex-col [&]:justify-center [&]:items-center h-[100%]">
                                                                <button className="view-btn //w-[100%] //h-fit h-[1.5rem] //mb-[1.5rem]" onClick={viewEventBtnListener}>
                                                                    {/* view */}
                                                                    <svg className="w-[1.25rem] fill-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" >
                                                                        <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
                                                                    </svg>
                                                                </button>
                                                                <button className="edit-btn //w-[100%] //h-fit h-[1.5rem] //mb-[1.5rem]" onClick={editEventtListener()}>
                                                                    <svg className="w-[1.25rem] fill-icon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" fill="">
                                                                        {/* edit */}
                                                                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                                                                    </svg>
                                                                </button>
                                                                {
                                                                    !(rowToDelete !== null && eventt.id === rowToDelete)
                                                                    ?
                                                                        <button className="//w-[100%] //h-fit h-[1.5rem]" onClick={deleteBtnEventtListener} >
                                                                            {/* delete */}
                                                                            <svg className="w-[1.25rem] fill-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="">
                                                                                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                                                            </svg>
                                                                        </button>
                                                                    :
                                                                        <>
                                                                            <p className="">delete?</p>
                                                                            <div>
                                                                                <button className="//w-[100%] h-fit mr-[0.25rem]" onClick={confirmDeleteEventtListener()} >yes</button>
                                                                                <button className="//w-[100%] h-fit" onClick={cancelDeleteEventtListener}>no</button>
                                                                            </div>
                                                                        </>
                                                                }
                                                            </div>
                                                    }
                                                    
                                                </td>
                                        </tr>
                                    )
                                }
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <form id="edit-event">

            </form>
        </section>
    </>)
}

export default Eventts;
