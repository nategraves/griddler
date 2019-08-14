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
  let boards;
  let level;
  let buttonDown = null;
  let buttonDownValue = null;

  let levelIndex = 0;
  let layerIndex = 0;
  let same = false;

  $: title = level ? level.title : '';
  $: colors = level ? level.colors : '';
  $: solution = level ? level.solution : '';
  $: board = boards ? boards[levelIndex] : null;
  $: width = solution ? solution[0].length : 0;
  $: height = solution ? solution.length : 0;
  $: color = colors ? colors[layerIndex] : null;
  $: [rowTotals, colTotals] = (!!colors && !!solution)
    ? generateTotals(colors, solution)[layerIndex]
    : [[], []]
  ;

  const DISABLED = -2;
  const OPEN = -1;

  const resetBoard = () => {
    const _board = Array(width).fill().map(() => Array(height).fill(OPEN));
    return _board;
  }

  const clearBoard = () => {
    boards[levelIndex] = [
      ...Array(width).fill().map(() => Array(height).fill(OPEN))
    ];
  }

  const changeLevel = (d) => {
    same = false;
    levelIndex += d;
    layerIndex = 0;
    board = resetBoard(solution);
  }

  const compareBoard = () => {
    const tmpBoard = [
      ...board.map(row => row.map(col => col === DISABLED ? OPEN : col))
    ];
    same = deepEqual(matrix(solution), matrix(board));

    if (same && levelIndex < levels.length) {
      setLevelIndex(levelIndex + 1);
    }
  }

  const setLevelIndex = index => {
    levelIndex = index;
    level = levels[levelIndex];
  };
  const setLayerIndex = index => { layerIndex = index; };

  const toggleDisabled = (row, col) => (
    board[row][col] = board[row][col] === DISABLED
      ? OPEN
      : DISABLED
  );

  const mouseDown = (e, row, col) => {
    e.preventDefault();
    buttonDown = e.button;

    if (board[row][col] === DISABLED) {
      console.log('Cant click on DISABLED block')
      return false;
    }

    switch(buttonDown) {
      case 0:
        if (board[row][col] === OPEN) {
          buttonDownValue = layerIndex;
        } else {
          buttonDownValue = OPEN;
        }
        break;
      case 2:
        buttonDownValue = DISABLED;
        console.log(buttonDownValue);
        break;
    }
    board[row][col] = buttonDownValue;
  }

  const mouseOver = (row, col) => {
    if (
      board[row][col] === DISABLED
      || buttonDown === null
      || buttonDown === undefined
      || buttonDownValue === null
      || buttonDownValue === undefined
    ) {
      return false;
    }


    board[row][col] = buttonDownValue;
  }

  const mouseEnter = (row, col) => {
    if (
      board[row][col] === DISABLED
      || buttonDown === null
      || buttonDown === undefined
      || buttonDownValue === null
      || buttonDownValue === undefined
    ) {
      return false;
    }

    board[row][col] = buttonDownValue;
  }

  const mouseUp = (row, col) => {
    if (
      buttonDown !== null
      && buttonDown !== undefined
      && buttonDownValue !== null
      && buttonDownValue !== undefined
    ) {
      board[row][col] = buttonDownValue;
    }

    //buttonDown = null;
    //buttonDownValue = null;
    compareBoard();
  }

  const toggleEnabled = (row, col) => {
    if (board[row][col] === DISABLED) {
      return false;
    }

    if (board[row][col] === layerIndex) {
      board[row][col] === OPEN
    } else {
      board[row][col] = layerIndex;
    }

    compareBoard();
  };

  onMount(async () => {
    const resp = await client.query({ query: Levels });
    levels = resp.data.levels;
    boards = levels.map(l => l.solution.map(r => r.map(c => OPEN)));
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
    border-radius: 4px;
    cursor: pointer;
    display: inline-flex;
    height: 20px;
    justify-content: center;
    margin-right: 0.5rem;
    padding: 0.5rem;
    width: 20px;
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
        <div class="level-select" on:click={() => setLevelIndex(index)}>
          {index}
        </div>
      {/each}
    </div>
  {/if}
  <h1>{levelIndex}: {title}</h1>
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
                onMouseDown={mouseDown}
                onMouseEnter={mouseEnter}
                onMouseOver={mouseOver}
                onMouseUp={mouseUp}
                onRightClick={toggleDisabled}
                color={colors[item]}
                buttonDown={buttonDown}
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
    <div onClick={() => clearBoard()} class="close-button">
      <div class="close icon" /> Clear
    </div>
  </div>
 </div>
