import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApolloQueryResult } from 'apollo-boost';

import { Levels, client } from './gql';
import Routes from './Routes';
import { LevelsProvider } from './Contexts/Levels';
import { Level, SolveableLevel } from './types';

import './App.css';

const App = () => {
  const [levels, setLevels] = useState<SolveableLevel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      type LevelsRepsonse = { levels: Level[] };
      try {
        const response: ApolloQueryResult<LevelsRepsonse> = await client.query({
          query: Levels,
        });

        setLevels(
          response.data.levels.map(level => ({ ...level, solved: false }))
        );
      } catch (e) {
        setError(e.message);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <LevelsProvider levelIndex={id ? parseInt(id, 10) : 0} levels={levels}>
      <Routes />
    </LevelsProvider>
  );
};

export default App;
