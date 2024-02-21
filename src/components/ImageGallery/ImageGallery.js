import React, { useState } from 'react';

import styles from './styles.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Modal } from 'components/Modal';

export const ImageGallery = ({ photos }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    srcModal: '',
    altModal: '',
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModalByClick = (src, alt) => {
    setModalInfo({ srcModal: src, altModal: alt });
    toggleModal();
  };

  return (
    <div>
      <ul className={styles.gallery}>
        {photos.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id.toString()}
            webformatURL={webformatURL}
            alt={tags}
            onClick={() => openModalByClick(largeImageURL, tags)}
          />
        ))}
      </ul>
      {showModal && <Modal infoModal={modalInfo} onClose={toggleModal} />}
    </div>
  );
};
