import React from 'react';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  const overlayRef = React.useRef(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <div className='modal-backdrop fade show'></div>
        <div className='modal-wrapper'>
          <div className='modal fade show' style={{ display: 'block' }}>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                <h5 className='modal-title'>{title}</h5>
                <button type='button' className='btn-close' onClick={onClose}></button>
              </div>
              <div className='modal-body'>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
