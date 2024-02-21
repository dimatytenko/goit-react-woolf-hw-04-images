import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, infoModal }) => {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <img src={infoModal.srcModal} alt={infoModal.altModal} />
      </div>
    </div>,
    modalRoot
  );
};
