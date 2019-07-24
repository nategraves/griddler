<script>
  import Block from './Block.svelte';
  import { generateTotals } from './utils';

  export let level;

  let layerIndex = 0;
  $: title = level.title;
  $: layers = level.layers;
  $: colors = layers.map(layer => layer.color);
  $: solutions = layers.map(layer => layer.solution);
  $: boards = layers.map(layer => layer.board);
  $: currentColor = colors[layerIndex];
  $: currentSolution = solutions[layerIndex];
  $: currentBoard = boards[layerIndex];
  $: [rowTotals, colTotals] = generateTotals(currentSolution);
  $: same = checkLayers(layers);

  const setLayerIndex = index => { layerIndex = index; };

  const toggleDisabled = (row, col) => (
    currentBoard[row][col] = currentBoard[row][col] === -1 ? 0 : -1
  );

  const toggleEnabled = (row, col) => (
    currentBoard[row][col] = currentBoard[row][col] === -1
      ? 0
      : (currentBoard[row][col] === 1 ? 0 : 1)
  );

  const checkLayers = (layers) => {
    let same = true;

    for (let i = 0; i < layers.length; i += 1) {
      const solution = solutions[i];
      const board = boards[i];

      solution.forEach(
        (solutionRow, rowIndex) => {
          solutionRow.forEach(
            (solutionColumn, columnIndex) => {
              let guess = Math.max(board[rowIndex][columnIndex], 0);
              if (solutionColumn !== guess) {
                same = false;
              }
            }
          )
        }
      )
    }

		return same;
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
      enabledColor={color}
      onClick={() => { setLayerIndex(index); }}
    >
      {color}
    </Block>
  {/each}
</div>

<div class="flex-row justify-center">
  {#each colTotals as total}
    <Block
      enabledColor={currentColor}
      state={1}
    >
      {total}
    </Block>
  {/each}
</div>

<div class="flex-row justify-center">
  <div class="flex-col">
    {#each rowTotals as total}
      <Block
        enabledColor={currentColor}
        state={1}
      >
        {total}
      </Block>
    {/each}
  </div>
  <div class="flex-row">
    <section class="board">
      {#each currentBoard as row, rowIndex}
        {#each row as item, colIndex}
          <Block
            state={item}
            row={rowIndex}
            col={colIndex}
            onClick={toggleEnabled}
            onRightClick={toggleDisabled}
            enabledColor={currentColor}
          />
        {/each}
      {/each}
    </section>
  </div>
  <div class="flex-col">
    {#each rowTotals as total}
      <Block
        enabledColor={currentColor}
        state={1}
      >
        {total}
      </Block>
    {/each}
  </div>
</div>

<div class="flex-row justify-center">
  {#each colTotals as total}
    <Block
      enabledColor={currentColor}
      state={1}
    >
      {total}
    </Block>
  {/each}
</div>

<div class="flex-row justify-center">
  {same.toString()}
</div>