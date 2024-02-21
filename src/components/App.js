import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './styles.module.css';

import { Searchbar } from 'components/Searchbar';
import { PhotoInfo } from 'components/PhotoInfo';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');

  const onSubmit = value => {
    setSearchValue(value);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <main>
        <div className={styles.container}>
          <PhotoInfo value={searchValue} />
        </div>
      </main>
      <ToastContainer />
    </>
  );
};
