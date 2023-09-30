import React from 'react';
import styles from './FeedModal.module.css';
import { PHOTO_GET } from '../../api';
import ErrorMessage from '../Helper/ErrorMessage';
import Loading from '../Helper/Loading';
import PhotoContent from '../Photo/PhotoContent';

const FeedModal = ({ photo, setModalPhoto }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [photoModal, setPhotoModal] = React.useState('');

  React.useEffect(() => {
    async function fetchPhoto() {
      try {
        // Limpa as variáveis.
        setError(null);
        setLoading(true);

        const { url, options } = PHOTO_GET(photo?.id);
        const response = await fetch(url, options);
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.message);
        }
        setPhotoModal(json);
      } catch (err) {
        setError(err.message); // Mesma mensagem utilizada no throw new Error
      } finally {
        setLoading(false);
      }
    }

    fetchPhoto();
  }, [photo]);

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) {
      setModalPhoto(null);
    }
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <ErrorMessage error={error} />}
      {loading && <Loading />}
      {photoModal && <PhotoContent data={photoModal} />}
    </div>
  );
};

export default FeedModal;
