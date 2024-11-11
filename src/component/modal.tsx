import { forwardRef, ReactNode, useImperativeHandle, useRef, useState } from "react";

export type ModalActions = {
    ref: React.RefObject<HTMLDialogElement>,
    setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>,
    openModal: () => void,
    openContentInModal: (content: ReactNode) => void,
    closeModal: () => void,
}

function toggleModal(modalRef: React.RefObject<HTMLDialogElement>) {
    if (!modalRef.current) {
        return;
    }
    
    if (modalRef.current.hasAttribute("open")) {
        modalRef.current.close()
    } 
    else {
        modalRef.current.showModal();
    }
}

function openModal(modalRef: React.RefObject<HTMLDialogElement>) {
    if (!modalRef.current) {
        return;
    }

    if (modalRef.current.hasAttribute("open")) {
        return;
    }
    else {
        modalRef.current.showModal();
    }
}

function openContentInModal(modalRef: React.RefObject<HTMLDialogElement>, setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>, content: ReactNode) {
    if (!modalRef.current) {
        return;
    }

    if (modalRef.current.hasAttribute("open")) {
        return;
    }
    else {
        setModalContent(content);
        modalRef.current.showModal();
    }
}

function openTimedModal(modalRef: React.RefObject<HTMLDialogElement>, setTimeoutId: React.Dispatch<React.SetStateAction<NodeJS.Timeout | null>>) {
    if (!modalRef.current) {
        return;
    }
    
    if (modalRef.current.hasAttribute("open")) {
        return;
    } 
    else {
        modalRef.current.showModal();
        const timeoutId = setTimeout(() => {
            modalRef.current?.close();
        }, 3000)

        setTimeoutId(timeoutId);
    }
}

function closeModal(modalRef: React.RefObject<HTMLDialogElement>) {
    if (!modalRef.current) {
        return;
    }
    if (!modalRef.current.hasAttribute("open")) {
        return;
    }
    else {
        modalRef.current.close();
    }
}

export const modalActions = {
    toggleModal: toggleModal,
    openModal: openContentInModal,
    openTimedModal: openTimedModal,
    closeModal: closeModal
}

type Props = {
    children?: React.ReactNode;
}

const Modal = forwardRef<ModalActions, Props>(
    ({ children}, ref) => {
        const modalRef = useRef<HTMLDialogElement>(null);
        const [ modalContent, setModalContent ] = useState<React.ReactNode>(null);
        const [ timeoutId, setTimeoutId ] = useState<NodeJS.Timeout | null>(null)

        useImperativeHandle(ref, () => {
            return {
                ref: modalRef,
                setModalContent,
                openModal: () => { openModal(modalRef) },
                openContentInModal: (content: ReactNode) => { openContentInModal(modalRef, setModalContent, content) },
                closeModal: () => { closeModal(modalRef) },
            };
        }, [])

        return (
            <dialog className="bg-transparent"
                ref={modalRef}
            >
                
                {children}
                {modalContent}
            </dialog>
        );
    }
);

export default Modal;