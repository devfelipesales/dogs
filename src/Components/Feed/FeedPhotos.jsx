import React from 'react';
import FeedPhotosItem from './FeedPhotosItem';
import { PHOTOS_GET } from '../../api';
import ErrorMessage from '../Helper/ErrorMessage';
import Loading from '../Helper/Loading';
import styles from './FeedPhotos.module.css';

const FeedPhotos = ({ user, page, setModalPhoto, setInfinite }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [photos, setPhotos] = React.useState('');

  React.useEffect(() => {
    async function fetchPhotos() {
      try {
        // Limpa as variáveis.
        setError(null);
        setLoading(true);

        const total = 3;
        // user = 0, puxa de qualquer usuário
        // const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 });
        const { url, options } = PHOTOS_GET({ page, total, user });
        const response = await fetch(url, options);
        const json = await response.json();

        // Seta o scroll como false para não realizar mais o fetch quando o retorno de imagens for menor que o total
        // Isso significa que chegou ao final, que não tem mais imagens
        if (response && response.ok && json.length < total) {
          setInfinite(false);
        }

        if (!response.ok) {
          throw new Error(json.message);
        }
        setPhotos(json);
      } catch (err) {
        setError(err.message); // Mesma mensagem utilizada no throw new Error
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, [user, page, setInfinite]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (photos.length > 0) {
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {photos.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
  } else {
    return null;
  }
};

export default FeedPhotos;
