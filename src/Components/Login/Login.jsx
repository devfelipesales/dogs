import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginCreate from './LoginCreate';
import LoginPasswordLost from './LoginPasswordLost';
import LoginPasswordReset from './LoginPasswordReset';
import { UserContext } from '../../UserContext';
import styles from './Login.module.css';
import NotFound from '../NotFound';

const Login = () => {
  const { login } = React.useContext(UserContext);

  // Verifica se o usuário está logado e não deixa acessar a página de login, redireciona para a página '/conta'
  if (login === true) {
    // Outra forma de navegação/direcionamento da página, além do useNavigate; Joga o usuário para a página '/conta'
    return <Navigate to='/conta' />;
  }

  return (
    <section className={`${styles.login}`}>
      <div className={styles.forms}>
        {/* Caso coloque algo fora das rotas, aparecerá para todas as páginas dessas rotas, como se fosse um header dessas rotas */}
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='criar' element={<LoginCreate />} />
          <Route path='perdeu' element={<LoginPasswordLost />} />
          <Route path='resetar' element={<LoginPasswordReset />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
