<script>
  import _ from 'lodash';

  import { client, Levels } from './gql';
  import Griddler from './Griddler.svelte';
  import Buildler from './Buildler.svelte';

  const levels = async() => await client.query({ query: Levels });

  let currentLevel = 0;

  let { title, colors } = level;
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
    <div class="flex">
      <button
        on:click={() => buildMode = false}
        class="{!buildMode ? 'active' : ''}"
      >
        Play
      </button>
      <button
        on:click={() => buildMode = true}
        class="{buildMode ? 'active' : ''}"
      >
        Build
      </button>
    </div>

    {#if buildMode }
      <Buildler />
    {:else}
      <Griddler
        levels={resp.data.levels}
        board={
          resp.data.levels[currentLevel].solution.map(
            r => r.map(
              c => -1
            )
          )
        }
      />
    {/if}

  </section>
{:catch error}
  <span>{error}</span>
{/await}