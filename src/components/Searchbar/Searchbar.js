import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';

import styles from './styles.module.css';

import { toast } from 'react-toastify';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const reset = () => {
    setInputValue('');
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      toast.info('enter a value to search for!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    onSubmit(inputValue);

    reset();
  };

  return (
    <header className={styles.searchbar}>
      <div className={styles.container}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.searchForm__button}>
            <IoMdSearch size={24} />
          </button>

          <input
            className={styles.searchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleInputChange}
          />
        </form>
      </div>
    </header>
  );
};
