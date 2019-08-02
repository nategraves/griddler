<script>
  import _ from 'lodash';
  import { Router, Route } from 'svero';

  import { client, Levels } from './gql';
  import Griddler from './Griddler.svelte';
  import Buildler from './Buildler.svelte';

  const levels = async() => await client.query({ query: Levels });

  let currentLevel = 0;
  let buildMode = true;
</script>

<style>
  .flex {
    display: flex;
    justify-content: center;
  }

  button {
    background: #DFE;
    border: 4px solid #DFE;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    transition: 0.2s all ease-in-out;
  }

  button + button {
    margin-left: 1rem;
  }

  button:hover,
  button.active {
    border: 4px solid rgba(0, 0, 0, 0.4);
  }
</style>

{#await levels()}
  <span>Loading</span>
{:then resp}
  <section>
    <Router>
      <Route path="/build">
        <Buildler />
      </Route>
      <Route path="/play/:levelIndex" fallback>
        <Griddler
          levels={resp.data.levels}
          boards={resp.data.levels.map(l => l.solution.map(r => r.map(c => -1)))}
        />
      </Route>
    </Router>
  </section>
{:catch error}
  <span>{error}</span>
{/await}