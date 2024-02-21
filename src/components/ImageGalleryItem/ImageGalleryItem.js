import React from 'react';

import styles from './styles.module.css';

export function ImageGalleryItem({ webformatURL, alt, onClick }) {
  return (
    <li>
      <img
        className={styles.image}
        src={webformatURL}
        alt={alt}
        onClick={onClick}
      />
    </li>
  );
}
