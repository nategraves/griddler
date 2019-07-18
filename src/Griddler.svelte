<script>
  import Block from './Block.svelte';
  import { generateTotals } from './utils';

  export let level;

  let layerIndex = 0;
  $: title = level.title;
  $: layers = level.layers;
  $: colors = layers.map(layer => layer.color);
  $: solutions = layers.map(layer => layer.solution);
  $: currentColor = colors[layerIndex];
  $: currentSolution = solutions[layerIndex];
  $: rows = currentSolution.length;
  $: cols = currentSolution[0].length;
  $: board = Array(rows).fill().map(() => Array(cols).fill(0));
  $: [rowTotals, colTotals] = generateTotals(currentSolution);

  const setLayerIndex = index => { layerIndex = index; };
  const toggleDisabled = (row, col) => board[row][col] === -1 ? 0 : -1;
  const toggleEnabled = (row, col) => {
    if (board[row][col] === -1 ) { return; }
    board[row][col] = board[row][col] === 1 ? 0 : 1;
  }
  
</script>

<style>
  h1 {
    font-size: 1.3rem;
    text-transform: uppercase;
    color: #222;
  }

  .flex-row {
    display: flex;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }

  .justify-center {
    justify-content: center;
  }

  .margin-bottom {
    margin-bottom: 1rem;
  }

  .col {
    content: '';
    flex: 1;
  }

  .board {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(7, 1fr);
    grid-gap: 0px;
  }
</style>

<h1>{title}</h1>

<div class="flex-row justify-center margin-bottom">
  {#each colors as color}
    <Block
      state={1}
      enabledColor={color}
      onClick={() => { console.log(color); }}
    >
      {color}
    </Block>
  {/each}
</div>

<div class="flex-row">
  <div class="col" />
  <div class="col">
    <div class="flex-row">
      {#each rowTotals as total}
        <Block
          enabledColor={currentColor}
          style="flex-grow: 0;"
        >
          {total}
        </Block>
      {/each}
    </div>
  </div>
  <div class="col" />
</div>

<div class="flex-row">
  <div class="col" />
    <div class="flex-col">
      {#each rowTotals as total}
        <Block
          enabledColor={currentColor}
          style="flex-grow: 0;"
        >
          {total}
        </Block>
      {/each}
    </div>
  </div>
  <div class="col">
    <div class="flex-row">
      <section class="board">
        {#each board as row, rowIndex}
          {#each row as item, colIndex}
            <Block
              row={rowIndex}
              col={colIndex}
              on:click={() => toggleEnabled(rowIndex, colIndex)}
              on:contextmenu={(e) => {
                e.preventDefault();
                toggleDisabled(rowIndex, colIndex)
              }}
            >
              {item}
            </Block>
          {/each}
        {/each}
      </section>
    </div>
  </div>
  <div class="col">
    <div class="flex-col">
      {#each rowTotals as total}
        <Block
          enabledColor={currentColor}
          style="flex-grow: 0;"
        >
          {total}
        </Block>
      {/each}
    </div>
  </div>