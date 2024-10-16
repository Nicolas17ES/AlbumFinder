import React, { useRef, useEffect, useContext } from 'react';
import gsap from 'gsap';
import Context from '../context/Context';
import { FaWindowClose } from "react-icons/fa";
import { getAlbums } from '../context/Actions';



const ModalOverlay = () => {
    const { isModalOpen, globalDebouncedValue, dispatch } = useContext(Context);

    const modalBackgroundRefLeft = useRef<HTMLDivElement>(null);
    const modalBackgroundRefRight = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
            if(isModalOpen?.isOpen){
                if (modalBackgroundRefLeft.current && modalBackgroundRefRight.current) {
                        gsap.fromTo(
                            modalBackgroundRefLeft.current,
                            { width: '0vw' }, // Start width 0vw
                            {
                                width: '50vw', // Expand to 50vw
                                duration: 1.2,
                                ease: 'power2.out',
                            }
                        );

                        gsap.fromTo(
                            modalBackgroundRefRight.current,
                            { width: '0vw' }, // Start width 0vw
                            {
                                width: '50vw', // Expand to 50vw
                                duration: 1.2,
                                ease: 'power2.out',
                            }
                        );
                }
                if(buttonRef.current) {
                    gsap.fromTo(
                            buttonRef.current,
                            { opacity: 0 }, 
                            {
                                opacity: 1,
                                delay: 1,  
                                duration: 1,
                                ease: 'power2.out',
                            }
                        );
                }
            }
    }, [isModalOpen]);

    const closeModal = ():void => {

        if(!globalDebouncedValue || globalDebouncedValue === '') {
            getAlbums(dispatch);
        }
        
        if(buttonRef.current) {
            gsap.fromTo(
                    buttonRef.current,
                    { opacity: 1 }, 
                    {
                        opacity: 0,
                        duration: .3,
                        ease: 'power2.out',
                    }
                );
        }
        if (isModalOpen?.isOpen && modalBackgroundRefLeft.current && modalBackgroundRefRight.current) {
                gsap.fromTo(
                    modalBackgroundRefLeft.current,
                    { width: '50vw' },
                    {
                        width: '0vw', 
                        duration: 1.2,
                        ease: 'power2.out',
                    }
                );

                gsap.fromTo(
                    modalBackgroundRefRight.current,
                    { width: '50vw' }, 
                    {
                        width: '0vw', 
                        duration: 1.2,
                        ease: 'power2.out',
                        onComplete: () => {
                            dispatch({
                                type: 'IS_MODAL_OPEN',
                                payload: null,
                            })
                        }
                    }
                );
        }

        dispatch({
            type: 'GET_ALBUM',
            payload: null,
        })
    }

    return (
        <>
            <button ref={buttonRef} onClick={closeModal} className="close-modal"><FaWindowClose size={40}/></button>
            <div ref={modalBackgroundRefLeft} className="modal-background-left"></div>
            <div ref={modalBackgroundRefRight} className="modal-background-right"></div>
        </>

    );
};

export default ModalOverlay;
