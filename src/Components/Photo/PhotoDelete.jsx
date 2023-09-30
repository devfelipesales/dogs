import React from 'react';
import styles from './PhotoDelete.module.css';
import ErrorMessage from '../Helper/ErrorMessage';
import { PHOTO_DELETE } from '../../api';

const PhotoDelete = ({ id }) => {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function handleClick(event) {
    const confirm = window.confirm('Tem certeza que deseja deletar?');
    if (confirm) {
      try {
        setError(null);
        setLoading(true);

        const { url, options } = PHOTO_DELETE(id);
        const response = await fetch(url, options);
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.message);
        }

        window.location.reload(); // Faz reload na página, caso não ocorra erro
      } catch (err) {
        setError(err.message); // Mesma mensagem utilizada no throw new Error
      } finally {
        // Sempre executado
        setLoading(false);
      }
    }
  }

  return (
    <>
      {loading ? (
        <button className={styles.delete} disabled>
          Deletando...
        </button>
      ) : (
        <button className={styles.delete} onClick={handleClick}>
          Deletar
        </button>
      )}

      <ErrorMessage error={error} />
    </>
  );
};

export default PhotoDelete;
