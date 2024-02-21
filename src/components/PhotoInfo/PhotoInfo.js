import React, { useState, useEffect } from 'react';

import { fetchPhotos } from 'API/photos-api';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import styles from './styles.module.css';
import { FETCH_STATUS } from 'constants/common';

import scroll from 'react-scroll';
const scrollToBottom = scroll.animateScroll.scrollToBottom;

export const PhotoInfo = ({ value }) => {
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState(FETCH_STATUS.idle);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isShowButton, setIsShowButton] = useState(true);

  useEffect(() => {
    if (!value) {
      return;
    }
    requestPhotos(value, page);
    scrollToBottom();
  }, [value, page]);

  const requestPhotos = async (value, page) => {
    try {
      setStatus(FETCH_STATUS.pending);
      const photos = await fetchPhotos(value, page);
      if (photos.hits.length === 0) {
        throw new Error(`${value} nothing to display`);
      }
      setPhotos(prevPhotos => [...prevPhotos, ...photos.hits]);
      setStatus(FETCH_STATUS.resolved);
      setIsShowButton(photos.hits.length === 12);
    } catch (error) {
      setError(error);
      setStatus(FETCH_STATUS.rejected);
    }
  };

  const handleButtonClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (status === FETCH_STATUS.idle) {
    return (
      <div className={styles.wrapper}>
        The search result will be displayed here...
      </div>
    );
  }

  if (status === FETCH_STATUS.pending) {
    return (
      <div className={styles.wrapper}>
        <Loader />
      </div>
    );
  }
  if (status === FETCH_STATUS.rejected) {
    return <div className={styles.wrapper}>{error.message}</div>;
  }

  if (status === FETCH_STATUS.resolved) {
    return (
      <>
        <ImageGallery photos={photos} />
        <div className={styles.button}>
          {isShowButton > 0 && (
            <Button
              onClick={handleButtonClick}
              isLoading={status === FETCH_STATUS.pending}
            />
          )}
        </div>
      </>
    );
  }
};
