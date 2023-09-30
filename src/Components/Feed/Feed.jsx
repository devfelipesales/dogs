import React from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';
import PropTypes from 'prop-types';

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);

  // Scroll Infinito
  React.useEffect(() => {
    let wait = false;
    function infiniteScroll() {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        // Verifica se o scroll já passou 75% da altura da página para puxar novas imagens
        // Para a API, quando incrementa a página, ela retorna novas imagens;
        if (scroll > height * 0.75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;
          // Aguarda 500ms para não ficar executando diversas vezes no scroll
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    }

    // Evento whell -> Ativa quando aciona a Rodinha do mouse
    // Event Scroll -> Ativa somente quando tem altura para fazer scroll
    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [infinite]);

  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhotos
          key={page}
          user={user}
          page={page}
          setModalPhoto={setModalPhoto}
          setInfinite={setInfinite}
        />
      ))}
      {!infinite && !user && (
        <p
          style={{
            textAlign: 'center',
            padding: '2rem 0 4rem 0',
            color: '#888',
          }}
        >
          Não existem mais postagens.
        </p>
      )}
    </div>
  );
};

// Define um valor padrão para o parâmetro user do componente
Feed.defaultProps = {
  user: 0,
};

Feed.propTypes = {
  // Aqui especifica que a propriedade deste componente deve ser do tipo string
  // user: PropTypes.string,
  // String e Obrigatória
  // user: PropTypes.string.isRequired,

  // Especifica que pode ser do tipo number ou string e obrigatório
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  //
};

export default Feed;
