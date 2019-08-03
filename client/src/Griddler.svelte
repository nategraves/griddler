<script>
  import _ from 'lodash';
	import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  import { gql } from 'apollo-boost';
  import { onMount } from 'svelte';
  import { client } from './gql';
  import { matrix, deepEqual } from 'mathjs';
  import { generateTotals } from './utils.ts';
  import Block from './Block.svelte';

  export let props = {};
  export let levels;
  export let boards;

  console.log(`${_.isEmpty(props)}`);

  let levelIndex = 0;
  let layerIndex = 0;
  let same = false;

  $: level = levels[levelIndex];
  $: title = level.title;
  $: colors = level.colors;
  $: solution = level.solution;
  $: board = boards[levelIndex];
  $: color = colors[layerIndex];
  $: [rowTotals, colTotals] = generateTotals(colors, solution)[layerIndex];

  const resetBoard = (solution) => {
    const width = solution[0].length;
    const height = solution.length;
    const _board = Array(width).fill().map(() => Array(height).fill(-1));
    return _board;
  }

  const changeLevel = (d) => {
    same = false;
    levelIndex += d;
    board = resetBoard(solution);
  }

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

    if (same && levelIndex < levels.length) {

    }
  };
</script>

<style>
  h1 {
    color: #222;
    font-size: 1.3rem;
    text-align: center;
    text-transform: uppercase;
  }

  .main {
    background: '#fff';
    padding: 2rem;
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



<div class="main">
  <h1>{title}</h1>
  <div>
    {_.isEmpty(props).toString()}
  </div>
  <div class="flex-row justify-center margin-bottom">
    {#each colors as color, index}
      <Block
        state={1}
        color={color}
        onClick={() => { setLayerIndex(index); }}
        styles="border-radius: 4px; margin: 0 4px;"
      >
        {color}
      </Block>
    {/each}
  </div>
  <div class="flex-row justify-center">
    <Block
      color={color}
      state={1}
      styles="border-top-left-radius: 24px;"
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
      styles="border-top-right-radius: 24px;"
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
      styles="border-bottom-left-radius: 24px;"
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
      styles="border-bottom-right-radius: 24px;"
    />
  </div>
  <div class="flex-row justify-center">
    {same.toString()}
  </div>
</div>