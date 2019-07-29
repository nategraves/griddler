<script>
  import { gql } from 'apollo-boost';
  import { onMount } from 'svelte';
  import { client } from './gql';
  import { matrix, deepEqual } from 'mathjs';
  import { generateTotals } from './utils.ts';
  import Block from './Block.svelte';

  export let level;
  export let board;

  let layerIndex = 0;
  let same = false;

  $: title = level.title;
  $: colors = level.colors;
  $: solution = level.solution;
  $: color = colors[layerIndex];
  $: [rowTotals, colTotals] = generateTotals(colors, solution)[layerIndex];

  const setLayerIndex = index => { layerIndex = index; };

  const toggleDisabled = (row, col) => (
    board[row][col] = board[row][col] === -2
      ? -1
      : -2
  );

  const toggleEnabled = (row, col) => {
    board[row][col] = board[row][col] === -1
      ? layerIndex
      : -1
    same = deepEqual(matrix(solution), matrix(board));
  };
</script>

<style>
  h1 {
    color: #222;
    font-size: 1.3rem;
    text-align: center;
    text-transform: uppercase;
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

  .board {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(7, 1fr);
    grid-gap: 0px;
  }
</style>

<h1>{title}</h1>

<div class="flex-row justify-center margin-bottom">
  {#each colors as color, index}
    <Block
      state={1}
      color={color}
      onClick={() => { setLayerIndex(index); }}
    >
      {color}
    </Block>
  {/each}
</div>

<div class="flex-row justify-center">
  <Block
    color={color}
    state={1}
  />
  {#each colTotals as total}
    <Block
      color={color}
      state={1}
    >
      {total}
    </Block>
  {/each}
  <Block
    color={color}
    state={1}
  />
</div>

<div class="flex-row justify-center">
  <div class="flex-col">
    {#each rowTotals as total}
      <Block
        color={color}
        state={1}
      >
        {total}
      </Block>
    {/each}
  </div>
  <div class="flex-row">
    <section class="board">
      {#each board as row, rowIndex}
        {#each row as item, colIndex}
          <Block
            state={item}
            row={rowIndex}
            col={colIndex}
            onClick={toggleEnabled}
            onRightClick={toggleDisabled}
            color={colors[item]}
          />
        {/each}
      {/each}
    </section>
  </div>
  <div class="flex-col">
    {#each rowTotals as total}
      <Block
        color={color}
        state={1}
      >
        {total}
      </Block>
    {/each}
  </div>
</div>

<div class="flex-row justify-center">
  <Block
    color={color}
    state={1}
  />
  {#each colTotals as total}
    <Block
      color={color}
      state={1}
    >
      {total}
    </Block>
  {/each}
  <Block
    color={color}
    state={1}
  />
</div>

<div class="flex-row justify-center">
  {same.toString()}
</div>