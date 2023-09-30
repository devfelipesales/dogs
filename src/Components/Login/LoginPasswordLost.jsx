import React from 'react';
import { PASSWORD_LOST } from '../../api';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import ErrorMessage from '../Helper/ErrorMessage';
import Head from '../Helper/Head';

const LoginPasswordLost = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [login, setLogin] = React.useState('');
  const [data, setData] = React.useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // Limpa as variáveis.
      setError(null);
      setLoading(true);

      // Envia para a API o login do usuário e a URL da página alterando a rota perdeu por resetar, seguindo config da API.
      const { url, options } = PASSWORD_LOST({
        login: login,
        url: window.location.href.replace('perdeu', 'resetar'),
      });

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

  return (
    <section className='animeLeft'>
      <Head title='Perdeu a senha' description='Perdeu a senha do site Dogs.' />
      <h1 className='title'>Perdeu a senha?</h1>
      {data ? (
        <p style={{ color: '#4c1' }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            label='Email / Usuário'
            type='text'
            name='login'
            value={login}
            onChange={({ target }) => setLogin(target.value)}
            autofocus
            required={true}
          />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar Email</Button>
          )}
        </form>
      )}

      <ErrorMessage error={error} />
    </section>
  );
};

export default LoginPasswordLost;
