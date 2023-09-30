import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Validate from '../GlobalFunctions/Validate';
import { UserContext } from '../../UserContext';
import ErrorMessage from '../Helper/ErrorMessage';
import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/Button.module.css';
import Head from '../Helper/Head';

const LoginForm = () => {
  const { userLogin, error, loading } = React.useContext(UserContext);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState({
    username: '',
    password: '',
  });

  React.useEffect(() => {
    // ajustar bug do error ao sair e entrar na página com login errado
    console.log('Passou aqui');
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    errorMsg.password = Validate(password, 'password').message;
    errorMsg.username = Validate(username, 'username').message;

    if (!errorMsg.password && !errorMsg.username) {
      userLogin(username, password);
    } else {
      setErrorMsg(errorMsg);
    }
  }

  function handleBlur({ target }) {
    const validationOnBlur = Validate(target.value, target.name);
    if (validationOnBlur.error === true) {
      setErrorMsg({
        ...errorMsg,
        [target.name]: validationOnBlur.message,
      });
    }
  }

  function handleChange({ target }) {
    // Validação para mostrar a mensagem de erro apenas se o usuário terminou de preencher o campo. Caso contrário antes mesmo de finalizar o preenchimento mostraria a mensagem de erro, pois estaria validando para cada caracter preenchido até o caracter final.
    if (errorMsg[target.name]) {
      const validationOnChange = Validate(target.value, target.name);
      if (validationOnChange.error === true) {
        setErrorMsg({
          ...errorMsg,
          [target.name]: validationOnChange.message,
        });
      } else {
        setErrorMsg({
          ...errorMsg,
          [target.name]: '',
        });
      }
    }

    switch (target.name) {
      case 'username':
        setUsername(target.value);
        break;
      case 'password':
        setPassword(target.value);
        break;
      default:
        break;
    }
  }

  return (
    <section className='animeLeft'>
      <Head title='Login' description='Login do site Dogs.' />
      <h1 className='title'>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label='Usuário'
          type='text'
          name='username'
          value={username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errorMsg.username}
        />
        <Input
          label='Senha'
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errorMsg.password}
        />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        {/* Mensagem de usuário inváido, caso ocorra. Desde que os campos estejam preenchidos*/}
        {username && password && <ErrorMessage error={error} />}
      </form>
      <Link className={styles.perdeu} to='/login/perdeu'>
        Perdeu a Senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to='/login/criar'>
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
