import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Validate from '../GlobalFunctions/Validate';
import { USER_POST } from '../../api';
import { UserContext } from '../../UserContext';
import ErrorMessage from '../Helper/ErrorMessage';
import Head from '../Helper/Head';

const LoginCreate = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { userLogin } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // Limpa as variáveis.
      setError(null);
      setLoading(true);

      const { url, options } = USER_POST({ username, email, password });

      const response = await fetch(url, options);
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }

      userLogin(username, password); // Caso dê sucesso no cadastro, Faz login e redireciona
    } catch (err) {
      setError(err.message); // Mesma mensagem utilizada no throw new Error
    } finally {
      // Sempre executado
      setLoading(false);
    }
  }

  // Está bugando -> Mesmo após digitar o email corretamente a mensagem continua aparecendo e some apenas se esperar um tempo
  // function handleInvalid({ target }) {
  //   if (target.validity.patternMismatch) {
  //     target.setCustomValidity('Preencha um e-mail válido3');
  //   }
  // }

  function handleChange({ target }) {
    switch (target.name) {
      case 'username':
        setUsername(target.value);
        break;
      case 'email':
        setEmail(target.value);
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
      <Head title='Crie sua conta' description='Crie sua conta do site Dogs.' />
      <h1 className='title'>Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label='Usuário'
          type='text'
          name='username'
          value={username}
          onChange={handleChange}
          autofocus
          required={true}
        />
        <Input
          label='Email'
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          // onInvalid={handleInvalid}
          required={true}
          pattern='^(http(s){0,1}:\/\/.){0,1}[\-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)$'
          title='Preencha um e-mail válido'
        />
        <Input
          label='Senha'
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          required={true}
        />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        {/* Mensagem de usuário não cadastrado, caso ocorra*/}
        <ErrorMessage error={error} />
      </form>
    </section>
  );

  // ----- Forma Antiga, utilizando métodos de validação e não a validação default e mensagem default do HTML
  // -------------------------------------------------------------------------------------------------------------------------
  // const [username, setUsername] = React.useState('');
  // const [password, setPassword] = React.useState('');
  // const [email, setEmail] = React.useState('');
  // const [loading, setLoading] = React.useState(false);
  // const [error, setError] = React.useState(null);

  // const [errorMsg, setErrorMsg] = React.useState({
  //   username: '',
  //   email: '',
  //   password: '',
  // });

  // const { userLogin } = React.useContext(UserContext);

  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   errorMsg.username = Validate(username, 'username').message;
  //   errorMsg.email = Validate(email, 'email').message;
  //   errorMsg.password = Validate(password, 'password').message;
  //   if (!errorMsg.password && !errorMsg.username && !errorMsg.email) {
  //     try {
  //       // Limpa as variáveis.
  //       setError(null);
  //       setLoading(true);

  //       const { url, options } = USER_POST({ username, email, password });

  //       const response = await fetch(url, options);
  //       const json = await response.json();
  //       if (!response.ok) {
  //         throw new Error(json.message);
  //       }

  //       userLogin(username, password); // Caso dê sucesso no cadastro, Faz login e redireciona
  //     } catch (err) {
  //       setError(err.message); // Mesma mensagem utilizada no throw new Error
  //     } finally {
  //       // Sempre executado
  //       setLoading(false);
  //     }
  //   } else {
  //     setErrorMsg(errorMsg);
  //   }
  // }

  // function handleBlur({ target }) {
  //   const validationOnBlur = Validate(target.value, target.name);
  //   if (validationOnBlur.error === true) {
  //     setErrorMsg({
  //       ...errorMsg,
  //       [target.name]: validationOnBlur.message,
  //     });
  //   }
  // }

  // function handleChange({ target }) {
  //   // Validação para mostrar a mensagem de erro apenas se o usuário terminou de preencher o campo. Caso contrário antes mesmo de finalizar o preenchimento mostraria a mensagem de erro, pois estaria validando para cada caracter preenchido até o caracter final.
  //   if (errorMsg[target.name]) {
  //     const validationOnChange = Validate(target.value, target.name);
  //     if (validationOnChange.error === true) {
  //       setErrorMsg({
  //         ...errorMsg,
  //         [target.name]: validationOnChange.message,
  //       });
  //     } else {
  //       setErrorMsg({
  //         ...errorMsg,
  //         [target.name]: '', // Limpa o erro
  //       });
  //     }
  //   }

  //   switch (target.name) {
  //     case 'username':
  //       setUsername(target.value);
  //       break;
  //     case 'email':
  //       setEmail(target.value);
  //       break;
  //     case 'password':
  //       setPassword(target.value);
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // return (
  //   <section className='animeLeft'>
  //     <h1 className='title'>Cadastre-se</h1>
  //     <form onSubmit={handleSubmit}>
  //       <Input
  //         label='Usuário'
  //         type='text'
  //         name='username'
  //         value={username}
  //         onChange={handleChange}
  //         onBlur={handleBlur}
  //         error={errorMsg.username}
  //         autofocus
  //       />
  //       <Input
  //         label='Email'
  //         type='email'
  //         name='email'
  //         value={email}
  //         onChange={handleChange}
  //         onBlur={handleBlur}
  //         error={errorMsg.email}
  //       />
  //       <Input
  //         label='Senha'
  //         type='password'
  //         name='password'
  //         value={password}
  //         onChange={handleChange}
  //         onBlur={handleBlur}
  //         error={errorMsg.password}
  //       />
  //       {loading ? (
  //         <Button disabled>Cadastrando...</Button>
  //       ) : (
  //         <Button>Cadastrar</Button>
  //       )}
  //       {/* Mensagem de usuário não cadastrado, caso ocorra*/}
  //       <ErrorMessage error={error} />
  //     </form>
  //   </section>
  // );
};

export default LoginCreate;
