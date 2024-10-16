import React, { useContext } from 'react';
import Modal from 'react-modal';
import Context from '../context/Context';
import ModalOverlay from './ModalOverlay';
import AlbumDetails from '../views/AlbumDetails';

Modal.setAppElement('#root');

interface ModalProps {
    index: number;
}

const CurtainModal = ({ index }: ModalProps) => {

    const { isModalOpen } = useContext(Context);

    const handleOverlayClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };


    return (
        <div onClick={handleOverlayClick}>
            <Modal
                isOpen={isModalOpen?.index === index && isModalOpen?.isOpen}
                className="modal-content"
                overlayClassName="modal-overlay"
                shouldFocusAfterRender={false} 
            >
                <ModalOverlay/>
                <AlbumDetails/>
            </Modal>
        </div>
    );
};

export default CurtainModal;

