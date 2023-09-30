import React from 'react';
import { ReactComponent as Enviar } from '../../assets/enviar.svg';
import { COMMENT_POST } from '../../api';
import ErrorMessage from '../Helper/ErrorMessage';
import styles from './PhotoCommentsForm.module.css';

const PhotoCommentsForm = ({ id, setComments, single }) => {
  const [comment, setComment] = React.useState('');
  const [error, setError] = React.useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError(null);

      const { url, options } = COMMENT_POST(id, { comment });
      const response = await fetch(url, options);
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }

      setComment(''); // limpa o campo de comentário
      setComments((commentsprev) => [...commentsprev, json]); // Atualiza os comentários na tela
    } catch (err) {
      setError(err.message); // Mesma mensagem utilizada no throw new Error
    } finally {
      // Sempre executado
    }
  }

  return (
    <form
      className={`${styles.form} ${single ? styles.single : ''}`}
      onSubmit={handleSubmit}
    >
      <textarea
        className={styles.textarea}
        name='comment'
        id='comment'
        placeholder='Comente...'
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Enviar />
      </button>

      <ErrorMessage error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
