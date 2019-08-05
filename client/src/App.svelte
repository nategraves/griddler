<script>
  import _ from 'lodash';
  import { Router, Route } from 'svero';

  import Aare from './patterns/Aare.svelte';
  import Clarence from './patterns/Clarence.svelte';
  import Doubs from './patterns/Doubs.svelte';
  import Hinterrhein from './patterns/Hinterrhein.svelte';
  import Inn from './patterns/Inn.svelte';
  import Kander from './patterns/Kander.svelte';
  import Linth from './patterns/Linth.svelte';
  import Mataura from './patterns/Mataura.svelte';

  import { client, Levels } from './gql';
  import Griddler from './Griddler.svelte';
  import Buildler from './Buildler.svelte';

  const bgs = [Aare, Clarence, Doubs, Hinterrhein, Inn, Kander, Linth];
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
  <svelte:component
    this={bgs[5]}
    colors={['#3ab', '#aa2', '#cf1', '#52a', '#3a1', '#52a', '#3a1', '#aa2', '#cf1']}
    styles="position: absolute; z-index: -1; top: 0; bottom: 0; left: 0; right: 0;"
  />
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