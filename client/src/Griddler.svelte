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
  import Aare from './patterns/Aare.svelte';
  import Clarence from './patterns/Clarence.svelte';
  import Doubs from './patterns/Doubs.svelte';
  import Hinterrhein from './patterns/Hinterrhein.svelte';
  import Inn from './patterns/Inn.svelte';
  import Kander from './patterns/Kander.svelte';
  import Linth from './patterns/Linth.svelte';
  import Mataura from './patterns/Mataura.svelte';

  const bgs = [Aare, Clarence, Inn, Kander, Mataura, Linth, Hinterrhein];

  let levels;
  let enabledBoards;
  let disabledBoards;
  let level;
  let buttonDown = null;
  let buttonDownValue = null;
  let size = 32;

  let levelIndex = 0;
  let layerIndex = 0;
  let same = false;

  $: title = level ? level.title : '';
  $: colors = level ? level.colors : '';
  $: solution = level ? level.solution : '';
  $: enabledBoard = enabledBoards ? enabledBoards[layerIndex] : null;
  $: disabledBoard = disabledBoards ? disabledBoards[layerIndex] : null;
  //$: totalEnabled = enabledBoards ? enabledBoards.map()
  $: width = solution ? solution[0].length : 0;
  $: height = solution ? solution.length : 0;
  $: color = colors ? colors[layerIndex] : null;
  $: [top, left, bottom, right] = (!!colors && !!solution)
    ? generateTotals(colors, solution)[layerIndex]
    : [[], [], [], []];

  const DISABLED = -2;
  const OPEN = -1;

  onMount(async () => {
    const resp = await client.query({ query: Levels });
    levels = resp.data.levels;
    enabledBoards = levels.map(l => l.solution.map(r => r.map(c => OPEN)));
    disabledBoards = levels.map(l => l.solution.map(r => r.map(c => OPEN)));
    level = levels[levelIndex];
  });

  const getCleanBoard = () => {
    const _board = Array(width).fill().map(() => Array(height).fill(OPEN));
    return _board;
  }

  const clearBoards = () => {
    disabledBoards[levelIndex] = getCleanBoard();
    enabledBoards[levelIndex] = getCleanBoard();
  }

  const clearDisabledBoard = () => {
    disabledBoards[levelIndex] = getCleanBoard();
  }

  const clearEnabledBoard = () => {
    enabledBoards[levelIndex] = getCleanBoard();
  }

  const changeLevel = (d) => {
    same = false;
    levelIndex += d;
    layerIndex = 0;
    enabledBoard = getCleanBoard(solution);
    disabledBoard = getCleanBoard(solution);
  }

  const compareBoard = () => {
    same = deepEqual(matrix(solution), matrix(enabledBoard));

    if (same && levelIndex < levels.length) {
      setLevelIndex(levelIndex + 1);
    }
  }

  const setLevelIndex = index => {
    levelIndex = index;
    level = levels[levelIndex];
  };

  const setLayerIndex = index => {
    layerIndex = index;
  };

  const mouseDown = (e, row, col) => {
    buttonDown = e.button;

    if (buttonDown === 0){
      if (disabledBoard[row][col] === layerIndex) {
        return;
      }

      buttonDownValue = enabledBoard[row][col] === OPEN
        ? layerIndex
        : OPEN;
    }

    if (buttonDown === 2) {
      buttonDownValue = disabledBoard[row][col] === OPEN
        ? layerIndex
        : OPEN;
    }
  }

  const mouseMove = (row, col) => {
    if (
      buttonDown === null
      || buttonDownValue === null
      || disabledBoard[row][col] === layerIndex
    ) {
      return false;
    }

    if (buttonDown === 0) {
      enabledBoard[row][col] = buttonDownValue;
    } else if (buttonDown === 2) {
      disabledBoard[row][col] = buttonDownValue;
    }
  }

  const mouseUp = (row, col) => {
    buttonDown = null;
    buttonDownValue = null;
    compareBoard();
  }

  const toggleEnabled = (row, col) => {
    if (disabledBoard[row][col] === layerIndex) {
      return false;
    }

    enabledBoard[row][col] = enabledBoard[row][col] === OPEN
      ? layerIndex
      : OPEN;
    compareBoard();
  };

  const toggleDisabled = (row, col) => {
    disabledBoard[row][col] = disabledBoard[row][col] === OPEN
      ? layerIndex
      : OPEN;
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
    background-color: rgba(255, 255, 255, 0.9);
    border: 8px solid #111;
    padding: 0 2rem 2rem;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
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

  .level-select {
    align-items: center;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.5);
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
  }

  .level-select:last-of-type {
    margin-right: 0;
  }

  .close-button {
    align-items: center;
    border-radius: 4px;
    color: #666;
    cursor: pointer;
    display: flex;
    font-size: 20px;
    height: 42px;
    justify-content: center;
    letter-spacing: 1.25px;
    margin: 1rem 4px 0;
    position: relative;
    text-transform: uppercase;
    width: 200px;
  }

  .close.icon {
    color: #333;
    margin-right: 0.75rem; 
    width: 21px;
    height: 21px;
    position: relative;
  }

  .close.icon:before {
    content: '';
    position: absolute;
    top: 10px;
    width: 21px;
    height: 1px;
    background-color: currentColor;
    transform: rotate(-45deg);
  }

  .close.icon:after {
    content: '';
    position: absolute;
    top: 10px;
    width: 21px;
    height: 1px;
    background-color: currentColor;
    transform: rotate(45deg);
  }
