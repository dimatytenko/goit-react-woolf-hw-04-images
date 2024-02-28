import React, { useState, useEffect } from 'react';
import scroll from 'react-scroll';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import styles from './styles.module.css';
import { FETCH_STATUS } from 'constants/common';
import { Searchbar } from 'components/Searchbar';
import { fetchPhotos } from 'API/photos-api';

const scrollToBottom = scroll.animateScroll.scrollToBottom;

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState(FETCH_STATUS.idle);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isShowButton, setIsShowButton] = useState(true);

  const onSubmit = value => {
    updateState();
    setSearchValue(value);
  };

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    setStatus(FETCH_STATUS.pending);
    requestPhotos(searchValue, page);
    scrollToBottom();
  }, [searchValue, page]);

  const requestPhotos = async (value, page) => {
    try {
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

  const updateState = () => {
    setPhotos([]);
    setPage(1);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <main>
        <div className={styles.container}>
          {status === FETCH_STATUS.idle && (
            <div className={styles.wrapper}>
              The search result will be displayed here...
            </div>
          )}

          {status === FETCH_STATUS.rejected && (
            <div className={styles.wrapper}>{error.message}</div>
          )}
        </div>

        {(status !== FETCH_STATUS.idle || status === FETCH_STATUS.rejected) && (
          <>
            <ImageGallery photos={photos} />
            {status === FETCH_STATUS.pending && (
              <div className={styles.wrapper}>
                <Loader />
              </div>
            )}
            <div className={styles.button}>
              {isShowButton > 0 && (
                <Button
                  onClick={handleButtonClick}
                  isLoading={status === FETCH_STATUS.pending}
                />
              )}
            </div>
          </>
        )}
      </main>
      <ToastContainer />
    </>
  );
};
