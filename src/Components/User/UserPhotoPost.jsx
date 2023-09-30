import React from 'react';
import styles from './UserPhotoPost.module.css';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import ErrorMessage from '../Helper/ErrorMessage';
import { PHOTO_POST } from '../../api';
import { useNavigate } from 'react-router-dom';
import Head from '../Helper/Head';

const UserPhotoPost = () => {
  const [nome, setNome] = React.useState('');
  const [peso, setPeso] = React.useState('');
  const [idade, setIdade] = React.useState('');
  const [img, setImg] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome);
    formData.append('peso', peso);
    formData.append('idade', idade);

    try {
      // Limpa as variáveis.
      setError(null);
      setLoading(true);

      const token = window.localStorage.getItem('token');
      const { url, options } = PHOTO_POST(formData, token);

      const response = await fetch(url, options);
      console.log(response);
      const json = await response.json();
      console.log(json);
      if (!response.ok) {
        throw new Error(json.message);
      }
      navigate('/conta');
    } catch (err) {
      setError(err.message); // Mesma mensagem utilizada no throw new Error
    } finally {
      // Sempre executado
      setLoading(false);
    }
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  function handleChange({ target }) {
    switch (target.name) {
      case 'nome':
        setNome(target.value);
        break;
      case 'idade':
        setIdade(target.value);
        break;
      case 'peso':
        setPeso(target.value);
        break;
      default:
        break;
    }
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title='Poste sua Foto' description='Poste sua foto do site Dogs.' />
      <form onSubmit={handleSubmit}>
        <Input
          label='Nome'
          type='text'
          name='nome'
          value={nome}
          onChange={handleChange}
          required={true}
        />
        <Input
          label='Peso'
          type='number'
          name='peso'
          value={peso}
          onChange={handleChange}
          required={true}
        />
        <Input
          label='Idade'
          type='number'
          name='idade'
          value={idade}
          onChange={handleChange}
          required={true}
        />
        <input
          className={styles.file}
          type='file'
          name='img'
          id='img'
          onChange={handleImgChange}
        ></input>
        <ErrorMessage error={error} />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${img.preview})` }}
          >
            {' '}
          </div>
        )}
      </div>
      /
    </section>
  );
};

export default UserPhotoPost;
