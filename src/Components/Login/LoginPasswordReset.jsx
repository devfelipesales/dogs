import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PASSWORD_RESET } from '../../api';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import ErrorMessage from '../Helper/ErrorMessage';
import Head from '../Helper/Head';

const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');
    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // Limpa as variáveis.
      setError(null);
      setLoading(true);

      // Envia para a API o login do usuário e a URL da página alterando a rota perdeu por resetar, seguindo config da API.
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password,
      });

      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        throw new Error(json.message);
      }
    } catch (err) {
      setError(err.message); // Mesma mensagem utilizada no throw new Error
    } finally {
      // Sempre executado
      setLoading(false);
    }
  }
  return (
    <section className='animeLeft'>
      <Head title='Resete a senha' description='Resete a senha do site Dogs.' />
      <h1 className='title'>Resete a Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label='Nova Senha'
          type='password'
          name='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          autofocus
          required={true}
        />

        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      <ErrorMessage error={error} />
    </section>
  );
};

export default LoginPasswordReset;
