<script>
  import Block from './Block.svelte';
  import { hexColors } from './colors';

  const MIN_SIZE = 2;
  const MAX_SIZE = 8;

  let size = 4;
  let colors = ['#111'];
  let colorIndex = 0;
  let showColorPicker;
  let colorToAdd;
  let colorPicker;
  let solutionState = Array(size).fill().map(() => Array(size).fill(0));
  let solutionColor = Array(size).fill().map(() => Array(size).fill(null));

  const updateSolution = () => {
    if (size < MIN_SIZE) {
      size = MIN_SIZE;
    }

    if (size > MAX_SIZE) {
      size = MAX_SIZE;
    }

    solutionState = Array(size).fill().map(() => Array(size).fill(0))
    solutionColor = Array(size).fill().map(() => Array(size).fill(null))
  };

  const toggleEnabled = (row, col) => {
    solutionState[row][col] = !!solutionState[row][col] ? 0 : 1;
    console.log(solutionState);
    solutionColor[row][col] = !!solutionColor[row][col] ? null : colorIndex;
    console.log(solutionColor);
  };

  const selectColor = index => colorIndex = index;
  const updateColorToAdd = hex => colorToAdd = hex;
  const toggleShowColorPicker = () => showColorPicker = true;

  const valueToHex = (v, short = true) => {
    const hex = v.toString(16);
    hex = hex.length == 1 ? "0" + hex : hex;
    return short ? hex[0] : hex;
  }

  const addColor = (hex) => {
    colors.push(`#${hex}`);
    colorIndex = colors.length - 1;
    showColorPicker = false;
  }
</script>

<style>
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }

  input {
    margin: 2rem auto 1rem;
    width: 50px;
  }

  .board {
    display: grid;
    grid-gap: 0px;
  } 

  .color-selector {
    display: grid;
    grid-gap: 0px;
    grid-template-columns: repeat(16, 1fr);
    margin: 0 auto;
    width: 80%;
  }

  .color-option {
    width: 16px;
    height: 16px;
    cursor: pointer;
    margin: 2px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    transition: all 0.2s ease-in-out;
  }

  .color-option:hover {
    box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.2);
  }

  .colors {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    margin-bottom: 1rem;
  }

  .color {
    align-items: center;
    display: flex;
    height: 32px;
    justify-content: center;
    width: 32px;
    color: #eee;
    font-size: 12px;
    cursor: pointer;
    margin: 2px;
    transition: all 0.2s ease-in-out;
    border-radius: 4px;
  }

  .color.active {
    padding: 2px;
    border: 2px solid black;
  }

  .color.add {
    background: #ddd;
    color: #333;
  }
</style>

<section>
  <input
    bind:value={size}
    on:change={updateSolution}
    type="number"
    min="0"
  />
</section>

{#if showColorPicker}
  <section class="color-selector">
    {#each hexColors as color}
      <div
        on:click={() => addColor(color)}
        class="color-option"
        style="background: #{color};"
      />
    {/each}
  </section>
{/if}

<section>
  <div class="colors">
    {#each colors as color, index}
      <div
        class="color {index === colorIndex && 'active'}"
        style="background: {color}"
        on:click={() => selectColor(index)}
      >
        {color}
      </div>
    {/each}
    <div class="color add" on:click={() => toggleShowColorPicker()}>
      +
    </div>
  </div>
</section>
<section>
  <div
    class="board"
    style="grid-template-columns: repeat({size}, 1fr); grid-template-rows: repeat({size}, 1fr);"
  >
    {#each solutionState as row, rowIndex}
      {#each row as col, colIndex}
        <Block
          transitionTime={0.05}
          state={col}
          row={rowIndex}
          col={colIndex}
          onClick={() => toggleEnabled(rowIndex, colIndex)}
          enabledColor={solutionColor[rowIndex][colIndex]}
        >
          {col}
        </Block>
      {/each}
    {/each}
  </div>
</section>