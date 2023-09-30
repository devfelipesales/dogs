import React, { Children } from 'react';
import { UserContext } from '../../UserContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { login } = React.useContext(UserContext);

  // Dessa forma, como o estado inicial da variável login é null, quando o usuário já estiver logado a tela de login não é renderizada antes de ir para a rota /conta
  if (login === true) {
    return children;
  } else if (login === false) {
    return <Navigate to='/login' />;
  } else {
    // else -> login == null => estado inicial.
    return <></>;
  }

  // Dessa forma, ao entrar na rota /conta diretamente e o usuário estiver logado, renderiza a tela de login antes e depois vai pra rota de conta.
  // Descomentar pra testar!!
  // return login ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
