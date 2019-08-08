<script>
  import _ from 'lodash';
  import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { gql } from 'apollo-boost';
  import { matrix, deepEqual } from 'mathjs';

  import { generateTotals } from './utils.ts';
  import { client, Levels } from './gql';
  import Block from './Block.svelte';

  export let props = {};

  let levels;
  let boards;
  let level;
  let mainDown;
  let secondaryDown;

  let levelIndex = 0;
  let layerIndex = 0;
  let same = false;

  $: title = level ? level.title : '';
  $: colors = level ? level.colors : '';
  $: solution = level ? level.solution : '';
  $: board = boards ? boards[levelIndex] : null;
  $: color = colors ? colors[layerIndex] : null;
  $: [rowTotals, colTotals] = (!!colors && !!solution)
    ? generateTotals(colors, solution)[layerIndex]
    : [[], []]
  ;

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

  const setLevelIndex = index => {
    levelIndex = index;
    level = levels[levelIndex];
  };
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
      setLevelIndex(levelIndex + 1);
    }
  };

  onMount(async () => {
    const resp = await client.query({ query: Levels });
    levels = resp.data.levels;
    boards = levels.map(l => l.solution.map(r => r.map(c => -1)));
    level = levels[levelIndex];
  });
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
    grid-gap: 0px;
  }
</style>

<div class="main">
  <h1>{levelIndex}: {title}</h1>
  {#if levels && !!levels.length}
    <div class="flex-row justify-center" style="margin-bottom: 1rem">
      {#each levels as level, index}
        <div
          on:click={() => setLevelIndex(index)}
          style="margin-right: 0.5rem; display: inline-block; padding: 0.5rem; background: #fff; border-radius: 4px; cursor: pointer;"
        >
          {index}
        </div>
      {/each}
    </div>
  {/if}
  {#if colors && !!colors.length}
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
  {/if}
  <div class="flex-row justify-center">
    {#if colTotals && !!colTotals.length}
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
    {/if}
  </div>
  <div class="flex-row justify-center">
    {#if rowTotals && !!rowTotals.length}
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
    {/if}
    {#if board}
      <div class="flex-row">
        <section
          class="board"
          style="grid-template-columns: repeat({board[0].length}, 1fr); grid-template-rows: repeat({board.length}, 1fr);"
        >
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
    {/if}
    {#if rowTotals && !!rowTotals.length}
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
    {/if}
  </div>
  {#if colTotals && !!colTotals.length}
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
  {/if}
  <div class="flex-row justify-center">
    {same.toString()}
  </div>
</div>
