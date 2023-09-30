import React from 'react';
import Head from '../Helper/Head';
import { STATS_GET } from '../../api';
import Loading from '../Helper/Loading';
import ErrorMessage from '../Helper/ErrorMessage';
// React.lazy - Utilizado para importar a biblioteca externa apenas nesse componente, e não em todos os componentes/rotas
const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'));

const UserStats = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    async function fetchPhoto() {
      try {
        // Limpa as variáveis.
        setError(null);
        setLoading(true);

        const { url, options } = STATS_GET();
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
    fetchPhoto();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (data) {
    return (
      // O Fallback indica o que será carregado, caso ocorra algum erro na importação. Nesse caso, não sera carregado nada, apenas uma div em branco
      <React.Suspense fallback={<div></div>}>
        <Head title='Estatística' description='Estatística do site Dogs.' />
        <UserStatsGraphs data={data} />
      </React.Suspense>
    );
  } else {
    return null;
  }
};

export default UserStats;
