import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { ReactComponent as MinhasFotos } from '../../assets/feed.svg';
import { ReactComponent as Estatisticas } from '../../assets/estatisticas.svg';
import { ReactComponent as AdicionarFoto } from '../../assets/adicionar.svg';
import { ReactComponent as Sair } from '../../assets/sair.svg';
import styles from './UserHeaderNav.module.css';
import useMedia from '../Hooks/useMedia';

const UserHeaderNav = () => {
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const { userLogout } = React.useContext(UserContext);
  // Retorna true se a tela for menor que 40rem
  const mobile = useMedia('(max-width: 40rem)');
  const navigate = useNavigate();

  function handleLogout(event) {
    userLogout();
    navigate('/login');
  }

  // Lógica para quando clicar nos Menus Internos da tela mobile, fechar o Menu após o clique
  // O pathname irá mudar quando clicar nos links internos, pois irá para a rota respectiva
  const { pathname } = useLocation();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        //  Só adiciona a classe styles.mobileButtonActive se mobileMenu for true, ou seja, quando clicar no Menu Hambuguer
        <button
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          aria-label='Menu'
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      {/* //  Só adiciona a classe styles.navMobileActive se mobileMenu for true, ou seja, quando clicar no Menu Hambuguer */}
      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to='/conta' end>
          <MinhasFotos />
          {mobile && 'Minhas Fotos'}
        </NavLink>
        <NavLink to='/conta/estatisticas'>
          <Estatisticas />
          {mobile && 'Estatísticas'}
        </NavLink>
        <NavLink to='/conta/postar'>
          <AdicionarFoto />
          {mobile && 'Adicionar Foto'}
        </NavLink>
        <button onClick={handleLogout}>
          <Sair />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
