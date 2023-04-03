import React from 'react';
import ReactModal from 'react-modal';

interface Props {
    caption: string,
    closeModal: (isDelete: boolean) => void
}

const ConfirmModal = ({caption, closeModal}: Props) => {
    const onClose = () => {
        if (closeModal) closeModal(false);
    };

    const onDelete = () => {
        if (closeModal) closeModal(true);
    };

    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={caption.length > 0}
            overlayClassName="modal-overlay"
            className="modal-content confirm-modal"
        >
            <h2 className="header">Delete entry</h2>
            <div className="content">
                <div className='caption-wrapper'>
                    {`Do you want delete ${caption}?`}
                </div>
                <div className="btn-group">
                    <button className="btn-red" onClick={(e)=> onDelete()}>
                        Delete
                    </button>
                    <button className="close-btn" onClick={(e) => onClose()}>No</button>
                </div>
            </div>
        </ReactModal>
    );
};

export default ConfirmModal;
