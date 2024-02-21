import styles from './styles.module.css';

export function Button({ onClick, isLoading }) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      Load more
      {isLoading && '...'}
    </button>
  );
}
