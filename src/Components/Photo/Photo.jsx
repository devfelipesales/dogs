import React from 'react';
import { useParams } from 'react-router-dom';
import { PHOTO_GET } from '../../api';
import Loading from '../Helper/Loading';
import PhotoContent from './PhotoContent';
import ErrorMessage from '../Helper/ErrorMessage';
import Head from '../Helper/Head';

const Photo = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState('');

  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPhoto() {
      try {
        // Limpa as variáveis.
        setError(null);
        setLoading(true);

        const { url, options } = PHOTO_GET(id);
        const response = await fetch(url, options);
        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.message);
        }

        setData(json);
      } catch (err) {
        setError(err.message); // Mesma mensagem utilizada no throw new Error
      } finally {
        // Sempre executado
        setLoading(false);
      }
    }
    fetchPhoto();
  }, [id]);

  if (error) return <ErrorMessage error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <section className='container mainContainer'>
        <Head title={data.photo.title} description='Foto do site Dogs.' />
        <PhotoContent single={true} data={data} />
      </section>
    );
  else return null;
};

export default Photo;