</style>

{#if colors}
  <svelte:component
    this={bgs[levelIndex]}
    colors={colors}
    styles="position: absolute; z-index: -1; top: 0; bottom: 0; left: 0; right: 0;"
  />
{/if}
<div class="main">
  {#if levels && !!levels.length}
    <div class="flex-row justify-center" style="margin: 1rem 0">
      {#each levels as level, index}
        <div
          class="level-select"
          on:click={() => setLevelIndex(index)}
          style="border-radius: {size / 4}px; margin-right: {size / 4}px; padding: {size / 4}px; height: {size}px; width: {size}px; "
        >
          {index}
        </div>
      {/each}
    </div>
  {/if}
  <h1>{levelIndex}: {title} ({width}, {height})</h1>
  {#if colors && !!colors.length}
    <div class="flex-row justify-center margin-bottom">
      {#each colors as color, index}
        <Block
          enabledState={1}
          color={color}
          onClick={() => { setLayerIndex(index); }}
          size={size}
        >
          {color}
        </Block>
      {/each}
    </div>
  {/if}
  {#if left && !!left.length}
    <div class="flex-row justify-center">
      {#each top as totals}
        <div class="flex-col">
          {#each totals as total}
            <Block
              color={color}
              enabledState={1}
              size={size}
            >
              {total}
            </Block>
          {/each}
        </div>
      {/each}
    </div>
  {/if}
  <div class="flex-row justify-center">
    {#if left && !!left.length}
      <div class="flex-col">
        {#each left as totals}
          <div class="flex-row">
            {#each totals as total}
              <Block
                color={color}
                enabledState={1}
                size={size}
              >
                {total}
              </Block>
            {/each}
          </div>
        {/each}
      </div>
    {/if}
    {#if disabledBoard}
      <div class="flex-row">
        <section
          class="board"
          style="grid-template-columns: repeat({disabledBoard[0].length}, 1fr); grid-template-rows: repeat({disabledBoard.length}, 1fr);"
        >
          {#each disabledBoard as row, rowIndex}
            {#each row as item, colIndex}
              <Block
                enabledState={enabledBoard[rowIndex][colIndex]}
                disabledState={disabledBoard[rowIndex][colIndex]}
                row={rowIndex}
                col={colIndex}
                layerIndex={layerIndex}
                onMouseDown={mouseDown}
                onMouseMove={mouseMove}
                onMouseUp={mouseUp}
                onClick={toggleEnabled}
                onRightClick={toggleDisabled}
                buttonDown={buttonDown}
                size={size}
                color={colors[layerIndex]}
              />
            {/each}
          {/each}
        </section>
      </div>
    {/if}
    {#if right && !!right.length}
      <div class="flex-col">
        {#each right as totals}
          <div class="flex-row">
            {#each totals as total}
              <Block
                color={color}
                enabledState={1}
                size={size}
              >
                {total}
              </Block>
            {/each}
          </div>
        {/each}
      </div>
    {/if}
  </div>
  {#if bottom && !!bottom.length}
    <div class="flex-row justify-center">
      {#each bottom as totals}
        <div class="flex-col" style="justify-content: flex-start;">
          {#each totals as total}
            <Block
              color={color}
              enabledState={1}
              size={size}
            >
              {total}
            </Block>
          {/each}
        </div>
      {/each}
    </div>
  {/if}
  <div class="flex-row justify-center">
    <div on:click={clearBoards} class="close-button">
      <div class="close icon" /> Clear
    </div>
  </div>
 </div>
